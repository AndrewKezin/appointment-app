import { Prisma } from '~/generated/prisma/client.js';

const prismaErrorMapping: Record<string, string> = {
  P2001: 'The record searched for in the where condition does not exist',
  P2002: 'User with this email already exists',
  P1001:
    "Can't reach database server. Please make sure your database server is running",
};

export async function prismaHandler<T>(func: () => Promise<T>) {
  try {
    return await func();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const error = prismaErrorMapping[err.code];
      if (error) throw new Error(error);
      throw err;
    }
  }
}
