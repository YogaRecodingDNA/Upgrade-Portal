const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');
const config = require('./config/config')[env];
require('dotenv').config();
const app = require('express')();
require('./config/framework')(app);
require('./config/routes')(app);

mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('DB connected...');
});

app.listen(config.port, console.log(`Server is listening on port: ${config.port}...`));