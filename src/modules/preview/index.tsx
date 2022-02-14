import React, { useState, useEffect, useRef, useContext } from 'react';
import { Lexer } from 'marked';
import { createClassNameFunc } from '../../util/name';
import { eventHub } from '../../util/event';
import { Context } from '../../context'; 
import { getTempImageMap } from '../../util/web-image-file';
import { parseMarkdownImage } from '../../util/markdown/parse';
import { parseMarkdownToHtml } from '../../util/markdown/render';

const NAME = 'preview';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  markdown?: string;
}

function createMarkup(html: string) {
  return {__html: html};
}

export function Preview(props: TypeLayoutProps) {
  const { store } = useContext(Context);
  const { markdown = '' } = props;
  const [html, setHtml] = useState<string>('');
  const refHtml = useRef<string>('');
  const refLexer = useRef<Lexer>();
  refLexer.current = new Lexer();

  useEffect(() => {

    const setPreviewValue = (value: string) => {
      const imageMap = getTempImageMap(store.tempWebFileList);
      const md = parseMarkdownImage(value, imageMap);
      const newHtml = parseMarkdownToHtml(md);
      refHtml.current = newHtml;
      setHtml(newHtml);
    }

    const getPreviewValue = () => {
      return refHtml.current;
    }

    setPreviewValue(markdown)

    eventHub.on('setPreviewValue', setPreviewValue);
    eventHub.on('getPreviewValue', getPreviewValue);

    return () => {
      eventHub.off('setPreviewValue', setPreviewValue);
      eventHub.off('getPreviewValue', getPreviewValue);
    }
  }, [markdown]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('html')}>
        <div dangerouslySetInnerHTML={createMarkup(html)} />
      </div>
    </div>
  )
}