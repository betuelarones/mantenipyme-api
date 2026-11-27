var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { EstadoIncidencia } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let MetricasService = class MetricasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async summary() {
        const now = new Date();
        const soon = new Date(now.getTime() + 7 * 86400000);
        const [equipmentCount, openIncidentCount, assignedIncidentCount, closedIncidentCount, overdueMaintenanceCount, upcomingMaintenanceCount,] = await Promise.all([
            this.prisma.equipo.count(),
            this.prisma.incidencia.count({ where: { status: EstadoIncidencia.OPEN } }),
            this.prisma.incidencia.count({ where: { status: EstadoIncidencia.ASSIGNED } }),
            this.prisma.incidencia.count({ where: { status: EstadoIncidencia.CLOSED } }),
            this.prisma.plan.count({ where: { completedAt: null, dueAt: { lt: now } } }),
            this.prisma.plan.count({ where: { completedAt: null, dueAt: { gte: now, lte: soon } } }),
        ]);
        return {
            equipmentCount, openIncidentCount, assignedIncidentCount,
            closedIncidentCount, overdueMaintenanceCount, upcomingMaintenanceCount,
            completedInterventionCount: await this.prisma.intervencion.count(),
        };
    }
    async downtime() {
        const equipment = await this.prisma.equipo.findMany({
            select: {
                id: true,
                name: true,
                incidents: {
                    select: { interventions: { select: { durationMinutes: true } } },
                },
            },
            orderBy: { name: 'asc' },
        });
        return equipment.map((item) => {
            const durations = item.incidents.flatMap((incident) => incident.interventions.map((intervention) => intervention.durationMinutes ?? 0));
            const totalDowntimeMinutes = durations.reduce((sum, duration) => sum + duration, 0);
            return {
                equipmentId: item.id,
                equipmentName: item.name,
                totalDowntimeMinutes,
                averageDowntimeMinutes: durations.length ? totalDowntimeMinutes / durations.length : 0,
            };
        });
    }
};
MetricasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], MetricasService);
export { MetricasService };
//# sourceMappingURL=metricas.service.js.map