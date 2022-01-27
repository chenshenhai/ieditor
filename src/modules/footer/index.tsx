import React from 'react';
import { createClassNameFunc } from '../../util/name'

const NAME = 'footer';
const getCls = createClassNameFunc(NAME);

export type TypeFooterProps = {
  
}


export function Footer(props: TypeFooterProps) {

  return (
    <div className={getCls('container')}>
      Footer
    </div>
  )
}