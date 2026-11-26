import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { MetricasService } from './metricas.service.js';

@Controller('metricas')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Rol.MANAGER)
export class MetricasController {
  constructor(private readonly metricasService: MetricasService) {}

  @Get()
  summary() {
    return this.metricasService.summary();
  }

  @Get('summary')
  summaryAlias() {
    return this.metricasService.summary();
  }

  @Get('downtime')
  downtime() {
    return this.metricasService.downtime();
  }
}
