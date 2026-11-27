import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthService } from './auth.service.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            fullName: string;
            email: string;
            role: import("@prisma/client").$Enums.Rol;
        };
    }>;
    me(user: AuthenticatedUser): Promise<{
        id: string;
        role: import("@prisma/client").$Enums.Rol;
        email: string;
        fullName: string;
        active: boolean;
    }>;
}
