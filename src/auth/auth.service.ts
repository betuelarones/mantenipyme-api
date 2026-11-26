import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword, verifyPassword } from './password.js';
import type { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async onModuleInit(): Promise<void> {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password || password === 'change-this-before-use') return;

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

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    if (
      !user ||
      !user.active ||
      !(await verifyPassword(password, user.passwordHash))
    ) {
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

  async me(id: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, fullName: true, email: true, role: true, active: true },
    });
    if (!user?.active) throw new UnauthorizedException();
    return user;
  }
}
