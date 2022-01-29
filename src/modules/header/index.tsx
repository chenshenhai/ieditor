import React from 'react';
import { createClassNameFunc } from '../../util/name';
import { Button } from '../../components/ui';
import { openFile, openFolder } from '../../util/web-file';

const NAME = 'header';
const getCls = createClassNameFunc(NAME);

export type TypeHeaderProps = {
  
}

export const headerHeight = 36;

export function Header(props: TypeHeaderProps) {

  const onClickOpenFile = async () => {
    const data = await openFile();
    console.log('data ===', data);
  }

  const onClickOpenFolder = async () => {
    const webFileList = await openFolder();
    console.log('webFileList ====', webFileList);
  }

  return (
    <div
      className={getCls('container')}
      style={{
        height: headerHeight,
      }}>
      <Button onClick={onClickOpenFile}>Open File</Button>
      <Button onClick={onClickOpenFolder}>Open Folder</Button>
    </div>
  )
}