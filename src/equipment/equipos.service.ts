import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateEquipoDto } from './dto/create-equipo.dto.js';
import type { UpdateEquipoDto } from './dto/update-equipo.dto.js';

@Injectable()
export class EquiposService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.equipo.findMany({
      include: { responsible: { select: { id: true, fullName: true } } },
      orderBy: { name: 'asc' },
    }).then((items) => items.map((item) => ({
      ...item,
      responsibleName: item.responsible?.fullName ?? null,
    })));
  }

  async get(id: string) {
    const item = await this.prisma.equipo.findUnique({
      where: { id },
      include: {
        responsible: { select: { id: true, fullName: true } },
        plans: {
          where: { completedAt: null, dueAt: { gte: new Date() } },
          include: { responsible: { select: { fullName: true } } },
          orderBy: { dueAt: 'asc' },
          take: 1,
        },
      },
    });
    if (!item) throw new NotFoundException('No se encontró el equipo.');
    const { plans, ...equipment } = item;
    const nextMaintenance = plans[0];
    return {
      ...equipment,
      responsibleName: item.responsible?.fullName ?? null,
      nextMaintenance: nextMaintenance
        ? {
            id: nextMaintenance.id,
            name: nextMaintenance.name,
            dueAt: nextMaintenance.dueAt,
            reminderDays: nextMaintenance.reminderDays,
            responsibleName: nextMaintenance.responsible?.fullName ?? 'Sin asignar',
          }
        : null,
    };
  }

  create(dto: CreateEquipoDto) {
    return this.prisma.equipo.create({
      data: {
        name: dto.name.trim(),
        code: dto.code.trim(),
        area: dto.area.trim(),
        ...(dto.responsibleId && { responsible: { connect: { id: dto.responsibleId } } }),
      },
      include: { responsible: { select: { id: true, fullName: true } } },
    });
  }

  async update(id: string, dto: UpdateEquipoDto) {
    if (!(await this.prisma.equipo.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('No se encontró el equipo.');
    }
    return this.prisma.equipo.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name.trim() }),
        ...(dto.code !== undefined && { code: dto.code.trim() }),
        ...(dto.area !== undefined && { area: dto.area.trim() }),
        ...(dto.responsibleId !== undefined && {
          responsible: dto.responsibleId
            ? { connect: { id: dto.responsibleId } }
            : { disconnect: true },
        }),
      },
      include: { responsible: { select: { id: true, fullName: true } } },
    });
  }
}
