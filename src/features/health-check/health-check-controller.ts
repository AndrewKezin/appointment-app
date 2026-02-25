// Добавляем контроллер с одним обработчиком для конечной точки проверки здоровья
// Создаем объект, содержащий сообщение, отметку времени и время работы, и отправляем его в формате JSON с дефолтным статусом 200
import type { Request, Response } from 'express';

// Благодаря утилите asyncHandler можно избавиться от блока try/catch, который отлавливает ошибки и отправляет их в next(). asyncHandler используем в роутере healthcheck
export async function healthCheckHandler(request: Request, response: Response) {
  const body = {
    message: 'OK',
    timestamp: Date.now(),
    uptime: process.uptime(),
  };
  response.json(body);
}
