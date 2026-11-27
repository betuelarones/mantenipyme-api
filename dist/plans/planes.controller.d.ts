import { CreatePlanDto } from './dto/create-plan.dto/create-plan.dto.js';
import { UpdatePlanDto } from './dto/update-plan.dto.js';
import { PlanesService } from './planes.service.js';
export declare class PlanesController {
    private readonly planesService;
    constructor(planesService: PlanesService);
    upcoming(): Promise<({
        equipment: {
            id: string;
            name: string;
            code: string;
        };
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        responsibleId: string | null;
        completedAt: Date | null;
        dueAt: Date;
        equipmentId: string;
        reminderDays: number;
    } & {
        equipmentName: string;
        responsibleName: string;
        status: string;
    })[]>;
    list(equipmentId?: string, status?: string): Promise<({
        equipment: {
            id: string;
            name: string;
            code: string;
        };
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        responsibleId: string | null;
        completedAt: Date | null;
        dueAt: Date;
        equipmentId: string;
        reminderDays: number;
    } & {
        equipmentName: string;
        responsibleName: string;
        status: string;
    })[]>;
    get(id: string): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
        };
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        responsibleId: string | null;
        completedAt: Date | null;
        dueAt: Date;
        equipmentId: string;
        reminderDays: number;
    } & {
        equipmentName: string;
        responsibleName: string;
        status: string;
    }>;
    create(body: CreatePlanDto): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
        };
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        responsibleId: string | null;
        completedAt: Date | null;
        dueAt: Date;
        equipmentId: string;
        reminderDays: number;
    } & {
        equipmentName: string;
        responsibleName: string;
        status: string;
    }>;
    complete(id: string): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
        };
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        responsibleId: string | null;
        completedAt: Date | null;
        dueAt: Date;
        equipmentId: string;
        reminderDays: number;
    } & {
        equipmentName: string;
        responsibleName: string;
        status: string;
    }>;
    update(id: string, body: UpdatePlanDto): Promise<{
        equipment: {
            id: string;
            name: string;
            code: string;
        };
        responsible: {
            id: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        responsibleId: string | null;
        completedAt: Date | null;
        dueAt: Date;
        equipmentId: string;
        reminderDays: number;
    } & {
        equipmentName: string;
        responsibleName: string;
        status: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
