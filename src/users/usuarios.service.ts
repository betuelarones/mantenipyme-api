import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword } from '../auth/password.js';
import type { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import type { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.usuario.findMany({
      select: {
        id: true, fullName: true, email: true, role: true,
        active: true, createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateUsuarioDto) {
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

  async update(id: string, dto: UpdateUsuarioDto) {
    const existing = await this.prisma.usuario.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('No se encontró el usuario.');
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
}
