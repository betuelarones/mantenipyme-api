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
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Rol } from '../common/enums/rol.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreatePlanDto } from './dto/create-plan.dto/create-plan.dto.js';
import { UpdatePlanDto } from './dto/update-plan.dto.js';
import { PlanesService } from './planes.service.js';
let PlanesController = class PlanesController {
    planesService;
    constructor(planesService) {
        this.planesService = planesService;
    }
    upcoming() {
        return this.planesService.upcoming();
    }
    list(equipmentId, status) {
        return this.planesService.list(equipmentId, status);
    }
    get(id) {
        return this.planesService.get(id);
    }
    create(body) {
        return this.planesService.create(body);
    }
    complete(id) {
        return this.planesService.complete(id);
    }
    update(id, body) {
        return this.planesService.update(id, body);
    }
    remove(id) {
        return this.planesService.remove(id);
    }
};
__decorate([
    Get('upcoming'),
    Roles(Rol.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "upcoming", null);
__decorate([
    Get(),
    Roles(Rol.MANAGER),
    __param(0, Query('equipmentId')),
    __param(1, Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "list", null);
__decorate([
    Get(':id'),
    Roles(Rol.MANAGER),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "get", null);
__decorate([
    Post(),
    Roles(Rol.MANAGER),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePlanDto]),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "create", null);
__decorate([
    Patch(':id/complete'),
    Roles(Rol.MANAGER),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "complete", null);
__decorate([
    Patch(':id'),
    Roles(Rol.MANAGER),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdatePlanDto]),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Rol.MANAGER),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanesController.prototype, "remove", null);
PlanesController = __decorate([
    Controller('planes'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    __metadata("design:paramtypes", [PlanesService])
], PlanesController);
export { PlanesController };
//# sourceMappingURL=planes.controller.js.map