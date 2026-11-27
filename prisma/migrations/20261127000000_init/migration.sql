-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('MANAGER', 'OPERATOR', 'TECHNICIAN');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "EstadoIncidencia" AS ENUM ('OPEN', 'ASSIGNED', 'CLOSED');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Rol" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "responsibleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "responsibleId" TEXT,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "reminderDays" INTEGER NOT NULL DEFAULT 7,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incidencia" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "symptom" TEXT NOT NULL,
    "priority" "Prioridad" NOT NULL,
    "status" "EstadoIncidencia" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incidencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervencion" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "durationMinutes" INTEGER,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Intervencion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_code_key" ON "Equipo"("code");

-- CreateIndex
CREATE INDEX "Equipo_name_idx" ON "Equipo"("name");

-- CreateIndex
CREATE INDEX "Plan_dueAt_completedAt_idx" ON "Plan"("dueAt", "completedAt");

-- CreateIndex
CREATE INDEX "Plan_equipmentId_idx" ON "Plan"("equipmentId");

-- CreateIndex
CREATE INDEX "Incidencia_status_createdAt_idx" ON "Incidencia"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Incidencia_assignedToId_status_idx" ON "Incidencia"("assignedToId", "status");

-- CreateIndex
CREATE INDEX "Incidencia_equipmentId_idx" ON "Incidencia"("equipmentId");

-- CreateIndex
CREATE INDEX "Intervencion_incidentId_occurredAt_idx" ON "Intervencion"("incidentId", "occurredAt");

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervencion" ADD CONSTRAINT "Intervencion_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incidencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervencion" ADD CONSTRAINT "Intervencion_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
