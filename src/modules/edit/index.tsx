import React, { useState, useEffect, useRef } from 'react';
import { createClassNameFunc } from '../../util/name';
import { TypeWebFile, isMarkdownFile } from '../../util/web-file';
import CodeMirror from './codemirror';
import { eventHub } from '../../util/event';

const NAME = 'edit';
const getCls = createClassNameFunc(NAME);

function getFileContent(webFile: TypeWebFile): string {
  let content: string = '';
  if (typeof webFile.content === 'string') {
    content = webFile.content;
  }
  return content;
}

export type TypeLayoutProps = {
  defaultValue?: string;
  onChange?: (data: {value: string}) => void;
}

export function Edit(props: TypeLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const refEditor = useRef<CodeMirror.Editor>(null);
  const { defaultValue, onChange } = props;
  const [ webFile, setWebFile ] = useState<TypeWebFile>({
    id: '',
    name: '',
    pathList: [],
    initialized: false,
    type: 'file',
    origin: 'FileSystemAccess',
    content: defaultValue || '',
  })

  useEffect(() => {
    eventHub.on('setCurrentWebFile', (data: TypeWebFile | null) => {
      if (data && isMarkdownFile(data)) {
        setWebFile(data);
      } else if (data && data.type === 'file') {
        data.content = 'Not Support File Type!'
        setWebFile(data)
      }
    });
  }, []);

  useEffect(() => {
    if (ref && ref.current) {
      const editor: CodeMirror.Editor = CodeMirror(ref.current, {
        value: getFileContent(webFile),
        mode: 'markdown',
        readOnly: false,
        tabSize: 2,
        lineWrapping: true,
        lineNumbers: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      });
      // @ts-ignore
      refEditor.current = editor;
      editor.on('change', () => {
        if (typeof onChange === 'function') {
          const value = editor.getValue();
          onChange({ value })
        }
        // editor.getValue()
      })
      // // editor.setOption('mode', '');
      // // window.addEventListener('resize',() => {
      // //   editor.refresh()
      // // })
    }
    
  }, []);

  useEffect(() => {

    refEditor.current?.setValue(getFileContent(webFile));
  }, [webFile]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('main')} ref={ref}></div>
    </div>
  )
}