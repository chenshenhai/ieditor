import React, { createContext, Dispatch, useReducer } from 'react';
import { TypeWebFile, createWebFile, createTempWebFileList, } from './util/web-file';

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
}

export const Provider = (props: TypeProviderProps) => {
  const { children, defaultValue } = props;
  if (typeof defaultValue === 'string' && defaultValue) {
    initStore.currentWebFile.content = defaultValue;
  }

  // @ts-ignore
  const [store, dispatch] = useReducer(reducer, initStore);

  return (
    <Context.Provider value={{store, dispatch}}>
      {children}
    </Context.Provider>
  );
};
 