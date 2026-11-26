import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { AssignIncidenciaDto } from './dto/assign-incidencia.dto.js';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto/create-incidencia.dto.js';
import { IncidenciasService } from './incidencias.service.js';

@Controller('incidencias')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class IncidenciasController {
  constructor(private readonly incidenciasService: IncidenciasService) {}

  @Get()
  list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('equipmentId') equipmentId?: string,
  ) {
    return this.incidenciasService.list(user, { status, priority, equipmentId });
  }

  @Get(':id')
  get(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.incidenciasService.get(id, user);
  }

  @Post()
  @Roles(Rol.OPERATOR)
  create(@Body() body: CreateIncidenciaDto, @CurrentUser() user: AuthenticatedUser) {
    return this.incidenciasService.create(body, user);
  }

  @Patch(':id/assign')
  @Roles(Rol.MANAGER)
  assign(@Param('id') id: string, @Body() body: AssignIncidenciaDto) {
    return this.incidenciasService.assign(id, body.assignedToId);
  }

  @Patch(':id/close')
  @Roles(Rol.TECHNICIAN)
  close(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.incidenciasService.close(id, user);
  }
}
