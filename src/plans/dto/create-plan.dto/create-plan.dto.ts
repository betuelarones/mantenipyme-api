import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  equipmentId!: string;

  @Type(() => Date)
  @IsDate()
  dueAt!: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reminderDays?: number;

  @IsOptional()
  @IsString()
  responsibleId?: string;
}
