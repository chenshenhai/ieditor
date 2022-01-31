import React, { createContext, Dispatch, useReducer } from 'react';
import { TypeWebFile, createWebFile } from './util/web-file';

type TypeStore = {
  currentWebFile: TypeWebFile,
  webFileList: TypeWebFile | null,
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
    default:
      return prevStore;
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
    case 'reset':
      return {
        ...prevStore,
        ...payload,
      };
  }
}

export const Provider: React.FC = (props) => {
  // @ts-ignore
  const [store, dispatch] = useReducer(reducer, initStore);

  return (
    <Context.Provider value={{store, dispatch}}>
      {props.children}
    </Context.Provider>
  );
};
 