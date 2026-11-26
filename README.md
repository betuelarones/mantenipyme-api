# Mantenipyme API

NestJS API for the ManteniPyme maintenance management MVP.

## Run with Docker

From this directory, build and start the API and PostgreSQL:

```sh
docker compose up -d --build
```

The API is available at `http://localhost:3000`. Check container health with `docker compose ps` and follow API logs with `docker compose logs -f api`. Stop containers with `docker compose down`; PostgreSQL data stays in the `postgres_data` volume.

## First manager account

Before the first startup, set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` in `.env`. On startup, the API creates a MANAGER account only if that email does not exist. There is no public registration, and an existing account's password is never overwritten. Rebuild and restart after setting the values with `docker compose up -d --build`.

For development outside Docker, run `npm install`, `npm run db:generate`, `npm run db:push`, and `npm run start:dev`.

## Team setup

- Each developer keeps a local `.env`, which is ignored by Git. Never commit credentials.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are platform account credentials, not PostgreSQL credentials.
- The API synchronizes the Prisma schema on container startup; `npm run db:push` does the same for local development.
- Use a stable, private `JWT_SECRET` so tokens remain valid after restarts.

## Structure

- `src/auth`: JWT authentication.
- `src/users`, `src/equipment`, `src/plans`, `src/incidents`, `src/interventions`, `src/metrics`: domain modules.
- `src/common`: shared guards, decorators, filters, enums and interfaces.
- `src/prisma` and `prisma`: database client and schema.
