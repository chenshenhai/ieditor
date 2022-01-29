import React from 'react';
import classNames from 'classnames';
import { createClassNameFunc } from '../../util/name';

const NAME = 'flex-colums';
const getCls = createClassNameFunc(NAME);


export type TypeColumsProps = {
  list: {
    slot: React.ReactNode,
    width?: number | string,
    className?: string,
  }[]
}

export function FlexColums(props: TypeColumsProps) {
  const { list } = props;
  return (
    <div className={getCls('container')} >
      {list.map((item, i) => {
        const { width, slot, className } = item;
        const style: React.CSSProperties = {};
        if (width) {
          style.width = width;
          style.flex = 'none';
        }
        return (
          <div
            key={i}
            className={classNames(getCls('item'), className)}
            style={style}>
            {slot}
          </div>
        )
      })}
    </div>
  )
}


