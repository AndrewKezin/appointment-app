import type { NextFunction, Request, Response } from 'express';
import { createUser, findAllUsers } from './user-model.js';

// Благодаря утилите asyncHandler можно избавиться от блока try/catch, который отлавливает ошибки и отправляет их в next(). asyncHandler используем в роутере healthcheck
export async function findAllUsersHandler(request: Request, response: Response) {
  const users = await findAllUsers({ page: 1, limit: 10 });

  console.log(users);

  return response.json(users);
}

export async function createUserHandler(request: Request, response: Response, next: NextFunction) {
  const body = request.body;

  await createUser(body);
  // try {
  //   await createUser(body);
  // } catch(err) {
  //   next(err);
  // };

  return response.json(body);
}
