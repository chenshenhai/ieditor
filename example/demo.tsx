import React from 'react';
import ReactDOM from 'react-dom';
import IEditor from '../src/';
import '../src/css/index';

ReactDOM.render(
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  }}>
    <IEditor width={800} height={400}/>
  </div>,
  document.querySelector('#app')
)

