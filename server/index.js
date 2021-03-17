const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


require('./startup/db'); //Database
require('./services/connection')(server); //WS Connection


const stream = require('youtube-audio-stream')
const url = 'https://www.youtube.com/watch?v=XAEyEdW4br8'

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Connected Port: ${PORT}`);
});

