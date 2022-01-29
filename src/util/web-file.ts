
export type TypeWebFile = {
  id: string,
  name: string,
  children?: TypeWebFile[],

  initialized: boolean,
  type: 'file' | 'directory',
  origin: 'FileSystemAccess',
  content?: string | ArrayBuffer | null,
  fileType?: string,
  handle?: FileSystemDirectoryHandle | FileSystemFileHandle,
}

export async function openFile(): Promise<TypeWebFile> {
  const [ handle ] = await window.showOpenFilePicker();
  const webFile = await parseWebFile({
    id: handle.name,  // TODO
    name: handle.name,
    origin: 'FileSystemAccess',
    type: handle.kind,
    handle,
    initialized: false
  });
  return webFile;
}

export async function openFolder(): Promise<TypeWebFile> {
  const dirHandle = await window.showDirectoryPicker();
  const list: TypeWebFile[] = [];
  for await (let handle of dirHandle.values()) {
    const webFile = await parseWebFile({
      id: handle.name, // TODO
      name: handle.name,
      origin: 'FileSystemAccess',
      type: handle.kind,
      handle: handle,
      initialized: false
    })
    list.push(webFile)
  }
  return {
    initialized: true,
    id: dirHandle.name,
    name: dirHandle.name,
    type: dirHandle.kind,
    origin: 'FileSystemAccess',
    children: list,
  };
}

async function parseWebFile(webFile: TypeWebFile): Promise<TypeWebFile> {
  if (webFile?.handle?.kind === 'file') {
    if (!webFile.content) {
      const file = await webFile?.handle?.getFile();
      const reader = await readFile(file);
      webFile.fileType = file.type;
      webFile.content = reader.result;
      webFile.initialized = true;
    }
  } else if (webFile?.handle?.kind === 'directory') {
    if (!Array.isArray(webFile.children)) {
      webFile.children = [];
    }
    for await (let handle of webFile.handle.values()) {
      webFile.children.push({
        id: handle.name, // TODO
        name: handle.name,
        origin: 'FileSystemAccess',
        type: handle.kind,
        handle,
        initialized: false
      })
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