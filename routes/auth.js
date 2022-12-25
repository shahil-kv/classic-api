
// always  remember logged in using mshahilk28@gmail.com in mongodb
const router = require('express').Router();
const User = require('../models/User')
const crypto = require('crypto')
const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
const key = 'password';
const jwt=require('jsonwebtoken')
// register user

// const CryptoJs=require('crypto-js')

// REGISTER
router.post('/register', async (req, res) => {

    const user = req.body
    // encrypt password
    const cipher = crypto.createCipher(algorithm, key);
    // the syntax for encryption is accepting the password from the user and then adding the code for encryption and then the hex code  and including the hex
    const encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    const newUser = new User({
        username: user.username,
        email: user.email,
        password: encrypted,
    });

    try {
        const savedUser = await newUser.save()
        const { id, username, password } = savedUser
        res.status(201).json(id)
     console.log('user has been created')
    } catch (e) {
        res.status(500).json(e)
    }

});

// // LOGIN

router.post('/login', async (req, res) => {
    try {
        const savedUser = await User.findOne({ username: req.body.username });
        !savedUser && res.status(401).send('User not found in database')
        const decipher = crypto.createDecipher(algorithm, key);
        const decrypted = decipher.update(savedUser.password, 'hex', 'utf8') + decipher.final('utf8');
   
        const {password,...others}=savedUser._doc
        if(decrypted !== req.body.password)return res.status(401).json('Wrong credentials')
            const accessToken=jwt.sign({
           id:savedUser.id,
           isAdmin:savedUser.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn:'3d'}
            );
        res.status(200).json({...others,accessToken})
    }catch(err) {
       res.status(500).json(err)
    }
})

module.exports = router;
