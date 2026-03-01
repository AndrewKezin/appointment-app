import type { Request, Response } from 'express';
import { createUser, findAllUsers, findUserById } from './user-model.js';

export async function findAllUsersHandler(request: Request, response: Response) {
  const { page, limit } = request.query;

  const users = await findAllUsers({ page: Number(page) || 1, limit: Number(limit) || 10 });

  console.log("users: ", users);

  return response.json(users);
}

export async function createUserHandler(request: Request, response: Response) {
  const body = request.body;

  await createUser(body);
  
  return response.json(body);
}

export async function findUserByIdHandler(request: Request, response: Response) {
  const id = request.params.id;
  if (!id || typeof id !== 'string') return response.status(404).json({ message: 'User not found' });

  const user = await findUserById(id);
  console.log("user: ", user);

  return response.json(user);
}

export async function findUsersBySearchParamsHandler(request: Request, response: Response) {
  const { email, name, phone, address, created_at, page, limit } = request.query;

  const users = await findAllUsers({ 
    email,
    name,
    phone,
    address,
    created_at,
    page: Number(page) || 1, 
    limit: Number(limit) || 10,
  });

  return response.json(users);
}
