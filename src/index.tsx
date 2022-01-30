import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { createClassName, createClassNameFunc } from './util/name';
import { FlexRows } from './components/flex-rows';
import { Content } from './modules/content';
import { Header, headerHeight } from './modules/header';
import { Footer, footerHeight } from './modules/footer';
import { Context, TypeContextData } from './context';
import { eventHub } from './util/event';

const NAME = 'wrapper';

const getCls = createClassNameFunc(NAME);

export type TypeIEditorProps = {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  defaultValue?: string;
  fullScreen?: boolean;
}

function getStyle(props: TypeIEditorProps): React.CSSProperties {
  const { style, width, height, fullScreen } = props;
  let result: React.CSSProperties = {
    ...{},
    ...style,
    ...{ width, height }
  }
  if (fullScreen === true) {
    result = {
      ...result,
      ...{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999999999,
        width: '100%',
        height: '100%',
      }
    }
  }
  return result;
}

function IEditor(props: TypeIEditorProps) {

  const { className, defaultValue = '' } = props;
  const [currentWebFile, setCurrentWebFile] = useState<TypeContextData['currentWebFile']>(null);
  const [webFileList, setWebFileList] = useState<TypeContextData['webFileList']>(null);
  const [currentPathList, setCurrentPathList] = useState<TypeContextData['currentPathList']>([]);

  useEffect(() => {
    eventHub.on('setCurrentWebFile', (data) => {
      setCurrentWebFile(data);
    })
    eventHub.on('setWebFileList', (data) => {
      setWebFileList(data);
    })
    eventHub.on('setCurrentPathList', (data) => {
      setCurrentPathList(data);
    });
    eventHub.on('getCurrentWebFile', () => {
      return currentWebFile;
    })
    eventHub.on('getWebFileList', () => {
      return webFileList;
    })
    eventHub.on('getCurrentPathList', () => {
      return currentPathList;
    });
  }, [])

  return (
    <Context.Provider value={{
      currentWebFile, webFileList, currentPathList
    }}>
      <div
        className={classNames(
          createClassName(NAME), className
        )}
        style={getStyle(props)}
      >
        <FlexRows
          list={[
            {
              slot: (<Header />),
              height: headerHeight,
              className: getCls('header'),
            },
            {
              slot: (<Content defaultValue={defaultValue}/>)
            },
            {
              slot: (<Footer />),
              height: footerHeight,
              className: getCls('footer'),
            },
          ]}
        />
        
      </div>
    </Context.Provider>
  )
}

export default IEditor;