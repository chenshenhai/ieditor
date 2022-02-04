import React from 'react';
import { createClassNameFunc } from '../../util/name';
import { IconMarkdown, IconSearch } from '../../components/ui';

const NAME = 'sidebar';
const getCls = createClassNameFunc(NAME);

export type TypeSideBarProps = {
  
}

const iconList: {
  icon: React.ReactNode,
}[] = [
  {
    icon: <IconMarkdown />,
  },
  {
    icon: <IconSearch />,
  }
]

export function SideBar(props: TypeSideBarProps) {
  return (
    <div className={getCls('container')}>
      {iconList.map((item, i) => {
        return (
          <div
            key={i}
            className={getCls('icon')}
          >{item.icon}</div>
        )
      })}
    </div>
  )
}