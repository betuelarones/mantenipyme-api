import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuariosService } from './usuarios.service.js';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
        createdAt: Date;
    }[]>;
    create(body: CreateUsuarioDto): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
        createdAt: Date;
    }>;
    update(id: string, body: UpdateUsuarioDto): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
        createdAt: Date;
    }>;
}
