import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePlanDto } from './dto/create-plan.dto/create-plan.dto.js';
import type { UpdatePlanDto } from './dto/update-plan.dto.js';
export declare class PlanesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly include;
    private shape;
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
    create(dto: CreatePlanDto): Promise<{
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
    update(id: string, dto: UpdatePlanDto): Promise<{
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
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
