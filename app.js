const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const mongoose = require('mongoose');
const app = require('express')();
require('dotenv').config();
require('./config/framework')(app);
require('./config/routes')(app);



app.listen(config.port, console.log(`Server is listening on port: ${config.port}...`));