import { generateUuid } from './uuid';
import { TypeWebFile } from './web-file';


export function getImageType(dataURL: string): "image/png" | "image/jpeg" {
  const arr = dataURL.split(',');
  // @ts-ignore
  const imageType = /^data:([^;]+?);base64/.exec(arr[0])[1] || 'image/png';
  return imageType as "image/png" | "image/jpeg"
}

export function getImageExtName(dataURL: string): string {
  const imageType = getImageType(dataURL);
  return imageType.split('/')[1];
}


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

export function transfromImageMapToTempFileList(
  imageMap: {[key: string]: string}
): TypeWebFile[] {
  const fileList: TypeWebFile[] = [];
  const names: string[] = Object.keys(imageMap);
  names.forEach((name: string) => {
    const src = imageMap[name];
    const fileType = getImageType(src);
    const imageFile = createWebImageFile({
      fileType,
      name,
      content: src
    }, { originPathList: ['@temp'] })
    fileList.push(imageFile)
  });
  return fileList;
}