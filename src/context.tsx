import React, { createContext, Dispatch, useRef, useReducer } from 'react';
import { TypeWebFile, createWebFile, createTempWebFileList,  } from './util/web-file';
import { transfromImageMapToTempFileList } from './util/web-image-file';
import { generateEditMarkdown } from './util/markdown/parse';

type TypeStore = {
  currentWebFile: TypeWebFile,
  webFileList: TypeWebFile | null,
  tempWebFileList: TypeWebFile | null,
}

type TypeContext = {
  store: TypeStore;
  dispatch: Dispatch<{
    type: string;
    payload?: Partial<TypeStore>;
  }>;
}

const initStore: TypeStore = {
  currentWebFile: createWebFile(),
  webFileList: null,
  tempWebFileList: createTempWebFileList(),
}

export const Context = createContext<TypeContext>({
  store: initStore,
  dispatch: () => {},
});

const reducer = (prevStore: TypeStore,
  action: {
    type: string;
    payload?: Partial<TypeStore>;
  }
) => {
  const { type, payload } = action;
  switch(type) {
    case 'updateCurrentWebFile':
      return {
        ...prevStore,
        currentWebFile: payload?.currentWebFile,
      };
    case 'updateWebFileList':
      return {
        ...prevStore,
        webFileList: payload?.webFileList,
      };
    case 'updateTempWebFileList':
      return {
        ...prevStore,
        tempWebFileList: payload?.tempWebFileList,
      };
    case 'reset':
      return {
        ...prevStore,
        ...payload,
      };
    default:
      return prevStore;
  }
}


export type TypeProviderProps = {
  children?: React.ReactNode,
  defaultValue?: string;
  defaultName?: string;
}

export const Provider = (props: TypeProviderProps) => {
  const { children, defaultValue, defaultName } = props;
  const refInited = useRef<boolean>(false);

  if (refInited.current !== true) {
    if (typeof defaultValue === 'string' && defaultValue) {
      const { markdown, imageMap } = generateEditMarkdown(defaultValue);
      const imageFileList = transfromImageMapToTempFileList(imageMap);
      initStore.currentWebFile.content = markdown;
      initStore.currentWebFile.name = defaultName || 'Post.md';
      initStore.webFileList = initStore.currentWebFile;
      imageFileList.forEach((file: TypeWebFile) => {
        initStore.tempWebFileList?.children?.push(file);
      });
    }
    refInited.current = true;
  }
  

  // @ts-ignore
  const [store, dispatch] = useReducer(reducer, initStore);

  return (
    <Context.Provider value={{store, dispatch}}>
      {children}
    </Context.Provider>
  );
};
 