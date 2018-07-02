const express = require('express');
const server = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');
const eventsRouter = require('./routes/events');
const ticketRouter = require('./routes/ticket');
const resetDBRouter = require('./routes/resetDB');
const seed = require('./seeder')

mongoose.connect('mongodb://user:passw0rd@ds121321.mlab.com:21321/bapticket', );
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

global.APP_KEY = "abcdef"

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', authRouter);
server.use('/', ticketRouter);
server.use('/reset', resetDBRouter);
server.use('/events', eventsRouter);
server.use('/event', eventRouter);

seed.seeder();
const http = require('http').createServer(server);
http.listen(3005, function() {
    console.log('server start with port 3005');
});