import { Rol } from '../../common/enums/rol.enum.js';
export declare class UpdateUsuarioDto {
    fullName?: string;
    email?: string;
    password?: string;
    role?: Rol;
    active?: boolean;
}
