const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8080
const server = http.createServer(app);

server.listen(PORT, () => {console.log('Server running on 8080')}); // listen on port 8080