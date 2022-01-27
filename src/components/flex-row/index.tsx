import React, { useState, useRef, useEffect } from 'react';
import { createClassNameFunc } from '../../util/name';

const NAME = 'row';
const getCls = createClassNameFunc(NAME);

const defaultProps = {
  leftSize: 0.5
}

 

export type TypeRowProps = {
  left: React.ReactNode;
  right?: React.ReactNode;
  leftSize?: number;
}


export function Row(props: TypeRowProps) {
  const _props = {...defaultProps, ...props};
  
  return (
    <div className={getCls('container')} >
      <div>

      </div>
    </div>
  )
}


