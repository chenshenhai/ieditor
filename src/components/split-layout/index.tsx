import React, { useState, useRef, useEffect } from 'react';
import { createClassNameFunc } from '../../util/name';

const NAME = 'split-layout';
const getCls = createClassNameFunc(NAME);

const defaultProps = {
  leftSize: 0.5
}

function parsePercents(num?: number): string[] {
  let _num = 0.5;
  if (num && (num < 1 || num > 0)) {
    _num = num;
  } 
  const leftPercent = (_num * 100).toFixed(0);
  const rightPercent = (100 - _num * 100).toFixed(0);
  return [
    `${leftPercent}%`,
    `${rightPercent}%`
  ]
}

export type TypeSplitLayoutProps = {
  left: React.ReactNode;
  right?: React.ReactNode;
  leftSize?: number;
}


export function SplitLayout(props: TypeSplitLayoutProps) {
  const _props = {...defaultProps, ...props};
  const { left, right } = _props;
  const [leftSize, setLeftSize] = useState<number>(_props.leftSize);
  const refSplitLayout: React.LegacyRef<HTMLDivElement> = useRef(null)
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
    const layoutWidth = refSplitLayout?.current?.offsetWidth;
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

  useEffect(() => {
    window.addEventListener('message', (data) => {
      console.log('data =', data);
    })
  }, []);

  return (
    <div className={getCls('container')}
      onMouseUp={onDragEnd}
      onMouseMove={onDragMove}
      onMouseLeave={onDragEnd}
      ref={refSplitLayout}
    >
      <div className={getCls('left')} style={{width: parsePercents(leftSize)[0]}}>
        {left}
        {right && (
          <div
            className={getCls('split')}
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onDragOver={onDragEnd}
            onDragStart={(e) => {
              e.preventDefault();
            }}
          >
            <div className={getCls('split-line')}></div>
          </div>
        )}
      </div>
      {right && (
        <div className={getCls('right')} style={{width: parsePercents(leftSize)[1]}}>
          {right}
        </div>)
      }
    </div>
  )
}


