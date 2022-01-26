import React, { useState } from 'react';
import classNames from 'classnames';
import { Layout } from './components/layout';
import { Edit } from './modules/edit';
import { Preview } from './modules/preview';
import { createClassName } from './util/name';
const NAME = 'container';

export type TypeIEditorProps = {
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  defaultValue?: string;
}

function IEditor(props: TypeIEditorProps) {
  const { width, height, className, style = {}, defaultValue = '' } = props;
  const [markdown, setMarkdown] = useState<string>(defaultValue);
  return (
    <div
      className={classNames(
        createClassName(NAME), className
      )}
      style={{
        ...style,
        ...{width, height}
      }}
    >
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
      
    </div>
  )
}

export default IEditor;