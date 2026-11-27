import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { CreateIntervencionDto } from './dto/create-intervencion.dto/create-intervencion.dto.js';
import { IntervencionesService } from './intervenciones.service.js';
export declare class IntervencionesController {
    private readonly intervencionesService;
    constructor(intervencionesService: IntervencionesService);
    list(user: AuthenticatedUser, incidentId?: string, equipmentId?: string): Promise<{
        summary: string;
        actions: string;
        technicianName: string;
        equipmentName: string;
        incident: {
            equipment: {
                name: string;
            };
        };
        technician: {
            fullName: string;
        };
        id: string;
        incidentId: string;
        technicianId: string;
        action: string;
        durationMinutes: number | null;
        occurredAt: Date;
    }[]>;
    create(body: CreateIntervencionDto, user: AuthenticatedUser): Promise<{
        summary: string;
        actions: string;
        technicianName: string;
        technician: {
            fullName: string;
        };
        id: string;
        incidentId: string;
        technicianId: string;
        action: string;
        durationMinutes: number | null;
        occurredAt: Date;
    }>;
}
