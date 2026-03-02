import { Router } from 'express';

import { createUserHandler, findAllUsersHandler, findUserByIdHandler, removeUserHandler, updateUserHandler } from './user-controller.js';

const router = Router();

router.get('/', findAllUsersHandler);

router.get('/:id', findUserByIdHandler);

router.post('/', createUserHandler);

router.put('/:id', updateUserHandler);

router.delete('/:id', removeUserHandler);

export { router as userRoutes };