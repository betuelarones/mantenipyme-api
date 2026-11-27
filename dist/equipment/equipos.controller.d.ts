import { CreateEquipoDto } from './dto/create-equipo.dto.js';
import { UpdateEquipoDto } from './dto/update-equipo.dto.js';
import { EquiposService } from './equipos.service.js';
export declare class EquiposController {
    private readonly equiposService;
    constructor(equiposService: EquiposService);
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
    create(body: CreateEquipoDto): import("@prisma/client").Prisma.Prisma__EquipoClient<{
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
    update(id: string, body: UpdateEquipoDto): Promise<{
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
