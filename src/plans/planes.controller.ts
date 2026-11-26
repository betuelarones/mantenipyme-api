import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreatePlanDto } from './dto/create-plan.dto/create-plan.dto.js';
import { UpdatePlanDto } from './dto/update-plan.dto.js';
import { PlanesService } from './planes.service.js';

@Controller('planes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Get('upcoming')
  @Roles(Rol.MANAGER)
  upcoming() {
    return this.planesService.upcoming();
  }

  @Get()
  @Roles(Rol.MANAGER)
  list(@Query('equipmentId') equipmentId?: string, @Query('status') status?: string) {
    return this.planesService.list(equipmentId, status);
  }

  @Get(':id')
  @Roles(Rol.MANAGER)
  get(@Param('id') id: string) {
    return this.planesService.get(id);
  }

  @Post()
  @Roles(Rol.MANAGER)
  create(@Body() body: CreatePlanDto) {
    return this.planesService.create(body);
  }

  @Patch(':id/complete')
  @Roles(Rol.MANAGER)
  complete(@Param('id') id: string) {
    return this.planesService.complete(id);
  }

  @Patch(':id')
  @Roles(Rol.MANAGER)
  update(@Param('id') id: string, @Body() body: UpdatePlanDto) {
    return this.planesService.update(id, body);
  }

  @Delete(':id')
  @Roles(Rol.MANAGER)
  remove(@Param('id') id: string) {
    return this.planesService.remove(id);
  }
}
