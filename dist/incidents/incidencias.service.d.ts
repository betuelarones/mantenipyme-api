import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import type { CreateIncidenciaDto } from './dto/create-incidencia.dto/create-incidencia.dto.js';
export declare class IncidenciasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly include;
    private shape;
    list(user: AuthenticatedUser, filters: {
        status?: string;
        priority?: string;
        equipmentId?: string;
    }): Promise<({
        equipment: {
            id: string;
            name: string;
            code: string;
            area: string;
        };
        interventions: ({
            technician: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            incidentId: string;
            technicianId: string;
            action: string;
            durationMinutes: number | null;
            occurredAt: Date;
        })[];
        reporter: {
            id: string;
            fullName: string;
        };
        assignedTo: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: string;
        status: import("@prisma/client").$Enums.EstadoIncidencia;
        assignedToId: string | null;
        symptom: string;
        priority: import("@prisma/client").$Enums.Prioridad;
        reporterId: string;
    } & {
        equipmentName: string;
        reporterName: string;
        assignedToName: string | null;
        interventions: {
            summary: string;
            actions: string;
            technicianName: string;
            id: string;
            action: string;
            occurredAt: Date;
            technician: {
                fullName: string;
            };
            durationMinutes: number | null;
        }[];
    })[]>;
    get(id: string, user: AuthenticatedUser): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
            area: string;
        };
        interventions: ({
            technician: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            incidentId: string;
            technicianId: string;
            action: string;
            durationMinutes: number | null;
            occurredAt: Date;
        })[];
        reporter: {
            id: string;
            fullName: string;
        };
        assignedTo: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: string;
        status: import("@prisma/client").$Enums.EstadoIncidencia;
        assignedToId: string | null;
        symptom: string;
        priority: import("@prisma/client").$Enums.Prioridad;
        reporterId: string;
    } & {
        equipmentName: string;
        reporterName: string;
        assignedToName: string | null;
        interventions: {
            summary: string;
            actions: string;
            technicianName: string;
            id: string;
            action: string;
            occurredAt: Date;
            technician: {
                fullName: string;
            };
            durationMinutes: number | null;
        }[];
    }>;
    create(dto: CreateIncidenciaDto, user: AuthenticatedUser): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
            area: string;
        };
        interventions: ({
            technician: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            incidentId: string;
            technicianId: string;
            action: string;
            durationMinutes: number | null;
            occurredAt: Date;
        })[];
        reporter: {
            id: string;
            fullName: string;
        };
        assignedTo: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: string;
        status: import("@prisma/client").$Enums.EstadoIncidencia;
        assignedToId: string | null;
        symptom: string;
        priority: import("@prisma/client").$Enums.Prioridad;
        reporterId: string;
    } & {
        equipmentName: string;
        reporterName: string;
        assignedToName: string | null;
        interventions: {
            summary: string;
            actions: string;
            technicianName: string;
            id: string;
            action: string;
            occurredAt: Date;
            technician: {
                fullName: string;
            };
            durationMinutes: number | null;
        }[];
    }>;
    assign(id: string, assignedToId: string): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
            area: string;
        };
        interventions: ({
            technician: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            incidentId: string;
            technicianId: string;
            action: string;
            durationMinutes: number | null;
            occurredAt: Date;
        })[];
        reporter: {
            id: string;
            fullName: string;
        };
        assignedTo: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: string;
        status: import("@prisma/client").$Enums.EstadoIncidencia;
        assignedToId: string | null;
        symptom: string;
        priority: import("@prisma/client").$Enums.Prioridad;
        reporterId: string;
    } & {
        equipmentName: string;
        reporterName: string;
        assignedToName: string | null;
        interventions: {
            summary: string;
            actions: string;
            technicianName: string;
            id: string;
            action: string;
            occurredAt: Date;
            technician: {
                fullName: string;
            };
            durationMinutes: number | null;
        }[];
    }>;
    close(id: string, user: AuthenticatedUser): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
            area: string;
        };
        interventions: ({
            technician: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            incidentId: string;
            technicianId: string;
            action: string;
            durationMinutes: number | null;
            occurredAt: Date;
        })[];
        reporter: {
            id: string;
            fullName: string;
        };
        assignedTo: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: string;
        status: import("@prisma/client").$Enums.EstadoIncidencia;
        assignedToId: string | null;
        symptom: string;
        priority: import("@prisma/client").$Enums.Prioridad;
        reporterId: string;
    } & {
        equipmentName: string;
        reporterName: string;
        assignedToName: string | null;
        interventions: {
            summary: string;
            actions: string;
            technicianName: string;
            id: string;
            action: string;
            occurredAt: Date;
            technician: {
                fullName: string;
            };
            durationMinutes: number | null;
        }[];
    }>;
}
