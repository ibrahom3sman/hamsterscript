const PORT = 3000;
const fs = require('fs')
const app = require('./app');
const path = require('path');
const https = require('https');






https.createServer({
    key: fs.readFileSync(path.join(__dirname,'..' ,'/key.pem')),
    cert: fs.readFileSync(path.join(__dirname ,'..' ,'/cert.pem')),
}, app).listen(PORT , () => console.log(`Listenig on port: ${PORT}`));

