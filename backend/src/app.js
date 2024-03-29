require('dotenv').config();

const path = require('path');
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user/user.mongo')
const { setUser } = require('./user/user.model')
const data = require('../../data/data');
const redirectURI = process.env.NODE_ENV === 'production'? '' : process.env.react_app_url;
const callbackURI = process.env.NODE_ENV === 'production'? process.env.CALLBACK_URL : '';
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
    maxAge:  60 * 60 * 1000,
    keys: [process.env.cookie_key]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: `${callbackURI}/auth/google/callback`
} , function (acessToken , refreshToken , profile , done) {
    done(null , profile)
}))
passport.use(new GithubStrategy({
    clientID: process.env.github_client_id,
    clientSecret: process.env.github_client_secret,
    callbackURL: `${callbackURI}/auth/github/callback`
} , function(accessToken , refreshToken , profile , done) {
    done(null , profile)
}))
passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email , password , done) => {
        try{
            const userDB = await User.findOne({ email })
            if(userDB) {
                const isEqual = await bcrypt.compare(password , userDB.password)
                if(isEqual){
                    done(null , userDB)
                }
                else{
                    done(null , null)
                }
            }
            else{
                const hashedPass = await bcrypt.hash(password , 7)
                const newUser = await setUser({email:email , password: hashedPass})
                done(null , newUser)
            }
        }
        catch(err) {
            done(err, null);
        }
        
    }
))
// setting the user into the cookie
passport.serializeUser((user , done) => {
    const photoWithValue = user.photo || user.photos.find(photo => photo.value).value;
    const userObj = {
        id: user.id,
        photo: photoWithValue
    }
    done(null , userObj)
})
// taking the user from the cookie
passport.deserializeUser((user , done) => {
    done(null , user)
})

// setting up google authentication
app.get('/auth/google' , passport.authenticate('google' , {scope: ['profile']}))
app.get('/auth/google/callback' , passport.authenticate('google' , {
    failureRedirect: `${redirectURI}/login`,
    successRedirect: `${redirectURI}/`,
    session: true
}) , 
(req , res) => {
    console.log('Google called us back !')
})

// setting up Github authentication

app.get('/auth/github' , passport.authenticate('github' , {scope: ['user:email']}));
app.get('/auth/github/callback' , passport.authenticate('github' , {
    failureRedirect: `${redirectURI}/login`,
    successRedirect: `${redirectURI}/`,
    session: true
}) , 
(req , res) => {
    console.log('Github called us back ') 
});

// using passport local strategy

app.post('/api/login' , passport.authenticate('local' , {
    failureRedirect: `${redirectURI}/login`,
    successRedirect: `${redirectURI}/`,
}) , (req , res) => {
    res.sendStatus(200);
})

// internal apis
app.get('/api/' , (req , res) => {
    res.status(200).json(data); 
})
app.get('/api/blog/:id' , checkLoggedIn ,  (req , res) => {
    const id = req.params.id;
    res.status(201).json(data[id-1]);
})
app.get('/api/user' , (req , res) => {
    if(req.user) {
        return res.status(201).json(req.user);
    }
    return res.status(403).json({error: 'User not authenticated'})
})

// Logging out middleware
app.get('/auth/logout' , (req  , res) => {
    req.logout();
    return res.redirect('/')
})
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , '..' , 'public')));
    app.use('/*' , (req , res) => {
        return res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'));
    })
}

module.exports = app;