import { Module } from '@nestjs/common';
import { NotificacionesController } from './notificaciones.controller.js';
import { NotificacionesService } from './notificaciones.service.js';
import { RecordatoriosCron } from './recordatorios.cron.js';

@Module({
  controllers: [NotificacionesController],
  providers: [NotificacionesService, RecordatoriosCron]
})
export class NotificacionesModule {}
