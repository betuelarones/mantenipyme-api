import { IsEnum, IsString, MinLength } from 'class-validator';
import { Prioridad } from '../../../common/enums/prioridad.enum.js';

export class CreateIncidenciaDto {
  @IsString()
  equipmentId!: string;

  @IsString()
  @MinLength(5)
  symptom!: string;

  @IsEnum(Prioridad)
  priority!: Prioridad;
}
