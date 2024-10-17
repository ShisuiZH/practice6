const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Маршрут для регистрации
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).send('User registered');
});

// Маршрут для входа
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).send('Invalid credentials');
    }
    req.session.userId = user._id; // Сохранение сессии
    res.send('Logged in');
});

module.exports = router; // Убедитесь, что вы экспортируете router
