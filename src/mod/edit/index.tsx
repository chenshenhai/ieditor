import React from 'react';
import { createClassNameFunc } from '../../util/name'

const NAME = 'edit';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  content?: string;
}

export function Edit(props: TypeLayoutProps) {
  const { content } = props;
  return (
    <div className={getCls('container')}>
      <div>Edit</div>
      <div>
        {content}
      </div>
    </div>
  )
}