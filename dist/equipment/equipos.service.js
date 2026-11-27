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
let EquiposService = class EquiposService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() {
        return this.prisma.equipo.findMany({
            include: { responsible: { select: { id: true, fullName: true } } },
            orderBy: { name: 'asc' },
        }).then((items) => items.map((item) => ({
            ...item,
            responsibleName: item.responsible?.fullName ?? null,
        })));
    }
    async get(id) {
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
        if (!item)
            throw new NotFoundException('No se encontró el equipo.');
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
    create(dto) {
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
    async update(id, dto) {
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
};
EquiposService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], EquiposService);
export { EquiposService };
//# sourceMappingURL=equipos.service.js.map