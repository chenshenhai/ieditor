import React from 'react';
import { getCls } from './common';
import { IconWarning } from '../../components/ui';

export function Unsupported() {
  return (
    <div className={getCls('unsupported')}>
      <div className={getCls('unsupported-logo')}>
        <IconWarning fontSize='inherit' />
      </div>
      <div className={getCls('unsupported-text')}>
        <span>File not supported</span>
      </div>
    </div>
  )
}
