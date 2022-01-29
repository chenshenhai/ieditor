import React from 'react';
import { createClassNameFunc } from '../../util/name';
import { Button } from '../../components/ui';
import { openFile, openFolder } from '../../util/web-file';
import { eventHub } from '../../util/event';

const NAME = 'header';
const getCls = createClassNameFunc(NAME);

export type TypeHeaderProps = {
  
}

export const headerHeight = 36;

export function Header(props: TypeHeaderProps) {

  const onClickOpenFile = async () => {
    const webFile = await openFile();
    eventHub.trigger('setWebFileList', webFile);
  }

  const onClickOpenFolder = async () => {
    const webFileList = await openFolder();
    eventHub.trigger('setWebFileList', webFileList);
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