import React from 'react';
import classNames from 'classnames';
import { createClassName, createClassNameFunc } from './util/name';
import { FlexRows } from './components/flex-rows';
import { Content } from './modules/content';
import { Header, headerHeight } from './modules/header';
import { Footer, footerHeight } from './modules/footer';
const NAME = 'wrapper';

const getCls = createClassNameFunc(NAME);

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
            height: headerHeight,
            className: getCls('header'),
          },
          {
            slot: (<Content defaultValue={defaultValue}/>)
          },
          {
            slot: (<Footer />),
            height: footerHeight,
            className: getCls('footer'),
          },
        ]}
      />
      
    </div>
  )
}

export default IEditor;