import React, { useState } from 'react';
import { createClassNameFunc } from '../../util/name';
import { FlexColums } from '../../components/flex-colums';
import { SideBar } from '../sidebar';
import {
  TreeView, ExpandMoreIcon, ChevronRightIcon, TreeItem
} from '../../components/ui';
import { eventHub } from '../../util/event';
import { TypeWebFile, initWebFile } from '../../util/web-file';

const NAME = 'sider';
const getCls = createClassNameFunc(NAME);

export type TypeSiderProps = {
  
}

 
function renderTree(webFile: TypeWebFile) {

  const onClick = async () => {
    webFile = await initWebFile(webFile);
    eventHub.trigger('setCurrentWebFile', webFile)
  }

  return (
  <TreeItem
    key={webFile.id} nodeId={webFile.id} label={webFile.name}
    onClick={onClick}
  >
    {Array.isArray(webFile.children)
      ? webFile.children.map((node: any) => {
        return renderTree(node)
      }) : null}
  </TreeItem>)
  
};

function RichObjectTreeView() {
  const [webFileList, setWebFileList] = useState<TypeWebFile|null>(null);
  eventHub.on('setWebFileList', (webFileList) => {
    setWebFileList(webFileList);
  })
  return (
    <>
      {webFileList ? (
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
          {renderTree(webFileList)}
        </TreeView>
      ) : (
        <div>No Data</div>
      )}
    </>
  );
}


export function Sider(props: TypeSiderProps) {

  return (
    <div className={getCls('container')}>
      <FlexColums list={[
        {
          slot: (<SideBar />),
          width: 40,
        },
        {
          slot: (<RichObjectTreeView />),
          className: getCls('file-tree')
        }
      ]} />
      
    </div>
  )
}