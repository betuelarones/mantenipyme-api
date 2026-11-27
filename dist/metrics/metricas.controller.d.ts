import { MetricasService } from './metricas.service.js';
export declare class MetricasController {
    private readonly metricasService;
    constructor(metricasService: MetricasService);
    summary(): Promise<{
        equipmentCount: number;
        openIncidentCount: number;
        assignedIncidentCount: number;
        closedIncidentCount: number;
        overdueMaintenanceCount: number;
        upcomingMaintenanceCount: number;
        completedInterventionCount: number;
    }>;
    summaryAlias(): Promise<{
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
