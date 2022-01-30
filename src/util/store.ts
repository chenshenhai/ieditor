import { TypeWebFile } from './web-file';

export type TypeStore = {
  currentWebFile: TypeWebFile | null,
  currentPathList: string[],
  webFileList: TypeWebFile | null,
}