import express, { Express, NextFunction, Request, Response, json } from 'express'
import { ErrorHandeler } from './error-handelers/error-handeler';
import { createServer } from 'http';
import Websocket from './hubs/socket';
import { CodeRunners } from './hubs/run';
import { SocketLayer } from './hubs/socket-layer';

console.clear();

// Server
const app: Express = express()

// Configuration
const port: number | string = process.env.PORT || 3000;

// Middleware
app.use(json());

// Route
app.get('/', (req: Request, res: Response, next) => {
  next({msg:"Hello"});
})

// Error Handler
app.use(ErrorHandeler);

// create server
const httpServer = createServer(app);

// create websocket
const io = Websocket.getInstance(httpServer);
io.initializeHandlers([
  {path:"/", handler: new CodeRunners()},
  {path:"/tmp", handler: new SocketLayer()}
]);

// start server
httpServer.listen(port, () => console.log(`Application is running on port ${port}`))
