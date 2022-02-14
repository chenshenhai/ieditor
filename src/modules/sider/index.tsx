import React, { useContext, useState } from 'react';
import { createClassNameFunc } from '../../util/name';
import { FlexColums, FlexColumItem } from '../../components/flex-colums';
import { Button, Tree, message } from '../../components/ui';
import { SideBar } from '../sidebar';
import { eventHub } from '../../util/event';
import { IconFolderOpen } from '../../components/ui';
import { TypeWebFile, initWebFile } from '../../util/web-file';
import { Context } from '../../context';

const { DirectoryTree } = Tree;


const NAME = 'sider';
const getCls = createClassNameFunc(NAME);

export type TypeSiderProps = {
  
}


export function FileTreeList(props: { webFileLists: TypeWebFile[] }) {
  const { webFileLists } = props;
  const { store, dispatch } = useContext(Context);
  const [ selectedKeys, setSelectedKeys ] = useState<string[]>([]);

  function _parseData(file: TypeWebFile | null) {
    if (file) {
      const data: any = {
        title: file.name,
        key: file.id,
        isLeaf: file.type === 'file',
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
  
  const onSelect = async (selectedKeys: any[], info: {
    event: 'select';
    selected: boolean;
    node: any;
    selectedNodes: any[];
    nativeEvent: MouseEvent;
}) => {
    const { node } = info || {};
    let webFile = node?.webFile as TypeWebFile;

    if (webFile.id && typeof webFile.id === 'string') {
      if (webFile.type === 'file') {
        setSelectedKeys([webFile.id])
      } else if (webFile.type === 'directory') {
        // TODO
        console.log('directory')
      }
    }

    const modifyCount = eventHub.trigger('getModifyCount', undefined)?.[0];
    if (modifyCount && modifyCount > 1) {
      message.warn('Your changes will be lost if you don\'t save them.', 2)
      return;
    }

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
  
  return (
    <div className={getCls('file-menu')}>
      {webFileLists.map((webFileList, key) => {
        const data: any = _parseData(webFileList);
        const defaultExpandedKeys = [];
        if (webFileList && webFileList.id) {
          defaultExpandedKeys.push(webFileList.id)
        }
        
        return (<div className={getCls('file-menu-item')} key={key}>
          <DirectoryTree
            multiple
            style={{width: '100%'}}
            onSelect={onSelect}
            treeData={[data]}
            selectedKeys={selectedKeys}
            defaultExpandedKeys={defaultExpandedKeys}
          />
        </div>)
      })}
    </div>
  );
}

export function FileMenu(props: {
  webFileList: TypeWebFile | null,
  tempWebFileList: TypeWebFile | null,
}) {
  const { webFileList, tempWebFileList } = props;
  const webFileLists: TypeWebFile[] = [];
  if (webFileList) {
    webFileLists.push(webFileList)
  }
  if (tempWebFileList) {
    webFileLists.push(tempWebFileList)
  }
  return (
    <FileTreeList webFileLists={webFileLists} />
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