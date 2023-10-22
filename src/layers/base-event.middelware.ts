import { Socket, Event } from "socket.io";
import { EventMiddelware } from "./event.middelwar";
import { ClientToServerEvents } from "../common/runner-socket-server-interface/client-to-server.events";

export abstract class BaseEventMiddleware implements EventMiddelware {
  abstract getMiddelware(socket: Socket): (event: Event, next: (err?: Error | undefined) => void) => void

  protected isEqual(event: string, event2: keyof ClientToServerEvents) {
    return event == event2;
  }
}
