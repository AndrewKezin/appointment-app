import { prisma } from '~/database.js';
import { Prisma, type User } from '~/generated/prisma/client.js';
import { prismaHandler } from '~/utils/prisma-handler.js';

// Найти всех пользователей (учитывая пагинацию)
export async function findAllUsers({
  email,
  name,
  phone,
  address,
  created_at,
  page = 1,
  limit = 10,
}: {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  created_at?: Date;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  return prismaHandler(() =>
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      omit: { hashedPassword: true },
    }),
  );
}

// Создать пользователя
export async function createUser(userData: Prisma.UserCreateInput) {
  return prismaHandler(() => prisma.user.create({ data: userData }));
}

// Поиск пользователя(-ей)
// Найти пользователя по id
export async function findUserById(id: User['id']) {
  return prismaHandler(() =>
    prisma.user.findUnique({ where: { id }, omit: { hashedPassword: true } }),
  );
}

// Обновление профиля пользователя
export async function updateUser(id: User['id'], data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

// Удаление пользователя
export async function removeUser(id: User['id']) {
  return prisma.user.delete({ where: { id } });
}
