import { Router } from 'express';

import { healthCheckRoutes } from './features/health-check/health-check-routes.js';
import { userRoutes } from './features/user/user-routes.js';

export const apiV1Router = Router();

// /api/v1
// Роуты health-check
apiV1Router.use('/health-check', healthCheckRoutes);

apiV1Router.use('/users', userRoutes);


// В дальнейшем при миграции API в файле routes.ts можно определить другую версию API (например, apiV2Router)
