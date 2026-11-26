import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { Rol } from '../enums/rol.enum.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
    }>();
    return request.user !== undefined && roles.includes(request.user.role);
  }
}
