var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let PlanesService = class PlanesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    include = {
        equipment: { select: { id: true, name: true, code: true } },
        responsible: { select: { id: true, fullName: true } },
    };
    shape(plan) {
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
    async list(equipmentId, status) {
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
    async get(id) {
        const plan = await this.prisma.plan.findUnique({ where: { id }, include: this.include });
        if (!plan)
            throw new NotFoundException('No se encontró el plan.');
        return this.shape(plan);
    }
    async create(dto) {
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
    async update(id, dto) {
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
    async complete(id) {
        if (!(await this.prisma.plan.findUnique({ where: { id }, select: { id: true } }))) {
            throw new NotFoundException('No se encontró el plan.');
        }
        const plan = await this.prisma.plan.update({
            where: { id }, data: { completedAt: new Date() }, include: this.include,
        });
        return this.shape(plan);
    }
    async remove(id) {
        if (!(await this.prisma.plan.findUnique({ where: { id }, select: { id: true } }))) {
            throw new NotFoundException('No se encontró el plan.');
        }
        await this.prisma.plan.delete({ where: { id } });
        return { success: true };
    }
};
PlanesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PlanesService);
export { PlanesService };
//# sourceMappingURL=planes.service.js.map