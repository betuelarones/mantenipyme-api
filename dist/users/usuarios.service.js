var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword } from '../auth/password.js';
let UsuariosService = class UsuariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() {
        return this.prisma.usuario.findMany({
            select: {
                id: true, fullName: true, email: true, role: true,
                active: true, createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(dto) {
        const email = dto.email.trim().toLowerCase();
        if (await this.prisma.usuario.findUnique({ where: { email } })) {
            throw new ConflictException('Ya existe una cuenta con ese correo.');
        }
        return this.prisma.usuario.create({
            data: {
                fullName: dto.fullName.trim(),
                email,
                passwordHash: await hashPassword(dto.password),
                role: dto.role,
            },
            select: {
                id: true, fullName: true, email: true, role: true,
                active: true, createdAt: true,
            },
        });
    }
    async update(id, dto) {
        const existing = await this.prisma.usuario.findUnique({ where: { id } });
        if (!existing)
            throw new NotFoundException('No se encontró el usuario.');
        const email = dto.email?.trim().toLowerCase();
        if (email && email !== existing.email &&
            await this.prisma.usuario.findUnique({ where: { email } })) {
            throw new ConflictException('Ya existe una cuenta con ese correo.');
        }
        return this.prisma.usuario.update({
            where: { id },
            data: {
                ...(dto.fullName !== undefined && { fullName: dto.fullName.trim() }),
                ...(email && { email }),
                ...(dto.role !== undefined && { role: dto.role }),
                ...(dto.active !== undefined && { active: dto.active }),
                ...(dto.password && { passwordHash: await hashPassword(dto.password) }),
            },
            select: {
                id: true, fullName: true, email: true, role: true,
                active: true, createdAt: true,
            },
        });
    }
};
UsuariosService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsuariosService);
export { UsuariosService };
//# sourceMappingURL=usuarios.service.js.map