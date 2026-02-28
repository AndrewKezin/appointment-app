// файл database.ts для подключения к БД позволяет избежать создания нового экземпляра Prisma при каждой hot reload в режиме для разработки

// В версии Prisma 7 и выше необходимо использовать адаптер PrismaPg, а PrismaClient импортировать из "./generated/prisma/client.js"
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
