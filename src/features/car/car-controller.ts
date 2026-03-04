import type { Request, Response } from 'express';
import {
  createCar,
  findCarById,
  findCars,
  removeCar,
  updateCar,
} from './car-model.js';

export async function createCarHandler(request: Request, response: Response) {
  const body = request.body;

  const createdCar = await createCar(body);

  return response.json(createdCar);
}

export async function findCarByIdHandler(request: Request, response: Response) {
  const id = request.params.id;

  if (!id || typeof id !== 'string')
    return response.status(404).json({ message: 'Car not found' });

  const car = await findCarById(id);

  return response.json(car);
}

export async function findCarsHandler(request: Request, response: Response) {
  const filter = request.query;

  const cars = await findCars(filter);

  return response.json(cars);
}

export async function updateCarHandler(request: Request, response: Response) {
  const id = request.params.id;

  if (!id || typeof id !== 'string')
    return response.status(404).json({ message: 'Car not found' });

  const body = request.body;

  const updatedCar = await updateCar(id, body);

  return response.json(updatedCar);
}

export async function removeCarHandler(request: Request, response: Response) {
  const id = request.params.id;

  if (!id || typeof id !== 'string')
    return response.status(404).json({ message: 'Car not found' });

  await removeCar(id);

  return response.json({ message: 'Car deleted' });
}
