import { Router } from 'express';

import { createUserHandler, findAllUsersHandler, findUserByIdHandler } from './user-controller.js';

const router = Router();

router.get('/', findAllUsersHandler);

router.get('/:id', findUserByIdHandler);

router.post('/', createUserHandler);

export { router as userRoutes };