var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
export class CreatePlanDto {
    name;
    equipmentId;
    dueAt;
    reminderDays;
    responsibleId;
}
__decorate([
    IsString(),
    MinLength(2),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "equipmentId", void 0);
__decorate([
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CreatePlanDto.prototype, "dueAt", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "reminderDays", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "responsibleId", void 0);
//# sourceMappingURL=create-plan.dto.js.map