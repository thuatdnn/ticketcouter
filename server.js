const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user')
const httperror = require('http-errors');

mongoose.connect('mongodb://user:passw0rd@ds217671.mlab.com:17671/ticketcounter', )
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;
server.use(bodyParser.json());
server.use( bodyParser.urlencoded({ extended : true }) );
server.use('/', userRoute);
server.use(httperror);
server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
  });

server.listen(3000, () => {
    console.log('Server started')
});