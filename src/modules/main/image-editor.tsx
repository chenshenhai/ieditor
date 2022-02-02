import React, { useContext } from 'react';
import { getCls } from './common';
import { Context } from '../../context';

export function ImageEditor() {

  const { store } = useContext(Context);
  const { currentWebFile } = store;
  let src = '';
  if (typeof currentWebFile.content === 'string' && currentWebFile.content) {
    src = currentWebFile.content;
  }

  return (
    <div className={getCls('image-editor')}>
      <img className={getCls('image')} src={src} />
    </div>
  )
}
