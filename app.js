var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
const ServerlessClient = require('serverless-postgres')

var db = require('./controllers/database');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())



var employee=require('./routes/employees')
var shifts=require('./routes/shifts')

app.use('/emp',employee);
app.use('/shi',shifts)

app.listen(process.env.APP_PORT, function () {
    console.log('Example app listening on port ' + process.env.APP_PORT + '!')
  })

db.connectPg()