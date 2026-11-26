import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Rol } from '../common/enums/rol.enum.js';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { jwtSecret } from './jwt-secret.js';

interface JwtPayload {
  sub: string;
  role: Rol;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    return { id: payload.sub, role: payload.role };
  }
}
