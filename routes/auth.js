const router = require('express').Router();
const User = require('../model/Users');
const bcrypt = require('bcryptjs');
const {registerValidator } = require('../validation');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    
    // Lets validate the defore we are a user
    ///const { error }  =  schema.validate(req.body, schema);
    //schema.validate({});
    //res.send(error);
    const {error} = registerValidator.registerValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    //Checking if the user is already in the database
    const emailExist  = await User.findOne({email: req.body.email}); 
    if (emailExist) {
        return res.status(400).send("Email already exists");
    }


    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    //Begin: Create user;
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
   
});

//Begin: router login 

router.post('/login', async (req, res) => {

    //Lets validate the data before we a user
    const {error} = registerValidator.loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
   
    //Checking if the email exist
    const user  = await User.findOne({email: req.body.email}); 
    if (!user) {
        return res.status(400).send("Email or password is wrong!");
    }

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Invalid password')
    }

    //Create and assign a token
    const token =  jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Logged in!');
});
//End router login

module.exports = router;