import type { Request, Response } from 'express';
import { createUser, findAllUsers } from './user-model.js';
import { asyncHandler } from '~/utils/async-handler.js';

// Благодаря утилите asyncHandler можно избавиться от блока try/catch, который отлавливает ошибки и отправляет их в next(). asyncHandler используем в роутере healthcheck
export async function findAllUsersHandler(
  request: Request,
  response: Response,
) {
  asyncHandler(await findAllUsers({ page: 1, limit: 10 }));
  return response.json();
}

export async function createUserHandler(request: Request, response: Response) {
  const user = await request.body;
  asyncHandler(await createUser(user));
  return response.json(user);
}
