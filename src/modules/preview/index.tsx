import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { createClassNameFunc } from '../../util/name';
import { eventHub } from '../../util/event';

const NAME = 'preview';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  markdown?: string;
}

function createMarkup(html: string) {
  return {__html: html};
}

export function Preview(props: TypeLayoutProps) {

  const { markdown = '' } = props;
  const [html, setHtml] = useState<string>('');
  const refHtml = useRef<string>('');

  useEffect(() => {

    const setPreviewValue = (value: string) => {
      const newHtml = marked.parse(value);
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