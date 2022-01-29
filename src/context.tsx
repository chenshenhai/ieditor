import { createContext } from 'react';
import { TypeStore } from './util/store';


export type TypeContextData = TypeStore & {
  
};

export const Context = createContext<TypeContextData>({
  currentWebFile: null,
  currentPathList: [],
  webFileList: null,
});