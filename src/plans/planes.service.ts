import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePlanDto } from './dto/create-plan.dto/create-plan.dto.js';
import type { UpdatePlanDto } from './dto/update-plan.dto.js';

@Injectable()
export class PlanesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    equipment: { select: { id: true, name: true, code: true } },
    responsible: { select: { id: true, fullName: true } },
  };

  private shape<T extends { equipment: { name: string; code: string }; responsible: { fullName: string } | null; dueAt: Date; completedAt: Date | null }>(plan: T) {
    const now = new Date();
    return {
      ...plan,
      equipmentName: plan.equipment.name,
      responsibleName: plan.responsible?.fullName ?? 'Sin asignar',
      status: plan.completedAt
        ? 'COMPLETED'
        : plan.dueAt < now
          ? 'OVERDUE'
          : plan.dueAt.getTime() <= now.getTime() + 7 * 86400000
            ? 'DUE_SOON'
            : 'SCHEDULED',
    };
  }

  async list(equipmentId?: string, status?: string) {
    const now = new Date();
    const recognizedStatus = ['COMPLETED', 'OVERDUE', 'DUE_SOON', 'SCHEDULED'].includes(status ?? '');
    const soon = new Date(now.getTime() + 7 * 86400000);
    const dueAt = status === 'OVERDUE'
      ? { lt: now }
      : status === 'DUE_SOON'
        ? { gte: now, lte: soon }
        : status === 'SCHEDULED'
          ? { gt: soon }
          : undefined;
    const plans = await this.prisma.plan.findMany({
      where: {
        ...(equipmentId && { equipmentId }),
        ...(status === 'COMPLETED' ? { completedAt: { not: null } } : recognizedStatus && { completedAt: null }),
        ...(dueAt && { dueAt }),
      },
      include: this.include,
      orderBy: { dueAt: 'asc' },
    });
    return plans.map((plan) => this.shape(plan));
  }

  async upcoming() {
    const now = new Date();
    const plans = await this.prisma.plan.findMany({
      where: { completedAt: null, dueAt: { gte: now } },
      include: this.include,
      orderBy: { dueAt: 'asc' },
      take: 20,
    });
    return plans.map((plan) => this.shape(plan));
  }

  async get(id: string) {
    const plan = await this.prisma.plan.findUnique({ where: { id }, include: this.include });
    if (!plan) throw new NotFoundException('No se encontró el plan.');
    return this.shape(plan);
  }

  async create(dto: CreatePlanDto) {
    const plan = await this.prisma.plan.create({
      data: {
        name: dto.name.trim(),
        equipmentId: dto.equipmentId,
        dueAt: dto.dueAt,
        reminderDays: dto.reminderDays ?? 7,
        ...(dto.responsibleId && { responsibleId: dto.responsibleId }),
      },
      include: this.include,
    });
    return this.shape(plan);
  }

  async update(id: string, dto: UpdatePlanDto) {
    if (!(await this.prisma.plan.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('No se encontró el plan.');
    }
    const plan = await this.prisma.plan.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name.trim() }),
        ...(dto.equipmentId !== undefined && { equipmentId: dto.equipmentId }),
        ...(dto.dueAt !== undefined && { dueAt: dto.dueAt }),
        ...(dto.reminderDays !== undefined && { reminderDays: dto.reminderDays }),
        ...(dto.responsibleId !== undefined && { responsibleId: dto.responsibleId || null }),
      },
      include: this.include,
    });
    return this.shape(plan);
  }

  async complete(id: string) {
    if (!(await this.prisma.plan.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('No se encontró el plan.');
    }
    const plan = await this.prisma.plan.update({
      where: { id }, data: { completedAt: new Date() }, include: this.include,
    });
    return this.shape(plan);
  }

  async remove(id: string) {
    if (!(await this.prisma.plan.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('No se encontró el plan.');
    }
    await this.prisma.plan.delete({ where: { id } });
    return { success: true };
  }
}
