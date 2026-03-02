import { prisma } from '~/database.js';
import { Prisma, type User } from '~/generated/prisma/client.js';
import { prismaHandler } from '~/utils/prisma-handler.js';

interface UserSearchParams {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  page?: number;
  limit?: number;
}

// Найти всех пользователей (учитывая пагинацию)
export async function findAllUsers(filter: UserSearchParams) {
  const {
    email,
    name,
    phone,
    address,
    createdAt,
    page = 1,
    limit = 5,
  } = filter;

  const skip = (Number(page) - 1) * Number(limit);

  if (!email && !name && !phone && !address && !createdAt)
    return prismaHandler(() =>
      prisma.user.findMany({
        take: Number(limit),
        skip,
        orderBy: { createdAt: 'desc' },
        omit: { hashedPassword: true },
      }),
    );

  if (email)
    return prismaHandler(() =>
      prisma.user.findUnique({
        where: { email },
        omit: { hashedPassword: true },
      }),
    );

  return prismaHandler(() =>
    prisma.user.findMany({
      where: {
        AND: [
          { name: { contains: name } },
          { phone: { contains: phone } },
          { address: { contains: address } },
          // { createdAt: { equals: new Date(createdAt)  } },
        ],
      },
      take: limit,
      skip,
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
