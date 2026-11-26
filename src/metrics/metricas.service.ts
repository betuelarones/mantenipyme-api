import { Injectable } from '@nestjs/common';
import { EstadoIncidencia } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MetricasService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const now = new Date();
    const soon = new Date(now.getTime() + 7 * 86400000);
    const [
      equipmentCount, openIncidentCount, assignedIncidentCount,
      closedIncidentCount, overdueMaintenanceCount, upcomingMaintenanceCount,
    ] = await Promise.all([
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
      const durations = item.incidents.flatMap((incident) =>
        incident.interventions.map((intervention) => intervention.durationMinutes ?? 0),
      );
      const totalDowntimeMinutes = durations.reduce((sum, duration) => sum + duration, 0);
      return {
        equipmentId: item.id,
        equipmentName: item.name,
        totalDowntimeMinutes,
        averageDowntimeMinutes: durations.length ? totalDowntimeMinutes / durations.length : 0,
      };
    });
  }
}
