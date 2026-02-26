import { Router } from 'express';

import { createUserHandler, findAllUsersHandler } from './user-controller.js';

const router = Router();

router.get('/users', findAllUsersHandler);

router.post('/users', createUserHandler);
