const jwt = require("jsonwebtoken");
 
 module.exports = function(req, res, next) {

    const loggedIn = req.cookies.loggedIn;
     
    try {

        if(loggedIn){

            const token = req.cookies.token;
            
            const userInfo = jwt.verify(token, process.env.secret);
            
            req.user = userInfo;

            next();

        } else {

            res.redirect('/login');

        }

    } catch (err) {

        console.log("Error!", err);

    }

 };