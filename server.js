const http = require('http');

//1. import app from app.js
const app = require('./app');

//Note:* process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
const port = process.env.PORT || 3000;

//2. pass app into the method createSever 
const server = http.createServer(app);

server.listen(port);