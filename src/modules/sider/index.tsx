import React, { useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { FlexColums, FlexColumItem } from '../../components/flex-colums';
import { SideBar } from '../sidebar';
import {
  TreeView, ExpandMoreIcon, ChevronRightIcon, TreeItem
} from '../../components/ui';
import { TypeWebFile, initWebFile } from '../../util/web-file';
import { Context } from '../../context';

const NAME = 'sider';
const getCls = createClassNameFunc(NAME);

export type TypeSiderProps = {
  
}

 
function renderTree(webFile: TypeWebFile) {
  const { store, dispatch } = useContext(Context);
  const onClick = async () => {
    webFile = await initWebFile(webFile);
    store.currentWebFile = webFile;
    dispatch({
      type: 'updateCurrentWebFile',
      payload: store,
    })
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

function RichObjectTreeView(props: { webFileList: TypeWebFile | null }) {
  const { webFileList } = props;
  console.log('re-render RichObjectTreeView ...')
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
  const { store } = useContext(Context);
  console.log('re-render Sider... ') 

  return (
    <div className={getCls('container')}>
      <FlexColums>
        <FlexColumItem width={40}>
          <SideBar />
        </FlexColumItem>
        <FlexColumItem className={getCls('file-tree')}>
          <RichObjectTreeView webFileList={store.webFileList} />
        </FlexColumItem>
      </FlexColums>
    </div>
  )
}