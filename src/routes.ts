import { Router } from 'express';

import { healthCheckRoutes } from './features/health-check/health-check-routes.js';

export const apiV1Router = Router();

// Роуты health-check
apiV1Router.use('/health-check', healthCheckRoutes);



// В дальнейшем при миграции API в файле routes.ts можно определить другую версию API (например, apiV2Router)