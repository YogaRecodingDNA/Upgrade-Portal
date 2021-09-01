const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

    app.set('view engine', 'hbs');
    app.engine(
        'hbs',
        expressHandlebars({
            extname: 'hbs',
            defaultLayout: '',
            layoutsDir: __dirname + '/views',
        })
    );
        
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    
    app.use(express.static('static'));
};