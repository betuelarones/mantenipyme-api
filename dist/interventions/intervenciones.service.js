var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EstadoIncidencia, Rol } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let IntervencionesService = class IntervencionesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(user, incidentId, equipmentId) {
        if (incidentId && user.role === Rol.TECHNICIAN) {
            const incident = await this.prisma.incidencia.findUnique({
                where: { id: incidentId }, select: { assignedToId: true },
            });
            if (!incident || incident.assignedToId !== user.id)
                throw new ForbiddenException();
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
    async create(dto, user) {
        const incident = await this.prisma.incidencia.findUnique({
            where: { id: dto.incidentId },
            select: { id: true, assignedToId: true, status: true },
        });
        if (!incident)
            throw new NotFoundException('No se encontró la incidencia.');
        if (incident.assignedToId !== user.id)
            throw new ForbiddenException();
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
};
IntervencionesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], IntervencionesService);
export { IntervencionesService };
//# sourceMappingURL=intervenciones.service.js.map