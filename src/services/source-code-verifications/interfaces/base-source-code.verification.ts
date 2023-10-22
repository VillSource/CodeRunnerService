import { ISourceCodeVerification } from "./source-code.verivication";
import treesitter from "tree-sitter"
const x = require('tree-sitter-python');

export class SyntaxError extends Error {
  constructor(msg?:string){
    super(msg ?? "Syntax error");
  }
}

export abstract class BaseSourceCodeVerification implements ISourceCodeVerification {
  parser = new treesitter();


  verify(code: string) {
    return this.isValid(code);
  }

  protected abstract isValid(code: string): boolean

  protected hasErrorNode(node: treesitter.SyntaxNode) {
    if (node.hasError()) return true;
    for (const child of node.children) {
      if (this.hasErrorNode(child)) return true;
    }
    return false;
  }

}
