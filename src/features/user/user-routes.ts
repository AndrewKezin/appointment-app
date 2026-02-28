import { Router } from 'express';

import { createUserHandler, findAllUsersHandler } from './user-controller.js';

const router = Router();

router.get('/', findAllUsersHandler);

router.post('/', createUserHandler);

export { router as userRoutes };