import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { jwtSecret } from './jwt-secret.js';
import { PrismaService } from '../prisma/prisma.service.js';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, active: true },
    });
    if (!user?.active) throw new UnauthorizedException();
    return { id: user.id, role: user.role };
  }
}
