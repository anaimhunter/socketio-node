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

## Integrating Socket.io with NodeJS

Install `socket.io` dependency into our app.

```sh
npm install socket.io
```
Edit the  `index.js` file.

```sh
    const app = require('express')();
    const http = require('http').createServer(app);
    const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
    });

    app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
    });

    io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    });

    http.listen(3000, () => {
    console.log('listening on *:3000');
    });
```

Notice that I initialize a new instance of `socket.io` on line 3 by passing the `http` (the HTTP server) object and the cors options(updated for socket.io v3) to allow our angular localhost url, you can put in the url or your frontend client, in my case it was `localhost:4200`
Then I listen on the `connection` and `disconnection` events for incoming sockets, and I log it to the console.

Our Backend is good to go for now, we will come back to our `node` code when we will implement more events further on.

## Creating an Angular app

If you already have an App skip the following code:

```sh
    npm install -g @angular/cli
    ng new socketio-angular
```

Add socket.io `dependency`

```sh
    cd socketio-angular
    npm install socket.io-client
```

## Creating a socket client service

Now let’s start by creating a `service` to handle socket.io connection. I would create a root level `singleton` service named `socketio.service.ts` and include that in `AppModule` . You can create the service according to your project structure.
You can create the service by running the following command.

```sh
    ng g s socketio
```

Go into the `socketio.service.ts` file and import the following:

```sh
    import { io } from 'socket.io-client';
```

Add the socket endpoint that we would connect the socket to inside `environment.ts` file.

```sh
    export const environment = {  
	production: false,  
	SOCKET_ENDPOINT: 'http://localhost:3000'
};
```

To connect to our socket and create a socket conection, add `SocketioService` into our `AppModule` and inject the service into our `app.component.ts` . Let’s add the service into our providers first. In `app.module.ts` do this:

```sh
    @NgModule({
    declarations: [AppComponent],

    imports: [BrowserModule],

    providers: [SocketioService],

    bootstrap: [AppComponent]
})

export class AppModule { }
```

Write a socket init function on `socketio.service.ts`

```sh
    export class SocketioService {

        socket;

        constructor() {   }

        setupSocketConnection() {
            this.socket = io(environment.SOCKET_ENDPOINT);
    }
}
```

 Call this method from `app.component.ts` inside ngOnInit.

```sh
    export class AppComponent implements OnInit {
    
        title = 'socketio-angular';
        
        constructor(private socketService: SocketioService) {}
        
        ngOnInit() {
            this.socketService.setupSocketConnection();
        }
    }
```

