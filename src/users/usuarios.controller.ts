import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuariosService } from './usuarios.service.js';

@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Rol.MANAGER)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  list() {
    return this.usuariosService.list();
  }

  @Post()
  create(@Body() body: CreateUsuarioDto) {
    return this.usuariosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUsuarioDto) {
    return this.usuariosService.update(id, body);
  }
}
