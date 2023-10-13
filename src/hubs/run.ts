import { Socket } from "socket.io";
import { SocketInterface } from "../common/socket.interface";
import { CodeRunnerFactory } from "../services/cod-runner/code-runner.factory";
import { CodeDto } from "../common/dto/code-dto";
import { Subject, filter, tap } from "rxjs";
import { IO } from "../services/cod-runner/interfaces/cod-runner.interface";

interface InterServerEvents { }

interface ServerToClientEvents {
  "stdout": (output: string) => void;
  "stderr": (output: string) => void;
  "exit": (code: number | null) => void;
  "error": (msg: string) => void;
}

interface ClientToServerEvents {
  "run": (code: CodeDto) => void;
  "stdin": (input: string) => void;
}

interface SocketData {
  isRunning: boolean;
  resultPipe?: Subject<IO>;
}

type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export class CodeRunners implements SocketInterface {

  handleConnection(socket: SocketType): void {

    socket.on("run", this.onRun(socket));
    socket.on("stdin", this.onInput(socket));
  }


  middlewareImplementation?(socket: SocketType, next: any): void {
    socket.data.isRunning = false;
    return next();
  }

  private onInput(socket: SocketType) {
    return (input: string) => this.catchError(socket, () => {

      if (!socket.data.isRunning)
        return socket.emit("error", "You are not running any code");

      console.debug("got input", input);
      socket.data.resultPipe?.next({ type: "stdin", data: input });
    });
  }

  private onRun(socket: SocketType) {
    return (code: CodeDto) => this.catchError(socket, () => {
      console.debug("Run code ", code);

      socket.data.isRunning = true;
      this.createResultPipe(socket);

      const runner = CodeRunnerFactory.createCodeRunner(code.language)
      runner.execute(code, socket.data.resultPipe);
    })

  }

  private createResultPipe(socket: SocketType) {
    socket.data.resultPipe = new Subject<IO>();

    const sendOutputToClient = (data: IO) => {
      if (data.type == "stderr" || data.type == "stdout")
        socket.emit(data.type, data.data);
      else if (data.type == "exit")
        socket.emit("exit", data.data);
    }

    const onCompleate = () => {
      socket.data.isRunning = false;
      socket.data.resultPipe = undefined;
    }

    socket.data.resultPipe?.subscribe({
      next: sendOutputToClient,
      complete: onCompleate
    });
  }

  private catchError(socket: SocketType, c: () => void) {
    try {
      c();
    }
    catch (error) {
      if (error instanceof Error)
        socket.emit("error", error.message);
      else
        socket.emit("error", JSON.stringify(error));
    }
  }

}
