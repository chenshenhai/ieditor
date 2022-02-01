import React from 'react';
import { createClassNameFunc } from '../../util/name'

const NAME = 'footer';
const getCls = createClassNameFunc(NAME);

export type TypeFooterProps = {
  
}

export const footerHeight = 30;

export function Footer(props: TypeFooterProps) {
  return (
    <div
      className={getCls('container')}
      style={{
        height: footerHeight,
      }}
    >
      Footer
    </div>
  )
}