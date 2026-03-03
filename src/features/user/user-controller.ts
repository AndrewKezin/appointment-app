import type { Request, Response } from 'express';
import {
  createUser,
  findAllUsers,
  findUserById,
  removeUser,
  updateUser,
} from './user-model.js';

export async function createUserHandler(request: Request, response: Response) {
  const body = request.body;

  const user = await createUser(body);

  return response.json(user);
}

export async function findUserByIdHandler(
  request: Request,
  response: Response,
) {
  const id = request.params.id;
  if (!id || typeof id !== 'string')
    return response.status(404).json({ message: 'User not found' });

  const user = await findUserById(id);
  console.log('user: ', user);

  return response.json(user);
}

export async function findAllUsersHandler(
  request: Request,
  response: Response,
) {
  const filter = request.query;

  const users = await findAllUsers(filter);

  return response.json(users);
}

export async function updateUserHandler(request: Request, response: Response) {
  const id = request.params.id;
  if (!id || typeof id !== 'string')
    return response.status(404).json({ message: 'User not found' });

  const body = request.body;

  const updatedUser = await updateUser(id, body);

  return response.json(updatedUser);
}

export async function removeUserHandler(request: Request, response: Response) {
  const id = request.params.id;
  if (!id || typeof id !== 'string')
    return response.status(404).json({ message: 'User not found' });

  await removeUser(id);

  return response.json({ message: 'User deleted' });
}
