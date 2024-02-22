const path = require('path');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const data = require('../../data/data');

const app = express();

function checkLoggedIn(req , res , next){
    const user = req.isAuthenticated() && req.user;

    if(!user) {
        return res.status(401).json({
            error: 'You are unauthorized'
        })
    }
    next();
}
app.use(cookieSession({
    name: 'session',
    maxAge: 10 * 1000,
    keys: [process.env.cookie_key]
}))
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: '/auth/google/callback'
} , function (acessToken , refreshToken , profile , cb) {
    cb(null , profile)
}))

passport.serializeUser((user , done) => {
    done(null , user.id)
})

passport.deserializeUser((id , done) => {
    done(null , id)
})
app.use(express.json());
app.use(express.static(path.join(__dirname , '..' , 'public')));
app.get('/api/' , (req , res) => {
    res.status(200).json(data); 
})
app.get('/api/blog/:id' , checkLoggedIn ,  (req , res) => {
    const id = req.params.id;
    res.status(201).json(data[id-1]);
})
app.get('/auth/google' , passport.authenticate('google' , { scope: ['email']}))
app.get('/auth/google/callback' , passport.authenticate('google' , {
    failureRedirect: '/login',
    successRedirect: '/',
    session: true
}) , (req , res) => {console.log('Google called us back !')})
app.use('/*' , (req , res) => {
    return res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'));
})

module.exports = app;