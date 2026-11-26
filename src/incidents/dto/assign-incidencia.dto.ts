import { IsString } from 'class-validator';

export class AssignIncidenciaDto {
  @IsString()
  assignedToId!: string;
}
