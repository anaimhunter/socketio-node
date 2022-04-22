const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  let token = socket.handshake.auth.token;
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
  });
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });
});
  
http.listen(3000, () => {
  console.log(`started on port: ${port}`);
});