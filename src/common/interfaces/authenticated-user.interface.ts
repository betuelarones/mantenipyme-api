import { Rol } from '../enums/rol.enum.js';

export interface AuthenticatedUser {
  id: string;
  role: Rol;
}
