// файл database.ts для подключения к БД позволяет избежать создания нового экземпляра Prisma при каждой hot reload в режиме для разработки.

// import { PrismaClient } from '@prisma/client';

import { PrismaClient } from "@prisma/client/extension";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}