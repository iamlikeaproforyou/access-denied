const path = require('path');

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

app.use(express.json());

app.use(express.static(path.join(__dirname , '..' , 'public')));

app.use('/*' , (req , res) => {
    res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'));
})

module.exports = app;