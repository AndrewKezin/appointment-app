// https://habr.com/ru/companies/timeweb/articles/948036/ статья по настройке сервера
// В index.ts находится сервер приложения
import morgan from "morgan";

import { buildApp } from "./app.js";

const port = Number(process.env.BACKEND_PORT) || 5000;
const app = buildApp();

// Настраиваем логгирование с помощью `morgan` на основе среды выполнения кода
const environment = process.env.NODE_ENV || 'development';
app.use(environment === 'development' ? morgan('dev') : morgan('tiny'))

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Обрабатываем сигнал SIGTERM для мягкой (gracefully) остановки сервера
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

