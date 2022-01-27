import React from 'react';
import { createClassNameFunc } from '../../util/name'

const NAME = 'header';
const getCls = createClassNameFunc(NAME);

export type TypeHeaderProps = {
  
}

export function Header(props: TypeHeaderProps) {

  return (
    <div className={getCls('container')}>
      Header
    </div>
  )
}