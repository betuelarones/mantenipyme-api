import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(1)
  code!: string;

  @IsString()
  @MinLength(1)
  area!: string;

  @IsOptional()
  @IsString()
  responsibleId?: string;
}
