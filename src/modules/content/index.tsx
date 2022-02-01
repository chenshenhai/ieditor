import React, { useState } from 'react';
// import classNames from 'classnames';
import { SplitLayout } from '../../components/split-layout';
import { Edit } from '../edit';
import { Preview } from '../preview';
import { Sider } from '../sider'; 
// import { createClassName } from './../../util/name';
// const NAME = 'main';

export type TypeIEditorProps = {
  defaultValue?: string;
}

export function Content(props: TypeIEditorProps) {
  const { defaultValue = '' } = props;
  const [markdown, setMarkdown] = useState<string>(defaultValue);
  return (
    <SplitLayout 
      left={<Sider />}
      leftSize={0.16}
      right={
        <SplitLayout
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

 