import { Router } from 'express';
import { createCarHandler, findCarByIdHandler, findCarsHandler, removeCarHandler, updateCarHandler } from './car-controller.js';

const router = Router();

router.post('/cars', createCarHandler);

router.get('cars/:id', findCarByIdHandler);

router.get('/cars', findCarsHandler);

router.put('/cars/:id', updateCarHandler);

router.delete('/cars/:id', removeCarHandler);

export { router as carRoutes };