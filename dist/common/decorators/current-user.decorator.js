import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((field, context) => {
    const request = context.switchToHttp().getRequest();
    return field ? request.user[field] : request.user;
});
//# sourceMappingURL=current-user.decorator.js.map