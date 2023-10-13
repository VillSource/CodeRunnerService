import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { SocketInterface } from '../common/socket.interface';

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"]
}

class Websocket extends Server {

  private static io: Websocket;

  private constructor(httpServer: HttpServer) {
    super(httpServer, {
      cors: WEBSOCKET_CORS
    });
  }

  public static getInstance(httpServer?: HttpServer): Websocket {

    if (!Websocket.io) {
      if (!httpServer) throw new Error("Can't create Websocket instance.");
      Websocket.io = new Websocket(httpServer);
    }

    return Websocket.io;

  }

  public initializeHandlers(socketHandlers: Array<{ path: string, handler: SocketInterface }>) {
    socketHandlers.forEach(element => {
      let namespace = Websocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default Websocket;
