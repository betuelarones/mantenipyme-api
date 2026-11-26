import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class IncidenciasService {
  constructor(private readonly prisma: PrismaService) {}
}
