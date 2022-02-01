import React from 'react';
import { createClassNameFunc } from '../../util/name';
import IconFile from '@mui/icons-material/InsertDriveFileOutlined';
import IconSearch from '@mui/icons-material/FindInPageOutlined';

const NAME = 'sidebar';
const getCls = createClassNameFunc(NAME);

export type TypeSideBarProps = {
  
}

const iconList: {
  icon: React.ReactNode,
}[] = [
  {
    icon: <IconFile />,
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