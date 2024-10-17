const express = require('express');
const Article = require('../models/Article');
const isAuthenticated = require('../middlewares/authMiddleware');
const router = express.Router();

// Защищенный маршрут для создания статьи
router.post('/create', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const article = new Article({ title, content, author: req.session.userId });
    await article.save();
    res.status(201).send('Article created');
});

// Другие маршруты...

module.exports = router; // Убедитесь, что вы экспортируете router
