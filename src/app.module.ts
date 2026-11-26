import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { EquiposModule } from './equipos/equipos.module.js';
import { PlanesModule } from './planes/planes.module.js';
import { IncidenciasModule } from './incidencias/incidencias.module.js';
import { IntervencionesModule } from './intervenciones/intervenciones.module.js';
import { NotificacionesModule } from './notificaciones/notificaciones.module.js';
import { MetricasModule } from './metricas/metricas.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    EquiposModule,
    PlanesModule,
    IncidenciasModule,
    IntervencionesModule,
    NotificacionesModule,
    MetricasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
