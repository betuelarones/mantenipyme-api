import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import type { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface.js';
import { CreateIntervencionDto } from './dto/create-intervencion.dto/create-intervencion.dto.js';
import { IntervencionesService } from './intervenciones.service.js';

@Controller('intervenciones')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class IntervencionesController {
  constructor(private readonly intervencionesService: IntervencionesService) {}

  @Get()
  @Roles(Rol.MANAGER, Rol.OPERATOR, Rol.TECHNICIAN)
  list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('incidentId') incidentId?: string,
    @Query('equipmentId') equipmentId?: string,
  ) {
    return this.intervencionesService.list(user, incidentId, equipmentId);
  }

  @Post()
  @Roles(Rol.TECHNICIAN)
  create(@Body() body: CreateIntervencionDto, @CurrentUser() user: AuthenticatedUser) {
    return this.intervencionesService.create(body, user);
  }
}
