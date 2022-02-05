import { generateUuid } from './uuid';

function getExtName(dataURL: string): string {
  const arr = dataURL.split(',');
  // @ts-ignore
  const extName = /^data:([^;]+?);base64/.exec(arr[0])[1] || 'image/png';
  return extName.split('/')[1];
}

function parseImageSrc(md: string): string | null {
  let src: string | null = null;
  const execArr = /!\[(.*?)\]\((.*?)\)/ig.exec(md);
  if (execArr && typeof execArr[2] === 'string') {
    src = execArr[2];
  }
  return src;
}

export function parseMarkdownImage(
  md: string,
  imageMap: { [key: string]: string }
): string {
  let code = md;
  code = code.replace(/!\[(.*?)\]\((.*?)\)/ig, (match: string) => {
    let fragment: string = match;
    let src = parseImageSrc(match);

    if (src && typeof imageMap[src] === 'string' && imageMap[src]) {
      fragment = fragment.replace(src, imageMap[src]);
    }
    return fragment;
  })
  return code;
}

export function generateMarkdownImage(md: string): {
  md: string,
  imageMap: { [key: string]: string },
} {
  let code: string = md;
  const imageMap: { [key: string]: string } = {};
  code = code.replace(/!\[(.*?)\]\((.*?)\)/ig, (match: string) => {
    let fragment: string = match;
    let src = parseImageSrc(match);
    if (src && typeof src === 'string') {
      const tempSrc = `${generateUuid()}.${getExtName(src)}`
      fragment = fragment.replace(src, tempSrc);
      imageMap[tempSrc] = src;
    }
    return fragment;
  })

  return {
    md: code,
    imageMap
  }
}

// import { Lexer } from 'marked'; 
// const lexer = new Lexer();
// export function parseToPreviewMarkdown(
//   md: string,
//   opts: {
//     imageMap?: {[key: string]: string}
//   }) {
//   const ast = lexer.lex(md);
//   if (Array.isArray(ast)) {
//     const _parse = (data: any) => {
//       if (data.type === 'code') {
//         return;
//       }
//       const keys = Object.keys(data);
//       keys.forEach((key) => {
//         if (key === 'text') {
//           data[key] = data[key].replace(/!\[[^\[^\]]]\]/ig)
//         } else {
//           const _data = data[key];
//           if (Array.isArray(_data)) {
//             _data.forEach((item) => {
//               _parse(item);
//             })
//           } else if (Object.prototype.toString.call(_data) === '[object Object]') {
//             _parse(_data);
//           }
//         }

//       });
//     }
//     ast.forEach((item) => {
//       _parse(item);
//     })
//   }
// }