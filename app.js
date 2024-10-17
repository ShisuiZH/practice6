const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth'); // Путь к маршрутам аутентификации
const articleRoutes = require('./routes/articles'); // Путь к маршрутам статей

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/myblog' }),
}));

// Подключение маршрутов
app.use('/auth', authRoutes); // authRoutes должен быть Router
app.use('/articles', articleRoutes); // articleRoutes должен быть Router

// Статические файлы
app.use(express.static('public'));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
