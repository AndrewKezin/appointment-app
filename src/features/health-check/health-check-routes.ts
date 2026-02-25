// Каждая фича должна иметь хотя бы одного контроллера и один роутер. Создаем роутер
import { Router } from 'express';

import { healthCheckHandler } from './health-check-controller.js';
import { asyncHandler } from '~/utils/async-handler.js';

const router = Router();

// Используем утилиту asyncHandler, которая отлавливает ошибку и отправляет её в next()
router.get('/', asyncHandler(healthCheckHandler));

export { router as healthCheckRoutes };
