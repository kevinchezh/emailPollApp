//common js module, node does not support ES2015 module like import express from 'express'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
//load user model
require('./models/user');
const keys = require('./config/keys');
//we just want to make sure the passport.js is runed. We dont want it
//to return anything and sign it to some variable, therefore we could
//ignore const passportConfig = require('***');
require('./services/passport');

app.use(
    cookieSession({
        //valid length in ms
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //an array, could allow multiple cookie keys
        keys:[keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routers/authRoutes');
//call the function in authRoutes with the variable app
authRoutes(app);

//connect mongoose
mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
