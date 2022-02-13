import React from 'react';
import { SplitLayout } from '../../components/split-layout';
import { Sider } from '../sider'; 
import { Main } from '../main';

export type TypeIEditorProps = {
  defaultValue?: string;
}

export function Content(props: TypeIEditorProps) {
  const { defaultValue } = props;
  return (
    <SplitLayout 
      left={<Sider />}
      leftSize={0.14}
      right={
        <Main defaultValue={defaultValue}/>
      }
    />
  )
}

 