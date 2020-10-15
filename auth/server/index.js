//Main starting point of the application
require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://luisa:'+process.env.MYAPIKEY+'@cluster0.jcmbz.mongodb.net/auth?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);