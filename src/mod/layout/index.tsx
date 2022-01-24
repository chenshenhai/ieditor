import React, { useState, useRef } from 'react';
import { createClassNameFunc } from '../../util/name'

const NAME = 'layout';
const getCls = createClassNameFunc(NAME);

export type TypeLayoutProps = {
  left: React.ReactNode;
  right?: React.ReactNode;
  leftSize?: number;
}

const defaultProp: Partial<TypeLayoutProps> = {
  // 
}

function parsePercents(num?: number): string[] {
  let _num = 0.5;
  if (num && (num < 1 || num > 0)) {
    _num = num;
  } 
  const leftPercent = (_num * 100).toFixed(0);
  const rightPercent = (100 - _num).toFixed(0);
  return [
    `${leftPercent}%`,
    `${rightPercent}%`
  ]
}

export function Layout(props: TypeLayoutProps) {
  const { left, right } = {...defaultProp, ...props};
  const [leftSize, setLeftSize] = useState<number>(0.5);
  const refLayout: React.LegacyRef<HTMLDivElement> = useRef(null)
  const isDragging = useRef<boolean>(false);
  const prevDragPosition = useRef<number>(-1);

  const onDragStart = (e: any | MouseEvent) => {
    isDragging.current = true;
    prevDragPosition.current = e.pageX || 0;
  }

  const onDragEnd = (e: any | MouseEvent) => {
    isDragging.current = false;
    prevDragPosition.current = -1;
  }

  const onDragMove = (e: any | MouseEvent) => {
    if (isDragging.current !== true) {
      return;
    }
    if (!(e.pageX > 0 && prevDragPosition.current > 0)) {
      return;
    }
    const layoutWidth = refLayout?.current?.offsetWidth;
    if (!(layoutWidth && layoutWidth > 0)) {
      return
    }
    const movePosition = e.pageX - prevDragPosition.current;
    const newLeftSize = leftSize + (movePosition / layoutWidth);
    prevDragPosition.current = e.pageX;

    const leftWidth = newLeftSize * layoutWidth;
    if (leftWidth < 100 || (layoutWidth - leftSize) < 100) {
      return;
    }
    setLeftSize(newLeftSize);
  }


  return (
    <div className={getCls('container')}
      onMouseUp={onDragEnd}
      onMouseMove={onDragMove}
      onMouseLeave={onDragEnd}
      ref={refLayout}
    >
      <div className={getCls('left')} style={{width: parsePercents(leftSize)[0]}}>
        {left}
        {right && (
          <div onMouseDown={onDragStart} className={getCls('split')}></div>
        )}
      </div>
      {right && (
        <div className={getCls('right')} >
          {right}
        </div>)
      }
    </div>
  )
}