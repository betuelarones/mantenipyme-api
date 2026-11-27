import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import type { LoginDto } from './dto/login.dto.js';
export declare class AuthService implements OnModuleInit {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    onModuleInit(): Promise<void>;
    login({ email, password }: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            fullName: string;
            email: string;
            role: import("@prisma/client").$Enums.Rol;
        };
    }>;
    me(id: string): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
    }>;
}
