import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CodeDto } from "../../common/dto/code-dto";
import { BaseRunner } from "./base-runner";
import { ICodeRunner } from "./interfaces/cod-runner.interface";
import { environment } from "../../configs/environment";

export class Java17Runner extends BaseRunner implements ICodeRunner {

  private _slave_host = `${environment.SLAVE_USER_NAME}@${environment.SLAVE_HOST_JAVA}`

  protected createChildProcess(code: CodeDto): ChildProcessWithoutNullStreams {
    const name = this.fileStorage.saveSourceCode(code.sourcecode, "java")
    return spawn("ssh", `${this._slave_host} /opt/jdk-17.0.6+10/bin/java /config/sourcecode/${name}`.split(' '));
  }

}
