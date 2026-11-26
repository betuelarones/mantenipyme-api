# Mantenipyme API

MVP local en NestJS con módulos por dominio y Prisma como única capa de acceso a datos.

## Inicio local

1. Instala dependencias: `npm install`.
2. Copia `.env.example` a `.env` y conserva ahí tus credenciales del administrador.
3. Levanta PostgreSQL con Docker: `docker compose up -d db` (o desde WSL: `wsl docker compose up -d db`).
   Esto crea la base `mantenipyme` y conserva los datos en el volumen `postgres_data`.
4. Genera Prisma Client: `npm run db:generate`.
5. Cuando existan modelos en `prisma/schema.prisma`, crea la migración inicial con `npm run db:migrate`.
6. Inicia el servidor: `npm run start:dev`.

Las credenciales por defecto de PostgreSQL en `compose.yaml` son solo para desarrollo local; puedes cambiarlas en `.env` y actualizar `DATABASE_URL` para que coincidan.

La API escucha en `http://localhost:3000`. Para el MVP, JWT usa una clave aleatoria de proceso si no se define `JWT_SECRET`; los tokens dejan de ser válidos al reiniciar.

## Estructura

- `src/auth`: autenticación JWT y DTOs de acceso.
- `src/usuarios`, `equipos`, `planes`, `incidencias`, `intervenciones`, `notificaciones`, `metricas`: dominios independientes.
- `src/common`: guards, decoradores, filtros, enums e interfaces compartidas.
- `src/prisma`: cliente Prisma compartido.
- `prisma`: esquema y migraciones.

Los DTOs de los dominios están vacíos a propósito hasta acordar sus campos y reglas de validación.
# mantenipyme-api
