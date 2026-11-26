import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreateEquipoDto } from './dto/create-equipo.dto.js';
import { UpdateEquipoDto } from './dto/update-equipo.dto.js';
import { EquiposService } from './equipos.service.js';

@Controller('equipos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Get()
  list() {
    return this.equiposService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.equiposService.get(id);
  }

  @Post()
  @Roles(Rol.MANAGER)
  create(@Body() body: CreateEquipoDto) {
    return this.equiposService.create(body);
  }

  @Patch(':id')
  @Roles(Rol.MANAGER)
  update(@Param('id') id: string, @Body() body: UpdateEquipoDto) {
    return this.equiposService.update(id, body);
  }
}
