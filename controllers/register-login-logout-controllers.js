const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.register = (req, res) => {
    
    let notification = req.cookies.invalid;
    
    res.render('register', {
        notification,
    });

    if (notification){ res.clearCookie('invalid'); }

};



exports.registerPOST = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors);

        const errorMsg = errors.array()[0].msg;

        res.cookie("invalid", errorMsg, { maxAge: 3000 });

        res.redirect('/register');

    } else {

        bcrypt.hash(req.body.password, Number(process.env.salty), (err, hash) => {
    
            req.body.password = hash;
    
            const newUser = new User(req.body);
    
            newUser.save(function (err, newUser) {
                if (err) return console.error(err);
            });
        });
    
        res.redirect('/login');

    }
   
};



exports.login = (req, res) => {

    if (req.cookies.token  || req.cookies.loggedIn){
        res.clearCookie("loggedIn");
        res.clearCookie("token");
    }

    let notification = req.cookies.invalid;
    
    res.render('login', {
        notification,
    });
    
    if (notification){ res.clearCookie('invalid'); }
};



exports.loginPOST = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors);

        const errorMsg = errors.array()[0].msg;

        res.cookie("invalid", errorMsg, { maxAge: 3000 });
        
        res.redirect('/login');
        
    } else {

        User.findOne({username: req.body.username}, function(err, user){
    
            const userId = user._id;
            const username = user.username;
            const hash = user.password;
            
            bcrypt.compare(req.body.password, hash, (err, match) => {
                if (err) console.error(err);
    
                if (match){ // MAYBE if match === true!!!!
    
                    const payload = {userId, username};
                    const options = {expiresIn: '1h'};
    
                    const token = jwt.sign(payload, process.env.secret, options);
    
                    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 3600});
    
                    res.cookie('loggedIn', true, { maxAge: 1000 * 3600 });
    
                    res.redirect('/user');
    
                } else {
    
                    res.cookie('invalid', 'Please enter the correct password for this user.', {maxAge: 3000});
    
                    res.redirect('/login');
                }
            });
        });
    } 
};



exports.logout = (req, res) => {

    res.clearCookie("loggedIn");

    res.clearCookie("token");

    res.clearCookie('invalid');

    res.redirect('/');

};