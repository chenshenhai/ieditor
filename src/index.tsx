import React, { useState } from 'react';
import classNames from 'classnames';
import { Layout } from './components/split-layout';
import { Edit } from './modules/edit';
import { Preview } from './modules/preview';
import { createClassName } from './util/name';
const NAME = 'container';

export type TypeIEditorProps = {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  defaultValue?: string;
  fullScreen?: boolean;
}

function getStyle(props: TypeIEditorProps): React.CSSProperties {
  const { style, width, height, fullScreen } = props;
  let result: React.CSSProperties = {
    ...{},
    ...style,
    ...{ width, height }
  }
  if (fullScreen === true) {
    result = {
      ...result,
      ...{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999999999,
        width: '100%',
        height: '100%',
      }
    }
  }
  return result;
}

function IEditor(props: TypeIEditorProps) {
  const { className, defaultValue = '' } = props;
  const [markdown, setMarkdown] = useState<string>(defaultValue);
  return (
    <div
      className={classNames(
        createClassName(NAME), className
      )}
      style={getStyle(props)}
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