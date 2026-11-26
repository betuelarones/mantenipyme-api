import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEquipoDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  code?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  area?: string;

  @IsOptional()
  @IsString()
  responsibleId?: string;
}
