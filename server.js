const express = require('express');
const app = express();
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/node1', proxy("http://node1.chain4u.io:8080"));
app.use('/api/node2', proxy("http://node2.chain4u.io:8080"));

app.use(express.static(__dirname + '/build'));

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

process.env.PORT = process.env.PORT || 3000;
let isHttps = process.env.HTTPS === 'true';

if (isHttps)
    https.createServer({
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT),
        passphrase: process.env.PASSPHRASE
    }, app).listen(process.env.PORT, function () {
        console.log(`Servidor de produção iniciando na porta ${process.env.PORT} [HTTPS]`);
    });

else app.listen(process.env.PORT, function () {
    console.log(`Servidor de produção iniciando na porta ${process.env.PORT} [SEM HTTPS]`);
});
