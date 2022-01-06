const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup_get = (req, res) => {
    res.render('signup');
}

const login_get = (req, res) => {
    res.render('login');
}

const signup_post = async (req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body;
    try 
    {
        const user = await User.create({name, email, password});
        
        console.log(user)
        const token = createToken(user._id);

        res.cookie('newUser', token, {httpOnly: true, maxAge: age * 1000 });
        res.status(201).json({ user: user._id });
        
    } 
    catch (error) 
    {
        // console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try 
    {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('logged', token, { httpOnly: true, maxAge: age * 1000 });
        res.status(200).json({ user: user._id });    
    } 
    catch (error) 
    {
        console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const logout_get = (req, res) => {
    // replace the login coolie with an ampty one that have age of 1 milli second
    res.cookie('logged', '', {maxAge: 1});
    res.redirect('/');
}



const handleErrors = (err) => {
    let errors = { email: '', password: ''};

    // incorect email
    if(err.message === 'incorect email')
    {
        errors.email = 'That email is not registered'
    }

    // incorect password
    if(err.message === 'incorect password')
    {
        errors.password = 'That password is incorect'
    }

    // duplicate error code
    if(err.code === 11000) // 11000 means it's the error that the email is not unique
    { 
        errors.email = 'That email is already registeresd';
        return errors; // no need to proceed
    }
    // validation errors
    if(err.message.includes('user validation failed'))
    {                                   // access the properties of error - instead of 'error.properties'
       Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
       });
    }

    return errors;
}




const age = 3 * 24 * 60 * 60; //*1000 = 3 days
const createToken = (id) => {
    return jwt.sign({ id }, 'codeBook123Secret', { expiresIn: age })
}


module.exports = {
    signup_get, 
    login_get, 
    signup_post, 
    login_post, 
    logout_get
}