var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword, verifyPassword } from './password.js';
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async onModuleInit() {
        const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD;
        if (!email || !password || password === 'change-this-before-use')
            return;
        const existing = await this.prisma.usuario.findUnique({ where: { email } });
        if (!existing) {
            await this.prisma.usuario.create({
                data: {
                    email,
                    fullName: 'Administrador',
                    passwordHash: await hashPassword(password),
                    role: 'MANAGER',
                },
            });
        }
    }
    async login({ email, password }) {
        const user = await this.prisma.usuario.findUnique({
            where: { email: email.trim().toLowerCase() },
        });
        if (!user ||
            !user.active ||
            !(await verifyPassword(password, user.passwordHash))) {
            throw new UnauthorizedException('Correo o contraseña incorrectos.');
        }
        return {
            accessToken: await this.jwt.signAsync({ sub: user.id, role: user.role }),
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        };
    }
    async me(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
            select: { id: true, fullName: true, email: true, role: true, active: true },
        });
        if (!user?.active)
            throw new UnauthorizedException();
        return user;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map