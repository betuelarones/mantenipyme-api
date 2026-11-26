import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/auth/password.js';

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password || password === 'change-this-before-use') {
  throw new Error('ADMIN_EMAIL y ADMIN_PASSWORD válidos son obligatorios para crear el administrador.');
}

const existing = await prisma.usuario.findUnique({ where: { email } });

if (existing) {
  await prisma.usuario.update({
    where: { email },
    data: { passwordHash: await hashPassword(password), active: true, role: 'MANAGER' },
  });
} else {
  await prisma.usuario.create({
    data: {
      email,
      fullName: 'Administrador',
      passwordHash: await hashPassword(password),
      role: 'MANAGER',
    },
  });
}

const demoPassword = await hashPassword('Demo2026!');
const demoUsers = [
  { fullName: 'Laura Operadora', email: 'operador@demo.com', role: 'OPERATOR' as const },
  { fullName: 'Diego Técnico', email: 'tecnico@demo.com', role: 'TECHNICIAN' as const },
  { fullName: 'Marta Técnica', email: 'tecnica@demo.com', role: 'TECHNICIAN' as const },
];

for (const user of demoUsers) {
  await prisma.usuario.upsert({
    where: { email: user.email },
    update: { fullName: user.fullName, role: user.role, active: true, passwordHash: demoPassword },
    create: { ...user, passwordHash: demoPassword },
  });
}

const [operator, technician, secondTechnician] = await Promise.all(
  demoUsers.map(({ email }) => prisma.usuario.findUniqueOrThrow({ where: { email } })),
);

const equipment = [
  { name: 'Compresor de aire principal', code: 'CMP-001', area: 'Producción', responsibleId: technician.id },
  { name: 'Bomba hidráulica línea 2', code: 'BOM-002', area: 'Planta', responsibleId: secondTechnician.id },
  { name: 'Tablero eléctrico general', code: 'TAB-003', area: 'Mantenimiento', responsibleId: technician.id },
  { name: 'Sistema de ventilación', code: 'VEN-004', area: 'Bodega', responsibleId: null },
];

for (const item of equipment) {
  await prisma.equipo.upsert({ where: { code: item.code }, update: item, create: item });
}

const [compressor, pump, panel, ventilation] = await Promise.all(
  equipment.map(({ code }) => prisma.equipo.findUniqueOrThrow({ where: { code } })),
);

const now = new Date();
const daysFromNow = (days: number) => new Date(now.getTime() + days * 86_400_000);
const plans = [
  { name: 'Inspección y lubricación del compresor', equipmentId: compressor.id, responsibleId: technician.id, dueAt: daysFromNow(5), completedAt: null, reminderDays: 7 },
  { name: 'Cambio de sello bomba hidráulica', equipmentId: pump.id, responsibleId: secondTechnician.id, dueAt: daysFromNow(-4), completedAt: null, reminderDays: 5 },
  { name: 'Revisión de protecciones eléctricas', equipmentId: panel.id, responsibleId: technician.id, dueAt: daysFromNow(-20), completedAt: daysFromNow(-18), reminderDays: 7 },
  { name: 'Limpieza de filtros de ventilación', equipmentId: ventilation.id, responsibleId: null, dueAt: daysFromNow(18), completedAt: null, reminderDays: 10 },
];

for (const plan of plans) {
  const existingPlan = await prisma.plan.findFirst({ where: { name: plan.name, equipmentId: plan.equipmentId } });
  if (existingPlan) await prisma.plan.update({ where: { id: existingPlan.id }, data: plan });
  else await prisma.plan.create({ data: plan });
}

const incidents = [
  { symptom: 'El compresor presenta vibración inusual', equipmentId: compressor.id, reporterId: operator.id, assignedToId: technician.id, priority: 'HIGH' as const, status: 'ASSIGNED' as const },
  { symptom: 'La bomba pierde presión durante el arranque', equipmentId: pump.id, reporterId: operator.id, assignedToId: null, priority: 'MEDIUM' as const, status: 'OPEN' as const },
  { symptom: 'Alarma intermitente en tablero eléctrico', equipmentId: panel.id, reporterId: operator.id, assignedToId: secondTechnician.id, priority: 'LOW' as const, status: 'CLOSED' as const },
];

for (const incident of incidents) {
  const existingIncident = await prisma.incidencia.findFirst({ where: { symptom: incident.symptom, equipmentId: incident.equipmentId } });
  if (existingIncident) await prisma.incidencia.update({ where: { id: existingIncident.id }, data: incident });
  else await prisma.incidencia.create({ data: incident });
}

const closedIncident = await prisma.incidencia.findFirstOrThrow({ where: { symptom: incidents[2].symptom } });
await prisma.intervencion.upsert({
  where: { id: 'demo-intervention-001' },
  update: { action: 'Se ajustaron terminales y se reemplazó fusible de control.', durationMinutes: 90, technicianId: secondTechnician.id, incidentId: closedIncident.id },
  create: { id: 'demo-intervention-001', action: 'Se ajustaron terminales y se reemplazó fusible de control.', durationMinutes: 90, technicianId: secondTechnician.id, incidentId: closedIncident.id },
});

await prisma.$disconnect();
