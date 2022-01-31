import React, { useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { Button } from '../../components/ui';
import { openFile, openFolder } from '../../util/web-file';
import { Context } from '../../context';

const NAME = 'header';
const getCls = createClassNameFunc(NAME);

export type TypeHeaderProps = {
  
}

export const headerHeight = 36;

export function Header(props: TypeHeaderProps) {
  console.log('re-render Header ...')

  const { store, dispatch } = useContext(Context);

  const onClickOpenFile = async () => {
    const webFile = await openFile();
    dispatch({ type: 'updateWebFileList', payload: { currentWebFile: webFile }})
    dispatch({ type: 'updateCurrentWebFile', payload: { webFileList: webFile }})
  }

  const onClickOpenFolder = async () => {
    const webFileList = await openFolder();
    dispatch({ type: 'updateWebFileList', payload: { webFileList: webFileList }})
  }

  const onClickSave = async () => {
    // const currentWebFile = dispatchCurrentWebFile({name: 'get'});
    console.log('save currentWebFile ===', store.currentWebFile);

    // let handle: FileSystemDirectoryHandle | FileSystemFileHandle | undefined | null = webFile?.handle;
    // if (!handle) {
    //   handle = await createFileHandle('md');
    // }
    // saveFile();
  }

  return (
    <div
      className={getCls('container')}
      style={{
        height: headerHeight,
      }}>
      <Button onClick={onClickOpenFile}>Open File</Button>
      <Button onClick={onClickOpenFolder}>Open Folder</Button>
      <Button onClick={onClickSave}>Save</Button>
    </div>
  )
}