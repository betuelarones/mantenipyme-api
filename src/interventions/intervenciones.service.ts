import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EstadoIncidencia, Rol } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import type { CreateIntervencionDto } from './dto/create-intervencion.dto/create-intervencion.dto.js';

@Injectable()
export class IntervencionesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(user: AuthenticatedUser, incidentId?: string, equipmentId?: string) {
    if (incidentId && user.role === Rol.TECHNICIAN) {
      const incident = await this.prisma.incidencia.findUnique({
        where: { id: incidentId }, select: { assignedToId: true },
      });
      if (!incident || incident.assignedToId !== user.id) throw new ForbiddenException();
    }
    const interventions = await this.prisma.intervencion.findMany({
      where: {
        ...(incidentId && { incidentId }),
        ...((equipmentId || user.role === Rol.TECHNICIAN || user.role === Rol.OPERATOR) && {
          incident: {
            ...(equipmentId && { equipmentId }),
            ...(user.role === Rol.TECHNICIAN && { assignedToId: user.id }),
            ...(user.role === Rol.OPERATOR && { reporterId: user.id }),
          },
        }),
      },
      include: {
        technician: { select: { fullName: true } },
        incident: { select: { equipment: { select: { name: true } } } },
      },
      orderBy: { occurredAt: 'asc' },
    });
    return interventions.map((item) => ({
      ...item,
      summary: item.action,
      actions: item.action,
      technicianName: item.technician.fullName,
      equipmentName: item.incident.equipment.name,
    }));
  }

  async create(dto: CreateIntervencionDto, user: AuthenticatedUser) {
    const incident = await this.prisma.incidencia.findUnique({
      where: { id: dto.incidentId },
      select: { id: true, assignedToId: true, status: true },
    });
    if (!incident) throw new NotFoundException('No se encontró la incidencia.');
    if (incident.assignedToId !== user.id) throw new ForbiddenException();
    if (incident.status === EstadoIncidencia.CLOSED) {
      throw new ForbiddenException('No puedes registrar intervenciones en una incidencia cerrada.');
    }
    const item = await this.prisma.intervencion.create({
      data: {
        incidentId: dto.incidentId,
        technicianId: user.id,
        action: dto.action.trim(),
        ...(dto.durationMinutes !== undefined && { durationMinutes: dto.durationMinutes }),
      },
      include: { technician: { select: { fullName: true } } },
    });
    return { ...item, summary: item.action, actions: item.action, technicianName: item.technician.fullName };
  }
}
