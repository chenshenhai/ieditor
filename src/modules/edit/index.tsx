import React, { useEffect, useRef, useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { TypeWebFile, isMarkdownFile } from '../../util/web-file';
import CodeMirror from './codemirror';
import { Context } from '../../context';
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
  const { store, dispatch } = useContext(Context);
 
  useEffect(() => {
    if (store?.currentWebFile) {
      store.currentWebFile.content = defaultValue;
    }
    dispatch({
      type: 'updateCurrentWebFile',
      payload: store,
    })
  }, []);


  useEffect(() => {
    const setEditValue = (value: string) => {
      if (isMarkdownFile(store.currentWebFile)) {
        refEditor?.current?.setValue(value);
      }
    }
    const getEditValue = () => {
      return refEditor?.current?.getValue();
    }
    
    if (ref && ref.current) {
      const editor: CodeMirror.Editor = CodeMirror(ref.current, {
        value: getFileContent(store.currentWebFile),
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
      eventHub.on('setEditValue', setEditValue);
      eventHub.on('getEditValue', getEditValue);
      eventHub.on('insertEditValue', (data) => {
        editor.replaceSelection(data)
      })
      // editor.setSelection('')
    }

    return () => {
      eventHub.off('setEditValue', setEditValue);
      eventHub.off('getEditValue', getEditValue);
    }
    
  }, []);

  useEffect(() => {
    if (isMarkdownFile(store.currentWebFile)) {
      refEditor.current?.setValue(getFileContent(store.currentWebFile));
    }
  }, [store.currentWebFile]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('main')} ref={ref}></div>
    </div>
  )
}