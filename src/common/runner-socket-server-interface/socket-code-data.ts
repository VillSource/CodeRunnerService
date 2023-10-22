import { Subject } from "rxjs";
import { IO } from "../../services/cod-runner/interfaces/cod-runner.interface";
import { CodeHelth } from "../enums/source-code-helth.state";

export interface SocketData {
  isRunning: boolean;
  resultPipe?: Subject<IO>;
  code: {
    helth?: CodeHelth;
    lang?: string;
    sourceCode?: string;
    hash?: string;
  };
}
