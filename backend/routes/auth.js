const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Atharvisgood"


//Create User: "/api/auth"
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }



        const salt = await bcrypt.genSalt(10)
        const sechPass = await bcrypt.hash(req.body.password, salt)
        //Create a new User
        user = await User.create({
            name: req.body.name,
            password: sechPass,
            email: req.body.email,

        })
        const data = {
            user: {
                id: user.id,
            }
        }


        const authToken = jwt.sign(data, JWT_SECRET)


        res.json({ authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Failed to create user', message: error.message })
    }


});

module.exports = router;
