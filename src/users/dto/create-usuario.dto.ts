import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Rol } from '../../common/enums/rol.enum.js';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsEnum(Rol)
  role!: Rol;
}
