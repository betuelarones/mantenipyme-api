import { Module } from '@nestjs/common';
import { IntervencionesController } from './intervenciones.controller.js';
import { IntervencionesService } from './intervenciones.service.js';

@Module({
  controllers: [IntervencionesController],
  providers: [IntervencionesService]
})
export class IntervencionesModule {}
