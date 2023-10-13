import { DefultFilesStorageStrategy } from "./defult-files-storage.strategy";
import { IFileStorageStrategy } from "./interfaces/files-storage-strategy.interface";

export class FilesStorageStrategyFactory {

  private constructor(){}

  public static createStrategy(): IFileStorageStrategy {
    return new DefultFilesStorageStrategy();
  }

}
