const path = require('path');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')

const data = require('../../data/data');

const app = express();

function checkLoggedIn(req , res , next){
    const user = true;

    if(!user) {
        return res.status(401).json({
            error: 'You are unauthorized'
        })
    }
    next();
}

// app.use(morgan('combined'));
// app.use(helmet())
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ['self'],
//         imgSrc: ['self' , 'https:']
//     }
// }))
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json());
// app.use(express.static(path.join(__dirname , '..' , 'public')));

app.get('/' , (req , res) => {
    return res.status(200).json(data);
})
app.get('/blog/:id' , checkLoggedIn ,  (req , res) => {
    const id = req.params.id;
    return res.status(201).json(data[id-1]);
})
// app.use('/*' , (req , res) => {
//     console.log('endpoint hit')
//     res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'));
// })


module.exports = app;