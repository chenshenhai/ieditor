import React, { useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { FlexColums } from '../../components/flex-colums';
import { SideBar } from '../sidebar';
import { Context } from '../../context';
import {
  TreeView, ExpandMoreIcon, ChevronRightIcon, TreeItem
} from '../../components/ui';

const NAME = 'sider';
const getCls = createClassNameFunc(NAME);

export type TypeSiderProps = {
  
}

 
function renderTree(nodes: any) {

  const onClick = () => {
    console.log('nodes ===', nodes);
  }

  return (
  <TreeItem
    key={nodes.id} nodeId={nodes.id} label={nodes.name}
    onClick={onClick}
  >
    {Array.isArray(nodes.children)
      ? nodes.children.map((node: any) => {
        return renderTree(node)
      }) : null}
  </TreeItem>)
  
};

function RichObjectTreeView() {
  const { webFileList } = useContext(Context);

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