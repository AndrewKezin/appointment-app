import express from 'express';
import { apiV1Router } from './routes.js';

// app - это само приложение Express, которое содержит middleware и роуты и обрабатывает запросы HTTP. Это логика, выполняемая на сервере. Сам же сервер находится в файле index.ts и регистрирует сетевые соединения.
export function buildApp() {
  const app = express();

  // Посредник для парсинга json
  app.use(express.json());

  // Роуты под /api/v1
  app.use('/api/v1', apiV1Router);

  return app;
}
