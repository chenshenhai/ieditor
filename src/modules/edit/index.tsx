import React, { useEffect, useRef } from 'react';
import { createClassNameFunc } from '../../util/name';
import CodeMirror from './codemirror'

const NAME = 'edit';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  defaultValue?: string;
  onChange?: (data: {value: string}) => void;
}

export function Edit(props: TypeLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { defaultValue, onChange } = props;
  useEffect(() => {
    if (ref && ref.current) {
      
      const editor = CodeMirror(ref.current, {
        value: defaultValue || '',
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

  return (
    <div className={getCls('container')}>
      <div className={getCls('main')} ref={ref}></div>
    </div>
  )
}