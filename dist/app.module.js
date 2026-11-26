var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map