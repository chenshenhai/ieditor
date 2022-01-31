import React from 'react';
import classNames from 'classnames';
import { createClassNameFunc } from '../../util/name';

const NAME = 'flex-colums';
const getCls = createClassNameFunc(NAME);


export type TypeCloumItemProps = {
  key?: any,
  width?: number | string,
  className?: string,
  children?: React.ReactNode,
}

export function FlexColumItem (props: TypeCloumItemProps) {
  const { key, width, className } = props;
  const style: React.CSSProperties = {};
  if (width) {
    style.width = width;
    style.flex = 'none';
  }
  return (
    <div
      key={key}
      className={classNames(getCls('item'), className)}
      style={style}>
      {props.children}
    </div>
  )
}

export function FlexColums(props: any) {
  return (
    <div className={getCls('container')} >
      {props.children}
    </div>
  )
}


