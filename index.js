const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});
const port = process.env.PORT || 3000;

user=''
app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  let token = socket.handshake.auth.token;
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('user', (user) => {
    console.log('user: ' + user);
    socket.on('message', (message) => {
      console.log(message);
      if(user!='')
      {
        io.emit('message', `${user} ----> ${message}`);
      }
      else{
        io.emit('message', `${socket.id.substr(0, 2)} ----> ${message}`);
      } 
    });
  });
  
});
  
http.listen(3000, () => {
  console.log(`started on port: ${port}`);
});