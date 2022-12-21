
// always  remember logged in using mshahilk28@gmail.com in mongodb
const router = require('express').Router();
const User = require('../models/User')

const crypto = require('crypto')

const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
const key = 'password';




// register user


// const CryptoJs=require('crypto-js')

// REGISTER
router.post('/register', async (req, res) => {

    const user = req.body
    // encrypt password
    const cipher = crypto.createCipher(algorithm, key);
    const encrypted = cipher.update(user.password, 'utf8', 'hex') + cipher.final('hex');

    const newUser = new User({
        username: user.username,
        email: user.email,
        password: encrypted,
    });

    try {
        const savedUser = await newUser.save()
        const { id, username, password } = savedUser
        res.status(201).json(id)
        console.log('user has been created', savedUser)
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }

});

// // LOGIN

router.post('/login', async (req, res) => {
    console.log('entering in the login section')
    const user = req.body


    try {
        const savedUser = await User.findOne({ username: user.username });
        const decipher = crypto.createDecipher(algorithm, key);
        const decrypted = decipher.update(savedUser.password, 'hex', 'utf8') + decipher.final('utf8');


        if(decrypted === user.password)return res.status(200).json(savedUser)
        return res.status(404).send('User not found');
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;

