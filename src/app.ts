import express from "express";

// app - это само приложение Express, которое содержит middleware и роуты и обрабатывает запросы HTTP. Это логика, выполняемая на сервере. Сам же сервер находится в файле index.ts и регистрирует сетевые соединения.
export function buildApp() {
    const app = express();

    // Посредник для парсинга json
    app.use(express.json());

    return app;
}