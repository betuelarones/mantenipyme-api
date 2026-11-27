import { Rol } from '../../common/enums/rol.enum.js';
export declare class CreateUsuarioDto {
    fullName: string;
    email: string;
    password: string;
    role: Rol;
}
