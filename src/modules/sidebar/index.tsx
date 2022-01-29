import React from 'react';
import { createClassNameFunc } from '../../util/name';
const NAME = 'sidebar';
const getCls = createClassNameFunc(NAME);

export type TypeSideBarProps = {
  
}


export function SideBar(props: TypeSideBarProps) {
  return (
    <div className={getCls('container')}>
      Side Bar
    </div>
  )
}