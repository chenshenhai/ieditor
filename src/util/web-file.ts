
type WebFile = {
  initialized: boolean,
  handle: FileSystemDirectoryHandle | FileSystemFileHandle,
  content?: FileReader;
  children?: WebFile[]
}


export async function openFile(): Promise<WebFile> {
  const [ handle ] = await window.showOpenFilePicker();
  const webFile = await parseWebFile({ handle, initialized: false });
  return webFile;
}

export async function openFolder(): Promise<WebFile[]> {
  const dirHandle = await window.showDirectoryPicker();
  const list: WebFile[] = [];
  for await (let handle of dirHandle.values()) {
    const webFile = await parseWebFile({
      handle: handle,
      initialized: false
    })
    list.push(webFile)
  }
  return list;
}

async function parseWebFile(webFile: WebFile): Promise<WebFile> {
  if (webFile.handle.kind === 'file') {
    if (!webFile.content) {
      const file = await webFile.handle.getFile();
      const reader = await readFile(file);
      webFile.content = reader;
      webFile.initialized = true;
    }
  } else if (webFile.handle.kind === 'directory') {
    if (!Array.isArray(webFile.children)) {
      webFile.children = [];
    }
    for await (let handle of webFile.handle.values()) {
      webFile.children.push({
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