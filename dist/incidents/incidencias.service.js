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
import { EstadoIncidencia, Prioridad, Rol } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let IncidenciasService = class IncidenciasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    include = {
        equipment: { select: { id: true, name: true, code: true, area: true } },
        reporter: { select: { id: true, fullName: true } },
        assignedTo: { select: { id: true, fullName: true } },
        interventions: {
            include: { technician: { select: { id: true, fullName: true } } },
            orderBy: { occurredAt: 'asc' },
        },
    };
    shape(incident) {
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
    async list(user, filters) {
        const where = {
            ...(filters.status && Object.values(EstadoIncidencia).includes(filters.status) && {
                status: filters.status,
            }),
            ...(filters.priority && Object.values(Prioridad).includes(filters.priority) && {
                priority: filters.priority,
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
    async get(id, user) {
        const incident = await this.prisma.incidencia.findUnique({
            where: { id }, include: this.include,
        });
        if (!incident)
            throw new NotFoundException('No se encontró la incidencia.');
        if (user.role === Rol.OPERATOR && incident.reporterId !== user.id) {
            throw new ForbiddenException();
        }
        if (user.role === Rol.TECHNICIAN && incident.assignedToId !== user.id) {
            throw new ForbiddenException();
        }
        return this.shape(incident);
    }
    async create(dto, user) {
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
    async assign(id, assignedToId) {
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
    async close(id, user) {
        const incident = await this.prisma.incidencia.findUnique({
            where: { id }, include: { _count: { select: { interventions: true } } },
        });
        if (!incident)
            throw new NotFoundException('No se encontró la incidencia.');
        if (incident.assignedToId !== user.id)
            throw new ForbiddenException();
        if (incident._count.interventions === 0) {
            throw new ForbiddenException('Registra al menos una intervención antes de cerrar.');
        }
        const closed = await this.prisma.incidencia.update({
            where: { id }, data: { status: EstadoIncidencia.CLOSED },
            include: this.include,
        });
        return this.shape(closed);
    }
};
IncidenciasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], IncidenciasService);
export { IncidenciasService };
//# sourceMappingURL=incidencias.service.js.map