import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsuariosModule } from './users/usuarios.module.js';
import { EquiposModule } from './equipment/equipos.module.js';
import { PlanesModule } from './plans/planes.module.js';
import { IncidenciasModule } from './incidents/incidencias.module.js';
import { IntervencionesModule } from './interventions/intervenciones.module.js';
import { MetricasModule } from './metrics/metricas.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsuariosModule,
    EquiposModule,
    PlanesModule,
    IncidenciasModule,
    IntervencionesModule,
    MetricasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
