# socketio-node
Creating a Real time chat app with Angular and Socket.io with NodeJS

## Creating a NodeJs Express app

Create a empty folder with name `socketio-node`. 

Create a `package.json`manifest file that describes our project. 

Paste the below code into it. (You can also do it with `npm init`)

```sh
    {  
        "name": "socketio-node",
        "version": "0.0.1",
        "description": "my first socket.io app",
        "dependencies": {}
    }
```

Install `express`

```sh
npm install express
```

Create an `index.js` file that will setup our application.

```sh
    const app = require('express')();
    const http = require('http').createServer(app);

    app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
    });

    http.listen(3000, () => {
    console.log('listeninghttp on *:3000');
    });
```

This code is explained in the following steps:

- Express initializes `app` to be a function handler that you can supply to an HTTP server (as seen in line 2).
- We define a route handler `/` that gets called when we hit our website home.
- We make the http server listen on port 3000.

Run `node index.js` and open [http://localhost:3000](http://localhost:3000)

