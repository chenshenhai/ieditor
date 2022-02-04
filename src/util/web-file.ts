import { imageBase64ToBlob } from './file';

export type TypeFileExtName = 'md' | 'png' | 'jpg' | 'jpeg';

const fileTypeMap: {
  [key: string]: string;
} = {
  'md': 'text/plain',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
}

export type TypeWebFile = {
  id: string,
  name: string,
  children?: TypeWebFile[],
  pathList: string[],
  initialized: boolean,
  type: 'file' | 'directory',
  origin: 'FileSystemAccess' | 'IEditorTemp',
  content?: string | ArrayBuffer | null,
  fileType?: (typeof fileTypeMap)[TypeFileExtName],
  handle?: FileSystemDirectoryHandle | FileSystemFileHandle,
}

function getFileExtName(name: string): string {
  let extName: string = '';
  if (typeof name === 'string' && name && name.indexOf('.') > 0) {
    extName = name.substring(name.lastIndexOf('.') + 1);
  }
  return extName;
}

function getFileTypeByName(webFile: TypeWebFile): string {
  let fileType = '';
  if (typeof webFile.name === 'string' && webFile.name) {
    const extName = getFileExtName(webFile.name);
    fileType = fileTypeMap[extName];
  }
  return fileType;
}

export function createWebFile(type?: TypeWebFile['type']): TypeWebFile {
  return {
    id: '',
    name: '',
    pathList: [],
    fileType: fileTypeMap['md'],
    initialized: false,
    type: type || 'file',
    origin: 'FileSystemAccess',
  }
}


export function createTempWebFileList(): TypeWebFile {
  const tempWebFileList: TypeWebFile = {
    id: '@temp',
    name: '@temp',
    pathList: ['@temp'],
    fileType: '',
    initialized: true,
    type: 'directory',
    origin: 'IEditorTemp',
    children: []
  }
  const readme = createWebFile();
  readme.pathList = [tempWebFileList.name, readme.name];
  readme.id = readme.pathList.join('/');
  readme.name = 'README.md';
  readme.content = '# Temporary Files';
  readme.initialized = true;
  readme.pathList = [tempWebFileList.name, readme.name];
  tempWebFileList?.children?.push(readme);
  return tempWebFileList;
}



export async function initWebFile(webFile: TypeWebFile): Promise<TypeWebFile> {
  if (webFile.initialized !== true && webFile?.handle?.kind === 'file') {
    const file = await webFile?.handle?.getFile();
    const reader = await readFile(file);
    webFile.fileType = file.type || getFileTypeByName(webFile);
    webFile.content = reader.result;
    webFile.initialized = true;
  }
  return webFile
}

export async function openFile(): Promise<TypeWebFile> {
  const [ handle ] = await window.showOpenFilePicker();
  const webFile = await parseWebFile({
    id: handle.name,  // TODO
    name: handle.name,
    pathList: [handle.name],
    origin: 'FileSystemAccess',
    type: handle.kind,
    handle,
    initialized: false
  });
  return webFile;
}

export async function openFolder(): Promise<TypeWebFile> {
  const dirHandle = await window.showDirectoryPicker();
  const webFile = await parseWebFile({
    id: dirHandle.name, // TODO
    name: dirHandle.name,
    origin: 'FileSystemAccess',
    type: dirHandle.kind,
    handle: dirHandle,
    pathList: [dirHandle.name],
    initialized: false
  })
  return webFile;
}

export async function saveFile(webFile: TypeWebFile, content: string): Promise<boolean> {
  if (isSupportedFile(webFile) && webFile.handle instanceof FileSystemFileHandle) {
    const fileHandle: FileSystemFileHandle = webFile.handle;
    const writable = await fileHandle.createWritable();
    let data: string | Blob = content;
    if (webFile?.fileType?.startsWith('image/')) {
      // @ts-ignore
      data = imageBase64ToBlob(content || webFile.content);
    }
    await writable.write(data);
    await writable.close();
    return true;
  }
  return false;
}


export async function createFileHandle(
  extname: TypeFileExtName,
): Promise<FileSystemFileHandle|null> {
  if (!fileTypeMap[extname]) {
    return null;
  }
  const opts = {
    types: [{
      // description: '',
      accept: {[fileTypeMap[extname]]: [`.${extname}`]},
    }],
  };
  return window.showSaveFilePicker(opts);
}

async function parseWebFile(webFile: TypeWebFile): Promise<TypeWebFile> {
  if (webFile?.handle?.kind === 'file') {
    if (!webFile.content) {
      webFile = await initWebFile(webFile) as TypeWebFile;
      if (webFile?.handle?.name) {
        webFile.pathList = [...(webFile.pathList || []), ...[webFile.handle.name]];
      }
    }
  } else if (webFile?.handle?.kind === 'directory') {
   
    if (!Array.isArray(webFile.children)) {
      webFile.children = [];
    }
    for await (let handle of webFile.handle.values()) {
      const tempPathList = [ ...[], ...webFile.pathList ];
      const pathList = [...[], ...(tempPathList || []), ...[handle.name]]
      let _webFile: TypeWebFile = {
        id: pathList.join('/'),
        name: handle.name,
        pathList: pathList,
        origin: 'FileSystemAccess',
        type: handle.kind,
        handle,
        initialized: handle.kind === 'directory'
      }
      if (_webFile.type === 'directory') {
        _webFile = await parseWebFile(_webFile);
      }
      webFile.children.push(_webFile);
    }
    webFile.initialized = true;
  }
  return webFile;
}


function readFile(file: File, options: any = {}): Promise<FileReader> {
  options = options || {};
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader);
    };
    reader.onerror = reject;
    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
}

export function isMarkdownFile(webFile: TypeWebFile): boolean {
  if (webFile.type === 'file' 
    && webFile.initialized === true
    && webFile.name.endsWith('.md')
  ) {
    return true;
  }
  return false;
}

export function isSupportedFile(webFile: TypeWebFile) {
  const extName = getFileExtName(webFile.name);
  const fileType = fileTypeMap[extName];
  if (typeof fileType === 'string' && fileType) {
    return true;
  } else {
    return false;
  }
}




