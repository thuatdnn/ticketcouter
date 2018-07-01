const express = require('express');
const server = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event')

mongoose.connect('mongodb://user:passw0rd@ds121321.mlab.com:21321/bapticket', );
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

global.APP_KEY = 'abcdef';

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', authRouter);
server.use('/event', eventRouter);

server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
  });
const http = require('http').createServer(server);
http.listen(3005, function() {
    console.log('server start with port 3005');
});