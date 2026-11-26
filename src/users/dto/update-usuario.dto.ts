import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Rol } from '../../common/enums/rol.enum.js';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsEnum(Rol)
  role?: Rol;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
