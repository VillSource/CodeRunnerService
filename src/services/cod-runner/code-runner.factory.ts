import { SUPPORTED_LANGUAGES } from "../../common/supported-languege";
import { CodeRunnerProvider } from "../../configs/code-runner.provider";
import { ICodeRunner } from "./interfaces/cod-runner.interface";

export class CodeRunnerFactory {

  private constructor(){}

  public static createCodeRunner(lang: SUPPORTED_LANGUAGES): ICodeRunner {
    const runner = CodeRunnerProvider.get(lang);
    if (!runner) throw Error(`'${lang}' is unsupported language`);

    return runner!;
  }

}
