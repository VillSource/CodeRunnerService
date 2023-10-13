import { SUPPORTED_LANGUAGES } from "../common/supported-languege";
import { ICodeRunner } from "../services/cod-runner/interfaces/cod-runner.interface";
import { Python3Runner } from "../services/cod-runner/python-3-runner";

export const CodeRunnerProvider = new Map<SUPPORTED_LANGUAGES, ICodeRunner>();

CodeRunnerProvider.set("python3", new Python3Runner())
