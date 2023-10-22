import { Event, Socket } from "socket.io";

type Next = (err?: Error | undefined) => void;

export interface EventMiddelware{
  getMiddelware(socket:Socket): (event: Event, next: Next)=>void;
}
