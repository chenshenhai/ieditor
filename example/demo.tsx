import React from 'react';
import ReactDOM from 'react-dom';
import IEditor from '../src/';
import { imageMarkdownBase64, imageNodejsBase64 } from './assets';

import '../src/index.less';

const value = `
# Hello iEditor

> A online editor of markdown based on [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

![md](${imageMarkdownBase64})

## Dependent Technology

- Environment
  - Node.js
  - Chrome Browser
- Source
  - React
  - Ant Design


![nodejs](${imageNodejsBase64})


![react](https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg)

## File System

The file system is based on [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)






`;

ReactDOM.render(
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
  }}>
    {/* <IEditor width={800} height={400} defaultValue={value}/> */}
    <IEditor
      width={800} height={400}
      fullScreen
      defaultValue={value}
      defaultName={'HelloWorld.md'}
    />
  </div>,
  document.querySelector('#app')
)

