import React, { useState } from 'react';
// import classNames from 'classnames';
import { Layout } from '../../components/split-layout';
import { Edit } from '../edit';
import { Preview } from '../preview';
// import { createClassName } from './../../util/name';
// const NAME = 'main';

export type TypeIEditorProps = {
  defaultValue?: string;
}

export function Content(props: TypeIEditorProps) {
  const { defaultValue = '' } = props;
  const [markdown, setMarkdown] = useState<string>(defaultValue);
  return (
    <Layout 
      left={
        <div>List</div>
      }
      leftSize={0.2}
      right={
        <Layout
          left={
            <Edit
              defaultValue={defaultValue}
              onChange={(data) => {
                const { value } = data;
                setMarkdown(value)
              }}
            />
          }
          leftSize={0.5}
          right={<Preview markdown={markdown} />}
        />
      }
    />
  )
}

 