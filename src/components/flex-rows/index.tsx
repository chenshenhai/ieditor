import React from 'react';
import { createClassNameFunc } from '../../util/name';

const NAME = 'flex-rows';
const getCls = createClassNameFunc(NAME);


export type TypeRowProps = {
  list: {
    slot: React.ReactNode,
    height?: number | string,
  }[]
}


export function FlexRows(props: TypeRowProps) {
  const { list } = props;
  return (
    <div className={getCls('container')} >
      {list.map((item, i) => {
        const { height, slot } = item;
        const style: React.CSSProperties = {};
        if (height) {
          style.height = height;
          style.flex = 'none';
        }
        return (
          <div key={i} className={getCls('item')} style={style}>
            {slot}
          </div>
        )
      })}
    </div>
  )
}


