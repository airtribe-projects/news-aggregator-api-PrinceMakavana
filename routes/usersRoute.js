const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/usersController.js')

// signup API (/signup)
router.post('/signup', async (req , res) => {
    const user = req.body;
    try {
        const dbUser = await usersController.registerUser(user);
        res.status(200).json(dbUser);  // Changed to 200 to match test case
    } catch (error) {
        if (error.message.includes('required')) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
})

// login API (/login)
router.post('/login', async (req, res) => {

    // Add validation for required fields
    if ( !req.body.email || !req.body.password ) {
        return res.status(400).json({message: "Email and Password are required"});
    }
    const {email, password} = req.body;

    try {
        const dbUser = await usersController.loginUser(email, password);
        
        const payload = {
            id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email
        }
    

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).send({token});
    
    
    } catch (err) {
        res.status(401).json({ message: err.message }); 
    }
});

// preferences API (/preferences)
router.get('/preferences', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return  res.status(401).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const dbUser = await usersController.getUserById(decoded.id);
        res.status(200).json({preferences: dbUser.preferences});
    } catch (err) {
        res.status(401).json({message: 'Invalid token'});
    }
});

// preferences API  (/preferences) Req : PUT
// update preferences
router.put('/preferences', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return  res.status(401).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const dbUser = await usersController.getUserById(decoded.id);
        const newPreferences = req.body.preferences;
        
        if (newPreferences === undefined || !Array.isArray(newPreferences)) {
            return res.status(400).json({message: 'Preferences are required'});
        }

        dbUser.preferences = newPreferences;
        await dbUser.save();
        
        res.status(200).json({preferences: dbUser.preferences});
    } catch (err) {
        console.log(err);
        res.status(401).json({message: 'Invalid token'});
    }
});

module.exports = router;
