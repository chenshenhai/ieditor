import React, { useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { FlexColums, FlexColumItem } from '../../components/flex-colums';
import { Button } from '../../components/ui';
import { SideBar } from '../sidebar';
import { eventHub } from '../../util/event';
import {
  TreeView, ExpandMoreIcon, ChevronRightIcon, FolderOpen, TreeItem
} from '../../components/ui';
import { TypeWebFile, initWebFile } from '../../util/web-file';
import { Context } from '../../context';

const NAME = 'sider';
const getCls = createClassNameFunc(NAME);

export type TypeSiderProps = {
  
}

 
function renderTree(webFile: TypeWebFile, clickCallback: (webFile: TypeWebFile) => void) {
  // const { store, dispatch } = useContext(Context);
  const onClick = async () => {
    clickCallback(webFile);
  }

  return (
  <TreeItem
    key={webFile.id} nodeId={webFile.id} label={webFile.name}
    onClick={onClick}
  >
    {Array.isArray(webFile.children)
      ? webFile.children.map((node: any) => {
        return renderTree(node, clickCallback)
      }) : null}
  </TreeItem>)
  
};

function RichObjectTreeView(props: { webFileList: TypeWebFile | null }) {
  const { store, dispatch } = useContext(Context);
  const { webFileList } = props;
  const clickCallback = async (webFile: TypeWebFile) => {
    webFile = await initWebFile(webFile);
    store.currentWebFile = webFile;
    dispatch({
      type: 'updateCurrentWebFile',
      payload: store,
    })
  }
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
          {renderTree(webFileList, clickCallback)}
        </TreeView>
      ) : (
        <div>No Data</div>
      )}
    </>
  );
}


export function Sider(props: TypeSiderProps) {
  const { store } = useContext(Context);

  return (
    <div className={getCls('container')}>
      <FlexColums>
        <FlexColumItem width={40}>
          <SideBar />
        </FlexColumItem>
        <FlexColumItem className={getCls('file-tree')}>
        {store.webFileList ? (
          <RichObjectTreeView webFileList={store.webFileList} />
        ) : (
          <div className={getCls('open-groups')} >
            <div className={getCls('empty-icon')}>
              <FolderOpen fontSize='inherit' />
            </div>
            <div className={getCls('open-item')} >
              <Button variant="outlined" disableRipple className={getCls('open-btn')}
                onClick={() => {
                  eventHub.trigger('openFile', undefined);
                }}
              >Open File</Button>
            </div>
            <div className={getCls('open-item')} >
              <Button variant="outlined" disableRipple className={getCls('open-btn')}
                onClick={() => {
                  eventHub.trigger('openFolder', undefined);
                }}
              >Open Folder</Button>
            </div>
          </div>
        )}
        </FlexColumItem>
      </FlexColums>
    </div>
  )
}