import { Event, Socket } from "socket.io";
import { ClientToServerEvents } from "../common/runner-socket-server-interface/client-to-server.events";
import { CodeHelth } from "../common/enums/source-code-helth.state";
import { Python3Verification } from "../services/source-code-verifications/python3.verification";
import { EventMiddelware } from "./event.middelwar";
import { BaseEventMiddleware } from "./base-event.middelware";

type Next = (err?: Error | undefined) => void;

export class SourceCodeValidator extends BaseEventMiddleware implements EventMiddelware{

  public static get instant() {
    return new SourceCodeValidator();
  }

  public getMiddelware(socket: Socket) {
    return (event: Event, next: Next) => {
      this.printHead();

      if (!this.isEqual(event[0], "run"))
        return next();

      const [data] = event.slice(1) as Parameters<ClientToServerEvents["run"]>;

      const pv = new Python3Verification();
      const isValid = pv.verify(data.sourcecode);
      console.log(`[INFO]: `, { isValid });

      if (!isValid) return next(new Error("invalid python code")); // TODO:  throws lexical error

      else {
        console.log("[INFO]: ", socket.data.code);
        socket.data.code = {
          sourceCode: data.sourcecode,
          lang: data.language,
          helth: CodeHelth.VALID,
        };
        return next();
      }
    }
  }

  private printHead() {
    console.log("#########################");
    console.log("Source Code Validator Layer");
  }


}
