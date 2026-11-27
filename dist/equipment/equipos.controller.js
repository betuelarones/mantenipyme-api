var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreateEquipoDto } from './dto/create-equipo.dto.js';
import { UpdateEquipoDto } from './dto/update-equipo.dto.js';
import { EquiposService } from './equipos.service.js';
let EquiposController = class EquiposController {
    equiposService;
    constructor(equiposService) {
        this.equiposService = equiposService;
    }
    list() {
        return this.equiposService.list();
    }
    get(id) {
        return this.equiposService.get(id);
    }
    create(body) {
        return this.equiposService.create(body);
    }
    update(id, body) {
        return this.equiposService.update(id, body);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "get", null);
__decorate([
    Post(),
    Roles(Rol.MANAGER),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "create", null);
__decorate([
    Patch(':id'),
    Roles(Rol.MANAGER),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateEquipoDto]),
    __metadata("design:returntype", void 0)
], EquiposController.prototype, "update", null);
EquiposController = __decorate([
    Controller('equipos'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    __metadata("design:paramtypes", [EquiposService])
], EquiposController);
export { EquiposController };
//# sourceMappingURL=equipos.controller.js.map