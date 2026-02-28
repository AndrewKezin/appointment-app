import { prisma } from '~/database.js';
import { Prisma, type User } from '~/generated/prisma/client.js';


// Создать пользователя
export async function createUser(user: Prisma.UserCreateInput) {
  return await prisma.user.create({ data: user });
}

// Поиск пользователя(-ей)
// Найти пользователя по id
export async function findUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}

// Найти пользователя по email
export async function findUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } });
}

// Найти пользователя по имени
export async function findUserByName(name: User['name']) {
  return prisma.user.findFirst({ where: { name } });
}

// Найти пользователя по телефону
export async function findUserByPhone(phone: User['phone']) {
  return prisma.user.findFirst({ where: { phone } });
}

// Найти пользователя по адресу
export async function findUserByAddress(address: User['address']) {
  return prisma.user.findFirst({ where: { address } });
}

// Найти пользователей по дате регистрации
export async function findUsersByRegistrationDate(
  registrationDate: User['createdAt'],
) {
  return prisma.user.findMany({ where: { createdAt: registrationDate } });
}

// Найти всех пользователей (учитывая пагинацию)
export async function findAllUsers({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  return prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

// Обновление профиля пользователя
export async function updateUser(id: User['id'], data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

// Удаление пользователя
export async function removeUser(id: User['id']) {
  return prisma.user.delete({ where: { id } });
}
