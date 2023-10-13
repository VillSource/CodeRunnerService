export interface IFileStorageStrategy {
  /**
   * @param sourcecode source code to save to file
   * @param extention an extension of file souch as `.c`, `.ts`, etc.
   * @returns name of saved file `hashstring.extension` souch as `0213860dd489a43dec6b88f7cfa76dd9947157ad903e4931c26d8526935e40cb.ts`
   */
  saveSourceCode(sourcecode:string, extention?:string): string;
}
