import { PrismaService } from '../prisma/prisma.service.js';
export declare class MetricasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    summary(): Promise<{
        equipmentCount: number;
        openIncidentCount: number;
        assignedIncidentCount: number;
        closedIncidentCount: number;
        overdueMaintenanceCount: number;
        upcomingMaintenanceCount: number;
        completedInterventionCount: number;
    }>;
    downtime(): Promise<{
        equipmentId: string;
        equipmentName: string;
        totalDowntimeMinutes: number;
        averageDowntimeMinutes: number;
    }[]>;
}
