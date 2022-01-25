import React from 'react';
import classNames from 'classnames';
import { Layout } from './mod/layout';
import { Edit } from './mod/edit';
import { Preview } from './mod/preview';
import { createClassName } from './util/name';
const NAME = 'container';

export type TypeIEditorProps = {
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  value?: string;
}

function IEditor(props: TypeIEditorProps) {
  const { width, height, className, style = {}, value } = props;
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
        left={<Edit value={value} />}
        leftSize={0.5}
        right={<Preview />}
      />
    </div>
  )
}

export default IEditor;