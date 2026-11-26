# Mantenipyme API

MVP local en NestJS con módulos por dominio y Prisma como única capa de acceso a datos.

## Inicio con Docker en WSL

Desde WSL, entra al backend y levanta la API y PostgreSQL:

```sh
cd /mnt/c/Backend/Mantemiento/mantenipyme-backend
docker compose up -d --build
```

La API escucha en `http://localhost:3000`. Revisa el estado con `docker compose ps` y los logs de la API con `docker compose logs -f api`. Para detener los servicios, ejecuta `docker compose down`; los datos de PostgreSQL se conservan en `postgres_data`.

Para desarrollo sin Docker, instala dependencias, genera Prisma Client con `npm run db:generate` y arranca con `npm run start:dev`.

## Trabajo en equipo

- Cada desarrollador crea su propio `.env` copiando `.env.example`. `.env` está excluido de Git: nunca subas credenciales en commits.
- Usa `DATABASE_URL` para conectar Prisma a PostgreSQL. `compose.yaml` aplica valores de desarrollo por defecto y no requiere `POSTGRES_USER`, `POSTGRES_PASSWORD` ni `POSTGRES_DB` en `.env`.
- `ADMIN_EMAIL` y `ADMIN_PASSWORD` son credenciales locales de la plataforma, no credenciales de la base de datos. Comparte las contraseñas únicamente por un canal seguro.
- El esquema Prisma todavía no contiene modelos y el controlador `auth` aún no implementa inicio de sesión ni crea un administrador; definir estas variables no crea una cuenta por sí solo.

Si Prisma necesita tablas, primero deben acordarse y añadirse los modelos y migraciones al repositorio antes de ejecutar `npm run db:migrate`.

Para el MVP, JWT usa una clave aleatoria de proceso si no se define `JWT_SECRET`; los tokens dejan de ser válidos al reiniciar.

## Estructura

- `src/auth`: autenticación JWT y DTOs de acceso.
- `src/users`, `src/equipment`, `src/plans`, `src/incidents`, `src/interventions`, `src/notifications`, `src/metrics`: dominios independientes.
- `src/common`: guards, decoradores, filtros, enums e interfaces compartidas.
- `src/prisma`: cliente Prisma compartido.
- `prisma`: esquema y migraciones.

Los DTOs de los dominios están vacíos a propósito hasta acordar sus campos y reglas de validación.
# mantenipyme-api
