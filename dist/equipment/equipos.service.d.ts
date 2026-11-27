import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateEquipoDto } from './dto/create-equipo.dto.js';
import type { UpdateEquipoDto } from './dto/update-equipo.dto.js';
export declare class EquiposService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        responsibleName: string | null;
        responsible: {
            id: string;
            fullName: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        area: string;
        responsibleId: string | null;
    }[]>;
    get(id: string): Promise<{
        responsibleName: string | null;
        nextMaintenance: {
            id: string;
            name: string;
            dueAt: Date;
            reminderDays: number;
            responsibleName: string;
        } | null;
        responsible: {
            id: string;
            fullName: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        area: string;
        responsibleId: string | null;
    }>;
    create(dto: CreateEquipoDto): import("@prisma/client").Prisma.Prisma__EquipoClient<{
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        area: string;
        responsibleId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateEquipoDto): Promise<{
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        area: string;
        responsibleId: string | null;
    }>;
}
