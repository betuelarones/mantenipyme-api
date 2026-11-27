import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import type { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
export declare class UsuariosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
        createdAt: Date;
    }[]>;
    create(dto: CreateUsuarioDto): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUsuarioDto): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
        createdAt: Date;
    }>;
}
