import type { Appointment, Prisma } from '~/generated/prisma/client.js';
import { prisma } from '~/database.js';
import { prismaHandler } from '~/utils/prisma-handler.js';
import type { App } from 'supertest/types.js';

interface IAppointmentFilter {
  appointmentNumber?: string;
  date?: string;
  confirmed?: boolean;
  createdAt?: string;
}

export async function createAppointment(data: Prisma.AppointmentCreateArgs) {
  return prismaHandler(() => prisma.appointment.create(data));
}

export async function findAppointmentByAppointmentNumber(
  appNumber: Appointment['appointmentNumber'],
) {
  return prismaHandler(() =>
    prisma.appointment.findUnique({ where: { appointmentNumber: appNumber } }),
  );
}

export async function getAppointments({
  filter,
  page = 1,
  limit = 5,
}: {
  filter?: Prisma.AppointmentWhereInput;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  return prismaHandler(() =>
    prisma.appointment.findMany({
      where: filter,
      take: Number(limit),
      skip,
      orderBy: { createdAt: 'desc' },
    }),
  );
}

export async function removeAppointment(
  id: Prisma.AppointmentWhereUniqueInput,
) {
  return prismaHandler(() => prisma.appointment.delete({ where: id }));
}
