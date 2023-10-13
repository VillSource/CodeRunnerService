import { environment } from "../../configs/environment";
import { IFileStorageStrategy } from "./interfaces/files-storage-strategy.interface";
import fs from "fs";
import { createHash } from "crypto";
import path from "path";

export class DefultFilesStorageStrategy implements IFileStorageStrategy {

  private PATH = environment.CODE_REPO;

  public saveSourceCode(sourcecode: string, extention?: string) {
    return this.saveFileToLocal(sourcecode, extention?? ".code");
  }

  private getExtention(extention: string) {
    return extention.startsWith(".")
      ? extention
      : `.${extention}`
  }

  private getHashName(sourcecode: string) {
    return createHash("sha256")
      .update(sourcecode)
      .digest("base64url");
  }

  private getFileName(sourcecode: string, extention: string) {
    return `${this.getHashName(sourcecode)}${this.getExtention(extention)}`
  }

  private saveFileToLocal(sourcecode: string, extention: string){

    if ( !fs.existsSync(this.PATH) )
    fs.mkdirSync(this.PATH);

    const fileName = this.getFileName(sourcecode, extention);
    fs.writeFileSync(path.join(this.PATH, fileName), sourcecode );
    console.log('save file to local : ', path.join(this.PATH, fileName));

    return fileName;
  }

}
