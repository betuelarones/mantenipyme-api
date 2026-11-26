import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EstadoIncidencia, Prioridad, Rol } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import type { CreateIncidenciaDto } from './dto/create-incidencia.dto/create-incidencia.dto.js';

@Injectable()
export class IncidenciasService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    equipment: { select: { id: true, name: true, code: true, area: true } },
    reporter: { select: { id: true, fullName: true } },
    assignedTo: { select: { id: true, fullName: true } },
    interventions: {
      include: { technician: { select: { id: true, fullName: true } } },
      orderBy: { occurredAt: 'asc' as const },
    },
  };

  private shape<T extends {
    equipment: { id: string; name: string; code: string; area: string };
    reporter: { id: string; fullName: string };
    assignedTo: { id: string; fullName: string } | null;
    interventions: Array<{ id: string; action: string; occurredAt: Date; technician: { fullName: string }; durationMinutes: number | null }>;
  }>(incident: T) {
    return {
      ...incident,
      equipmentName: incident.equipment.name,
      reporterName: incident.reporter.fullName,
      assignedToName: incident.assignedTo?.fullName ?? null,
      interventions: incident.interventions.map((item) => ({
        ...item,
        summary: item.action,
        actions: item.action,
        technicianName: item.technician.fullName,
      })),
    };
  }

  async list(user: AuthenticatedUser, filters: { status?: string; priority?: string; equipmentId?: string }) {
    const where = {
      ...(filters.status && Object.values(EstadoIncidencia).includes(filters.status as EstadoIncidencia) && {
        status: filters.status as EstadoIncidencia,
      }),
      ...(filters.priority && Object.values(Prioridad).includes(filters.priority as Prioridad) && {
        priority: filters.priority as Prioridad,
      }),
      ...(filters.equipmentId && { equipmentId: filters.equipmentId }),
      ...(user.role === Rol.OPERATOR && { reporterId: user.id }),
      ...(user.role === Rol.TECHNICIAN && { assignedToId: user.id }),
    };
    const incidents = await this.prisma.incidencia.findMany({
      where, include: this.include, orderBy: { createdAt: 'desc' },
    });
    return incidents.map((incident) => this.shape(incident));
  }

  async get(id: string, user: AuthenticatedUser) {
    const incident = await this.prisma.incidencia.findUnique({
      where: { id }, include: this.include,
    });
    if (!incident) throw new NotFoundException('No se encontró la incidencia.');
    if (user.role === Rol.OPERATOR && incident.reporterId !== user.id) {
      throw new ForbiddenException();
    }
    if (user.role === Rol.TECHNICIAN && incident.assignedToId !== user.id) {
      throw new ForbiddenException();
    }
    return this.shape(incident);
  }

  async create(dto: CreateIncidenciaDto, user: AuthenticatedUser) {
    const incident = await this.prisma.incidencia.create({
      data: {
        equipmentId: dto.equipmentId,
        reporterId: user.id,
        symptom: dto.symptom.trim(),
        priority: dto.priority,
        status: EstadoIncidencia.OPEN,
      },
      include: this.include,
    });
    return this.shape(incident);
  }

  async assign(id: string, assignedToId: string) {
    const technician = await this.prisma.usuario.findUnique({ where: { id: assignedToId } });
    if (!technician || !technician.active || technician.role !== Rol.TECHNICIAN) {
      throw new NotFoundException('El técnico seleccionado no está disponible.');
    }
    if (!(await this.prisma.incidencia.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('No se encontró la incidencia.');
    }
    const incident = await this.prisma.incidencia.update({
      where: { id },
      data: { assignedToId, status: EstadoIncidencia.ASSIGNED },
      include: this.include,
    });
    return this.shape(incident);
  }

  async close(id: string, user: AuthenticatedUser) {
    const incident = await this.prisma.incidencia.findUnique({
      where: { id }, include: { _count: { select: { interventions: true } } },
    });
    if (!incident) throw new NotFoundException('No se encontró la incidencia.');
    if (incident.assignedToId !== user.id) throw new ForbiddenException();
    if (incident._count.interventions === 0) {
      throw new ForbiddenException('Registra al menos una intervención antes de cerrar.');
    }
    const closed = await this.prisma.incidencia.update({
      where: { id }, data: { status: EstadoIncidencia.CLOSED },
      include: this.include,
    });
    return this.shape(closed);
  }
}
