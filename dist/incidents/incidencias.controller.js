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
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { AssignIncidenciaDto } from './dto/assign-incidencia.dto.js';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto/create-incidencia.dto.js';
import { IncidenciasService } from './incidencias.service.js';
let IncidenciasController = class IncidenciasController {
    incidenciasService;
    constructor(incidenciasService) {
        this.incidenciasService = incidenciasService;
    }
    list(user, status, priority, equipmentId) {
        return this.incidenciasService.list(user, { status, priority, equipmentId });
    }
    get(id, user) {
        return this.incidenciasService.get(id, user);
    }
    create(body, user) {
        return this.incidenciasService.create(body, user);
    }
    assign(id, body) {
        return this.incidenciasService.assign(id, body.assignedToId);
    }
    close(id, user) {
        return this.incidenciasService.close(id, user);
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __param(1, Query('status')),
    __param(2, Query('priority')),
    __param(3, Query('equipmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], IncidenciasController.prototype, "list", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IncidenciasController.prototype, "get", null);
__decorate([
    Post(),
    Roles(Rol.OPERATOR),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateIncidenciaDto, Object]),
    __metadata("design:returntype", void 0)
], IncidenciasController.prototype, "create", null);
__decorate([
    Patch(':id/assign'),
    Roles(Rol.MANAGER),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AssignIncidenciaDto]),
    __metadata("design:returntype", void 0)
], IncidenciasController.prototype, "assign", null);
__decorate([
    Patch(':id/close'),
    Roles(Rol.TECHNICIAN),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IncidenciasController.prototype, "close", null);
IncidenciasController = __decorate([
    Controller('incidencias'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    __metadata("design:paramtypes", [IncidenciasService])
], IncidenciasController);
export { IncidenciasController };
//# sourceMappingURL=incidencias.controller.js.map