import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { createClassNameFunc } from '../../util/name'

const NAME = 'preview';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  markdown?: string;
}

function createDocument(html: string) {
  return `
  <html>
    <head>
      <style>
        html, body { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>
  `
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
      <iframe className={getCls('iframe')} srcDoc={createDocument(html)}></iframe>
    </div>
  )
}