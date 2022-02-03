import React, { useContext, useEffect } from 'react';
import { createClassNameFunc } from '../../util/name';
import { Button } from '../../components/ui';
import { openFile, openFolder, saveFile, createFileHandle, createWebFile } from '../../util/web-file';
import { Context } from '../../context';
import { eventHub } from '../../util/event';

const NAME = 'header';
const getCls = createClassNameFunc(NAME);

export type TypeHeaderProps = {
  
}

export const headerHeight = 36;

export function Header(props: TypeHeaderProps) {
  const { store, dispatch } = useContext(Context);

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
    if (store?.currentWebFile?.handle && store?.currentWebFile?.handle instanceof FileSystemFileHandle) {
      saveFile(store.currentWebFile, content)
    }
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
    eventHub.on('openFile', openFile);
    eventHub.on('openFolder', openFolder);
    eventHub.on('newFile', newFile);

    return () => {
      eventHub.off('openFile', openFile);
      eventHub.off('openFolder', openFolder);
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
      <Button className={getCls('btn')} onClick={onClickSave}>Save</Button>
    </div>
  )
}