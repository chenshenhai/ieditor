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
  const refIsModified = useRef<boolean>(false);
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
      refEditor?.current?.setValue(value);
    }
    const getEditValue = () => {
      return refEditor?.current?.getValue();
    }

    const insertEditValue = (data: string) => {
      refEditor?.current?.replaceSelection(data)
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
        refIsModified.current = true;
        if (typeof onChange === 'function') {
          const value = editor.getValue();
          onChange({ value })
          eventHub.trigger('setPreviewValue', value);
        }
      })
      eventHub.on('setEditValue', setEditValue);
      eventHub.on('getEditValue', getEditValue);
      eventHub.on('insertEditValue', insertEditValue);
    }

    return () => {
      eventHub.off('setEditValue', setEditValue);
      eventHub.off('getEditValue', getEditValue);
      eventHub.off('insertEditValue', insertEditValue)
    }
    
  }, []);

  useEffect(() => {
    if (isMarkdownFile(store.currentWebFile)) {
      refEditor.current?.setValue(getFileContent(store.currentWebFile));
    }
  }, [store.currentWebFile]);

  useEffect(() => {
    const storeCurrentMarkdown = () => {
      const values = eventHub.trigger('getEditValue', undefined);
      if (isMarkdownFile(store.currentWebFile) && Array.isArray(values) && typeof values[0] === 'string') {
        store.currentWebFile.content = values[0];
      }
    }
    eventHub.on('storeCurrentMarkdown', storeCurrentMarkdown)
    return () => {
      eventHub.off('storeCurrentMarkdown', storeCurrentMarkdown)
    }
  }, []);

  return (
    <div className={getCls('container')}>
      <div className={getCls('main')} ref={ref}></div>
    </div>
  )
}