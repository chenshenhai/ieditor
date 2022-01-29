import { TypeWebFile } from './web-file';


export type TypeStore = {
  currentWebFile: TypeWebFile | null,
  pathList: string[],
  webFileList: TypeWebFile[], 
}

