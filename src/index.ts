import { buildApp } from "./app.js";

const port = Number(process.env.BACKEND_PORT) || 5000;
const app = buildApp();

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

// app.get('/', (req, res) => {
//     res.send('Appointment server');
// });

