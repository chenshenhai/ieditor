import React, { useState, useContext } from 'react';
import { SplitLayout } from '../../components/split-layout';
import { Edit } from '../edit';
import { Preview } from '../preview';
import { Context } from '../../context';
// import { createClassName } from './../../util/name';
// const NAME = 'main';

export type TypeIEditorProps = {
  defaultValue?: string;
}

export function Main(props: TypeIEditorProps) {
  const { store } = useContext(Context);
  // @ts-ignore
  const [markdown, setMarkdown] = useState<string>(store.currentWebFile.content || '');
  return (
    <>
      <SplitLayout
        left={
          <Edit
            // @ts-ignore
            defaultValue={store.currentWebFile.content}
            onChange={(data) => {
              const { value } = data;
              setMarkdown(value)
            }}
          />
        }
        leftSize={0.5}
        right={(<>
          {typeof store.currentWebFile.content === 'string' ? (
            <Preview markdown={store.currentWebFile.content} />
          ) : (
            <div>Unsupport content</div>
          )}
        </>)}
      />
    </>
  )
}

 