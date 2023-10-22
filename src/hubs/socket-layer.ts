import { SocketInterface } from "../common/socket.interface";
import { InterServerEvents } from "../common/runner-socket-server-interface/inter-server.events";
import { ServerToClientEvents } from "../common/runner-socket-server-interface/server-to-client.events";
import { ClientToServerEvents } from "../common/runner-socket-server-interface/client-to-server.events";
import { SocketData } from "../common/runner-socket-server-interface/socket-code-data";
import { SourceCodeValidator } from "../layers/source-code-validator";
import { SourceCodeMinimizor } from "../layers/source-code-minimizor";
import { Socket } from "socket.io";

type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

type Next = (err?: Error | undefined) => void;

export class SocketLayer implements SocketInterface {

  handleConnection(socket: SocketType): void {
    socket.use(new SourceCodeValidator().getMiddelware(socket));
    socket.use(new SourceCodeMinimizor().getMiddelware(socket));

    socket.on('run', (data) => {
      console.log("RUNNNNNNNNNNNNNNN");
      socket.emit('exit', 0);
    })

    socket.on('stdin', (inp) => {
      console.log("[INFO] : STDIN => ", socket.data.code);
    })

    socket.on('error', e=>{
      console.log(`[ERROR]:`, e.message,)
      socket.emit('error', e.message);
    });
  }

}
