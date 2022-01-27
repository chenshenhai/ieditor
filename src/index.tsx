import React from 'react';
import classNames from 'classnames';
import { createClassName } from './util/name';
import { FlexRows } from './components/flex-rows';
import { Content } from './modules/content';
import { Header } from './modules/header';
import { Footer } from './modules/footer';
const NAME = 'content';

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
  return (
    <div
      className={classNames(
        createClassName(NAME), className
      )}
      style={getStyle(props)}
    >
      <FlexRows
        list={[
          {
            slot: (<Header />),
            height: 40,
          },
          {
            slot: (<Content defaultValue={defaultValue}/>)
          },
          {
            slot: (<Footer />),
            height: 40,
          },
        ]}
      />
      
    </div>
  )
}

export default IEditor;