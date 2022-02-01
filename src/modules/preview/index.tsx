import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { createClassNameFunc } from '../../util/name'

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

  useEffect(() => {
    const newHtml = marked.parse(markdown);
    setHtml(newHtml);
  }, [markdown]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('html')}>
        <div dangerouslySetInnerHTML={createMarkup(html)} />
      </div>
    </div>
  )
}