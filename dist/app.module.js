var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map