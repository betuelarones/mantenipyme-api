import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { AssignIncidenciaDto } from './dto/assign-incidencia.dto.js';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto/create-incidencia.dto.js';
import { IncidenciasService } from './incidencias.service.js';
export declare class IncidenciasController {
    private readonly incidenciasService;
    constructor(incidenciasService: IncidenciasService);
    list(user: AuthenticatedUser, status?: string, priority?: string, equipmentId?: string): Promise<({
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
    create(body: CreateIncidenciaDto, user: AuthenticatedUser): Promise<{
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
    assign(id: string, body: AssignIncidenciaDto): Promise<{
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
