var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Indexing routes
var api = require('./app/routes/apiroutes');

//Declarate express
var app = express();

//Mongose conection
var database = require('./bin/database');
mongoose.connect(database.url);


// Basic calls and public directory
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes where api calls
app.use('/api', api);

module.exports = app;
