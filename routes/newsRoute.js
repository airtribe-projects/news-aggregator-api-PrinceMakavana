const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/usersController.js')
const newsController = require('../controllers/newsController.js');

// news API (/news)
router.get('/', async (req, res) => {
    // Placeholder for news fetching logic
    // Auth Handle
    // Fetch news based on user preferences
    // Use external news API
    // Return news articles in response

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return  res.status(401).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const dbUser = await usersController.getUserById(decoded.id);
        const newsArticles = await newsController.getNewsByPreferences(dbUser.preferences);
        res.status(200).json({news: newsArticles});
    } catch (error) {
          console.log(error);
            res.status(500).json({message: 'Error fetching news'});
    }
});

module.exports = router;
