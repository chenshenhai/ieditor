import React, { useState, useContext } from 'react';
import { Context } from '../../context';
import { MdEditor } from './md-editor';
import { ImageEditor } from './image-editor';
import { Unsupported } from './unsupported';
import { getCls } from './common';

export type TypeIEditorProps = {
  defaultValue?: string;
}

export function Main(props: TypeIEditorProps) {
  const { store } = useContext(Context);
  const { currentWebFile } = store;
  // @ts-ignore
  const [markdown, setMarkdown] = useState<string>(store.currentWebFile.content || '');
  return (
    <div className={getCls('container')}>
      {/* {currentWebFile.fileType === 'text/plain' ? (
        <MdEditor />
      ) : (<>{
          currentWebFile?.fileType?.startsWith('image/') ? (
            <ImageEditor />
          ) : <Unsupported />
        }</>)} */}

      <MdEditor style={{
        display: currentWebFile.fileType === 'text/plain' ? 'flex' : 'none',
      }}/>
      {currentWebFile.fileType !== 'text/plain' && (
        <>{
          currentWebFile?.fileType?.startsWith('image/') ? (
            <ImageEditor />
          ) : <Unsupported />
        }</>
      )}  
        
    </div>
  )
}

 