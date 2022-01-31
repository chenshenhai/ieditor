export type TypeWebFile = {
  id: string,
  name: string,
  children?: TypeWebFile[],
  pathList: string[],
  initialized: boolean,
  type: 'file' | 'directory',
  origin: 'FileSystemAccess',
  content?: string | ArrayBuffer | null,
  fileType?: string,
  handle?: FileSystemDirectoryHandle | FileSystemFileHandle,
}

export function createWebFile(type?: TypeWebFile['type']): TypeWebFile {
  return {
    id: '',
    name: '',
    pathList: [],
    initialized: false,
    type: type || 'file',
    origin: 'FileSystemAccess',
  }
}

export async function initWebFile(webFile: TypeWebFile) {
  if (webFile.initialized !== true && webFile?.handle?.kind === 'file') {
    const file = await webFile?.handle?.getFile();
    const reader = await readFile(file);
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

export async function saveFile(fileHandle: FileSystemFileHandle, content: string) {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}


export type TypeFileExtName = 'md' | 'png' | 'jpg' | 'jpeg';

const fileTypeMap: {
  [key: string]: string;
} = {
  'md': 'text/plain',
  'png': 'image/png',
  'jpg': 'image/jpeg',
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
      const file = await webFile?.handle?.getFile();
      const reader = await readFile(file);
      webFile.fileType = file.type;
      webFile.content = reader.result;
      webFile.initialized = true;
      webFile.pathList = [...(webFile.pathList || []), ...[webFile.handle.name]];
    }
  } else if (webFile?.handle?.kind === 'directory') {
   
    if (!Array.isArray(webFile.children)) {
      webFile.children = [];
    }
    for await (let handle of webFile.handle.values()) {
      const tempPathList = [ ...[], ...webFile.pathList ];

      let _webFile: TypeWebFile = {
        id: handle.name, // TODO
        name: handle.name,
        pathList: [...[], ...(tempPathList || []), ...[handle.name]],
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



