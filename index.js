//common js module, node does not support ES2015 module like import express from 'express'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
//load user model
require('./models/user');
const keys = require('./config/keys');
//we just want to make sure the passport.js is runed. We dont want it
//to return anything and sign it to some variable, therefore we could
//ignore const passportConfig = require('***');
require('./services/passport');
//hook up the middleware, pass the body and asign it to req.body
app.use(bodyParser.json());
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
const billingRoutes = require('./routers/billingRoutes');
billingRoutes(app);
//connect mongoose
mongoose.connect(keys.mongoURI);

if(process.env.NODE_ENV==='production'){
    //express will serve up production assets like our main.js or main.css
    //
    app.use(express.static('client/build'));

    //express will serve up the index.html file if is does not
    //recognize route
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
const PORT = process.env.PORT || 8080;
app.listen(PORT);
