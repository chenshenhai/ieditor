import React from 'react';
import { createClassNameFunc } from './../../util/name';
const NAME = 'image';

const getCls = createClassNameFunc(NAME);

export type TypeIEditorProps = {
  webFile?: string;
}
export function Image() {

  return (
    <div className={getCls('container')}>
      
    </div>
  )
}