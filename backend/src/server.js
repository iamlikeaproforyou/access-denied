const app = require('./app');
const PORT = 8000;

const mongoose = require('mongoose')
const MONGO_URI = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@access-denied-cluster.bja3xfv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=access-denied-cluster`

mongoose.connection.once('open' , () => {
    console.log(`Mongo Db Connected successfully !`)
})

async function startServer () {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT , () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer();