const https = require('https');
const fs = require('fs');
const path = require('path');

const app = require('./app');
const options = { 
    key: fs.readFileSync(path.join(__dirname , '..' , 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname , '..' , 'cert.pem'))
}
const PORT = 8000;

const server = https.createServer(options , app);

server.listen(PORT , () => {
    console.log(`Server started on ${PORT}`);
})