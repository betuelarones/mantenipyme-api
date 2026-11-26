import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface.js';

export const CurrentUser = createParamDecorator(
  (field: keyof AuthenticatedUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{
      user: AuthenticatedUser;
    }>();
    return field ? request.user[field] : request.user;
  },
);
