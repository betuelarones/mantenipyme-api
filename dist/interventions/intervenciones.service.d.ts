import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import type { CreateIntervencionDto } from './dto/create-intervencion.dto/create-intervencion.dto.js';
export declare class IntervencionesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    create(dto: CreateIntervencionDto, user: AuthenticatedUser): Promise<{
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
