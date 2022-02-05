import { generateUuid } from './uuid';
import { TypeWebFile } from './web-file';

export function createWebImageFile(
  data: {
    fileType: 'image/png' | 'image/jpeg',
    name?: string,
    content: string
  },
  opts?: {
    originPathList?: string[]
  }
) : TypeWebFile {
  let name: string = '';
  if (typeof data.name === 'string' && data.name) {
    name = data.name;
  } else {
    name = `${generateUuid({ easy: true })}.${data.fileType.split('/')[1] || 'jpg'}`;
  }
  const pathList = [...(opts?.originPathList || []), name]
  const webFile: TypeWebFile = {
    id: pathList.join('/'),
    name,
    pathList,
    fileType: data.fileType,
    initialized: false,
    content: data.content, 
    type:  'file',
    origin: 'IEditorTemp',
  }
  return webFile;
}

export function getTempImageMap(tempFile: TypeWebFile | null): {[key: string]: string} {
  const map: {[key: string]: string} = {};
  function _parse(file: TypeWebFile) {
    if (file.origin === 'IEditorTemp' 
      && file.fileType?.startsWith('image/')
      && typeof file.content === 'string'
    ) {
      map[file.id] = file.content;
    }
    if (Array.isArray(file.children)) {
      file.children.forEach((item) => {
        _parse(item);
      });
    }
  }
  if (tempFile) {
    _parse(tempFile);
  }
  return map;
}