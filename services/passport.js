const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
//mongoose.model(): Defines a model or retrieves it.
const user = mongoose.model('users');

//the user here is the user returned from google oauth
//see documemntation passport session
passport.serializeUser((user,done)=>{
    //this id is the id in mongo collection for this user(key), is not the
    //the googleID for this user
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user)
    });
})

//use the strategy
//see passport-google-oauth2 github document
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        },
        (accessToken,refreshToken,profile,done)=>{
            // console.log(accessToken);
            // console.log(profile);
            user.findOne({googleID:profile.id}).then((existingUser)=>{
                if(existingUser){
                    //if we find user, then this user is already there
                    done(null,existingUser)
                }
                else{
                    //this is a new user , create a new user
                    new user({
                        googleID: profile.id
                    }).save().then((user)=>done(null,user));
                    //whenever there is ansynchronus action, we need to
                    //use then to make sure the order
                }
            })           
        }
    )
);

