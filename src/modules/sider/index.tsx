import React, { useContext } from 'react';
import { createClassNameFunc } from '../../util/name';
import { FlexColums, FlexColumItem } from '../../components/flex-colums';
import { Button, Tree } from '../../components/ui';
import { SideBar } from '../sidebar';
import { eventHub } from '../../util/event';
import { IconFolderOpen } from '../../components/ui';
import { TypeWebFile, initWebFile } from '../../util/web-file';
import { Context } from '../../context';

const NAME = 'sider';
const getCls = createClassNameFunc(NAME);

export type TypeSiderProps = {
  
}


export function FileTree(props: { webFileList: TypeWebFile | null }) {
  const { webFileList } = props;
  const { store, dispatch } = useContext(Context);
  function _parseData(file: TypeWebFile | null) {
    if (file) {
      const data: any = {
        title: file.name,
        key: file.id,
        webFile: file,
      };
      if (Array.isArray(file.children)) {
        data.children = [];
        file.children.forEach((item) => {
          data.children.push(_parseData(item))
        })
      }
      return data;
    } else {
      return null
    }
  }
  const data: any = _parseData(webFileList);

  const onSelect = async (selectedKeys: any[], info: any) => {
    console.log('info =', info.node.webFile);
    let webFile = info?.node?.webFile as TypeWebFile;
    if (webFile.type === 'file') {
      webFile = await initWebFile(webFile);
      store.currentWebFile = webFile;
      dispatch({
        type: 'updateCurrentWebFile',
        payload: store,
      });
      if (typeof webFile.content === 'string') {
        eventHub.trigger('setEditValue', webFile.content);
      }
    }
  }

  return (<Tree
    onSelect={onSelect}
    treeData={[data]}
  />)
}

export function FileMenu(props: {
  webFileList: TypeWebFile | null,
  tempWebFileList: TypeWebFile | null,
}) {
  const { webFileList, tempWebFileList } = props;
  return (
    <div className={getCls('file-menu')}>
      <div className={getCls('file-menu-item')}>
        <FileTree webFileList={webFileList} />
      </div>
      <div className={getCls('file-menu-item')}>
        <FileTree webFileList={tempWebFileList} />
      </div>
    </div>
  )
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
          <FileMenu
            webFileList={store.webFileList}
            tempWebFileList={store.tempWebFileList}
          />
        ) : (
          <div className={getCls('open-groups')} >
            <div className={getCls('empty-icon')}>
              <IconFolderOpen />
            </div>
            <div className={getCls('open-item')} >
              <Button className={getCls('open-btn')}
                onClick={() => {
                  eventHub.trigger('newFile', undefined);
                }}
              >New File</Button>
            </div>
            <div className={getCls('open-item')} >
              <Button className={getCls('open-btn')}
                onClick={() => {
                  eventHub.trigger('openFile', undefined);
                }}
              >Open File</Button>
            </div>
            <div className={getCls('open-item')} >
              <Button className={getCls('open-btn')}
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