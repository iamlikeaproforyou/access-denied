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
    maxAge:  60 * 1000,
    keys: [process.env.cookie_key]
}))
// app.use(cors({
//     origin: 'http://localhost:3000'
// }))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: '/auth/google/callback'
} , function (acessToken , refreshToken , profile , done) {
    done(null , profile)
}))

passport.serializeUser((user , done) => {
    done(null , user)
})

passport.deserializeUser((user , done) => {
    const photoWithValue = user.photos.find(photo => photo.value)
    const userObj = {
        id: user.id,
        photo: photoWithValue.value
    }
    done(null , userObj)
})
app.use(express.json());
// app.use(express.static(path.join(__dirname , '..' , 'public')));
app.get('/api/' , (req , res) => {
    res.status(200).json(data); 
})
app.get('/api/blog/:id' , checkLoggedIn ,  (req , res) => {
    const id = req.params.id;
    res.status(201).json(data[id-1]);
})
app.get('/auth/google' , passport.authenticate('google' , { scope: ['email']}))
app.get('/auth/google/callback' , passport.authenticate('google' , {
    failureRedirect: 'http://localhost:3000/login',
    successRedirect: 'http://localhost:3000/',
    session: true
}) , (req , res) => {console.log('Google called us back !')})

app.get('/api/user' , (req , res) => {
    if(req.user) {
        return res.status(201).json(req.user);
    }
    return res.status(403).json({error: 'User not authenticated'})
})

app.get('/auth/logout' , (req  , res) => {
    req.logout();
    return res.redirect('http://localhost:3000/')
})
// app.use('/*' , (req , res) => {
//     return res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'));
// })

module.exports = app;