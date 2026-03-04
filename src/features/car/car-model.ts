import { prisma } from '~/database.js';
import type { Car, Prisma } from '~/generated/prisma/client.js';
import type { CarCreateInput } from '~/generated/prisma/models.js';
import { prismaHandler } from '~/utils/prisma-handler.js';

interface ICarFilter {
  regNumber?: string;
  vinNumber?: string;
  manufacturer?: string;
  model?: string;
  year?: number;
  color?: string;
  regCertificate?: string;
  mileage?: number;
  createdAt?: string;
  page?: number;
  limit?: number;
}

export async function createCar(data: Prisma.CarCreateInput) {
  return prismaHandler(() => prisma.car.create({ data }));
}

export async function findCarById(id: Car['id']) {
  return prismaHandler(() => prisma.car.findFirst({ where: { id } }));
}

export async function findCars(filter: ICarFilter) {
  const {
    regNumber,
    vinNumber,
    manufacturer,
    model,
    year,
    color,
    regCertificate,
    mileage,
    createdAt,
    page = 1,
    limit = 5,
  } = filter;

  const skip = (page - 1) * limit;

  if (
    !regNumber &&
    !vinNumber &&
    !manufacturer &&
    !model &&
    !year &&
    !color &&
    !regCertificate &&
    !mileage &&
    !createdAt
  )
    return prismaHandler(() => prisma.car.findMany());

  if (vinNumber)
    return prismaHandler(() => prisma.car.findFirst({ where: { vinNumber } }));

  return prismaHandler(() =>
    prisma.car.findMany({
      where: {
        AND: [
          { regNumber: { contains: regNumber } },
          { manufacturer: { contains: manufacturer } },
          { model: { contains: model } },
          { year: { equals: year } },
          { color: { contains: color } },
          { regCertificate: { contains: regCertificate } },
          { mileage: { equals: mileage } },
          // { createdAt: { contains: createdAt } },
        ],
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    }),
  );
}

export async function updateCar(id: Car['id'], data: CarCreateInput) {
  return prismaHandler(() => prisma.car.update({ where: { id }, data }));
}

export async function removeCar(id: Car['id']) {
  return prismaHandler(() => prisma.car.delete({ where: { id } }));
}
