import React from 'react';
import { createClassNameFunc } from '../../util/name'

const NAME = 'preview';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  content?: string;
}

export function Preview(props: TypeLayoutProps) {
  const { content } = props;
  return (
    <div className={getCls('container')}>
      <div>Preivew</div>
      <div>
        {content}
      </div>
    </div>
  )
}