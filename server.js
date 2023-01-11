const express = require('express');
const app = express();
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');

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
