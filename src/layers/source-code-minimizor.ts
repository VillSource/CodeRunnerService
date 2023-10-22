import { Socket, Event } from "socket.io";
import { EventMiddelware } from "./event.middelwar";
import { BaseEventMiddleware } from "./base-event.middelware";
import { CodeHelth } from "../common/enums/source-code-helth.state";

export class SourceCodeMinimizor extends BaseEventMiddleware implements EventMiddelware {

  getMiddelware(socket: Socket): (event: Event, next: (err?: Error | undefined) => void) => void {
    return (event: Event, next) => {
      console.log("#########################");
      console.log("Source Code Minimizor Layer");

      console.assert(!!socket.data?.code?.sourceCode, "Source code should not be empty");
      console.assert(!!socket.data?.code?.lang, "Lang should not be empty");

      if (
        !this.isEqual(event[0], "run") ||
        !socket.data?.code?.sourceCode ||
        !socket.data?.code?.lang
      ) return next();

      console.assert(event[0] == 'run', "Event should be run");

      socket.data.code.sourceCode =
      socket.data.code.sourceCode
          ?.replace(/#.*$/gm, '')
          ?.replace(/'''(.*?)'''/gs, '')
          ?.replace(/"""(.*?)"""/gs, '')
          ?.replace(/^\s*[\r\n]/gm, '');

      socket.data.code.helth = CodeHelth.MINIFY;
      socket.data.code.hash = 'hash_value'; // TODO: implement hash

      console.log("[INFO] : ", socket.data.code);
      return next();
    }
  }

}
