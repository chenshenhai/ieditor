import React from 'react';
import classNames from 'classnames';
import { createClassNameFunc } from '../../util/name';

const NAME = 'flex-rows';
const getCls = createClassNameFunc(NAME);


export type TypeRowItemProps = {
  key?: any,
  height?: number | string,
  className?: string,
  children?: React.ReactNode,
}


export type TypeRowsProps = {
  children?: React.ReactNode,
}

export function FlexRowItem(props: TypeRowItemProps) {
  const { height, className, key, children } = props;
    const style: React.CSSProperties = {};
    if (height) {
      style.height = height;
      style.flex = 'none';
    }
  return (
    <div
      key={key}
      className={classNames(getCls('item'), className)}
      style={style}>
      {children}
    </div>
  )
}

export function FlexRows(props: TypeRowsProps) {
  const { children } = props;
  return (
    <div className={getCls('container')} >
      {children}
    </div>
  )
}


