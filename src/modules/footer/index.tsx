import React, { useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { Context } from '../../context';

const NAME = 'footer';
const getCls = createClassNameFunc(NAME);

export type TypeFooterProps = {
  
}

export const footerHeight = 30;

export function Footer(props: TypeFooterProps) {
  const { store } = useContext(Context);
  const { currentWebFile } = store;
  const pathName = currentWebFile.pathList.join('/');

  return (
    <div
      className={getCls('container')}
      style={{
        height: footerHeight,
      }}
    >
      <span>Path: </span>
      <span className={getCls('text')}>{pathName || '#'}</span>
    </div>
  )
}