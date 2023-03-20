const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'))


//Här connectar vi controllers

app.use('/api/todos', require('./controllers/todoController'))


module.exports = app;
