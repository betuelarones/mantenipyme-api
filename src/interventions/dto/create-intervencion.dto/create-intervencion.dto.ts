import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateIntervencionDto {
  @IsString()
  incidentId!: string;

  @IsString()
  @MinLength(3)
  action!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;
}
