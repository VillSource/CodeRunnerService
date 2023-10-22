import { BaseSourceCodeVerification } from "./interfaces/base-source-code.verification";
import { ISourceCodeVerification } from "./interfaces/source-code.verivication";
const x = require('tree-sitter-python');

export class Python3Verification
  extends BaseSourceCodeVerification
  implements ISourceCodeVerification
{

  constructor(){
    super();
    this.parser.setLanguage(x)
  }

  isValid(code:string): boolean {
    const isValid = !this.hasErrorNode(this.parser.parse(code).rootNode);
    return isValid;
  }
}
