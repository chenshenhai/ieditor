import React, { useContext, useEffect } from 'react';
import { createClassNameFunc } from '../../util/name';
import { Button } from '../../components/ui';
import { openFile, openFolder, saveFile, createFileHandle, createWebFile } from '../../util/web-file';
import { createWebImageFile } from '../../util/web-image-file';
import { Context } from '../../context';
import { eventHub } from '../../util/event';
import { pickFile, parseFileToBase64 } from '../../util/file';
import { copyHtml } from '../../util/copy';

const NAME = 'header';
const getCls = createClassNameFunc(NAME);

export type TypeHeaderProps = {
  
}

export const headerHeight = 36;

export function Header(props: TypeHeaderProps) {
  const { store, dispatch } = useContext(Context);
  const { tempWebFileList } = store; 
  const onClickOpenFile = async () => {
    const webFile = await openFile();
    dispatch({ type: 'updateWebFileList', payload: { webFileList: webFile }})
    dispatch({ type: 'updateCurrentWebFile', payload: { currentWebFile: webFile }})
  }

  const onClickOpenFolder = async () => {
    const webFileList = await openFolder();
    dispatch({ type: 'updateWebFileList', payload: { webFileList: webFileList }})
  }

  const onClickSave = async () => {
    // const currentWebFile = dispatchCurrentWebFile({name: 'get'});
    const content: string = eventHub.trigger('getEditValue', undefined)?.[0] || '';
    // if (store?.currentWebFile?.handle && store?.currentWebFile?.handle instanceof FileSystemFileHandle) {
    //   saveFile(store.currentWebFile, content)
    // }
    if (!store?.currentWebFile?.handle) {
      store.currentWebFile.handle = await window.showSaveFilePicker({
        types: [{
          description: 'Markdown File',
          accept: {'text/plain': ['.md']},
        }],
      });
    }
    saveFile(store.currentWebFile, content)
    eventHub.trigger('storeCurrentMarkdown', undefined);
    eventHub.trigger('resetModifyCount', undefined);
  }

  const onClickNewFile = async () => {
    const handle = await createFileHandle('md');
    const webFile = createWebFile();
    const defaultContent = '# Hello World';
    webFile.name = handle?.name || 'index.md';
    webFile.id = webFile.name;
    webFile.initialized = true;
    webFile.content = defaultContent;
    webFile.pathList = [webFile.name]
    if (handle) {
      webFile.handle = handle;
    }
    dispatch({ type: 'updateWebFileList', payload: { webFileList: webFile }})
    dispatch({ type: 'updateCurrentWebFile', payload: { currentWebFile: webFile }})
    eventHub.trigger('setEditValue', webFile.content)
  }

  const onClickImportImage = async () => {
    pickFile({
      accept: 'image/*',
      success: async (data) => {
        const { file } = data;
        if (file) {
          const dataURL = await parseFileToBase64(file);
          const webFile = createWebImageFile({
            // @ts-ignore
            fileType: file.type,
            content: dataURL as string,
          }, {
            originPathList: tempWebFileList?.pathList
          });
          tempWebFileList?.children?.push(webFile);
          dispatch({
            type: 'updateTempWebFileList',
            payload: { tempWebFileList }
          });
          eventHub.trigger('insertEditValue', `![image](${webFile.id})`);
        }
      },
      error: (data) => {
        console.log('error: ', data);
      },
    });
  }

  const onClickExport = async () => {
    const html = eventHub.trigger('getPreviewValue', undefined);
    // TODO
    console.log('html =====', html);
  }

  const onClickCopy = async () => {
    const html = eventHub.trigger('getPreviewValue', undefined);
    // TODO
    console.log('html =====', html);
    if (Array.isArray(html) && typeof html[0] === 'string') {
      copyHtml(html[0]);
    }
  }

  useEffect(() => {
    const openFile = () => {
      onClickOpenFile();
    }
    const openFolder = () => {
      onClickOpenFolder();
    }
    const newFile = () => {
      onClickNewFile();
    }
    const importImage = () => {
      onClickImportImage();
    }
    eventHub.on('openFile', openFile);
    eventHub.on('openFolder', openFolder);
    eventHub.on('importImage', importImage);
    eventHub.on('newFile', newFile);

    return () => {
      eventHub.off('openFile', openFile);
      eventHub.off('openFolder', openFolder);
      eventHub.on('importImage', importImage);
      eventHub.off('newFile', newFile);
    }
  }, []);

  return (
    <div
      className={getCls('container')}
      style={{
        height: headerHeight,
      }}>
      <Button className={getCls('btn')} onClick={onClickNewFile}>New File</Button>
      <Button className={getCls('btn')} onClick={onClickOpenFile}>Open File</Button>
      <Button className={getCls('btn')} onClick={onClickOpenFolder}>Open Folder</Button>
      <Button className={getCls('btn')} onClick={onClickImportImage}>Import Image</Button>
      <Button className={getCls('btn')} onClick={onClickSave}>Save</Button>
      <Button className={getCls('btn')} onClick={onClickExport}>Export</Button>
      <Button className={getCls('btn')} onClick={onClickCopy}>Copy</Button>
    </div>
  )
}