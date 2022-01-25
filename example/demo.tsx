import React from 'react';
import ReactDOM from 'react-dom';
import IEditor from '../src/';
import '../src/css/index';

const value = `
# H1 Title

## H2 Title

### H3 Title

- List 
  - Item 1
  - Item 2
    - Item 3
    - Item 4
      - Item 5
`;

ReactDOM.render(
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  }}>
    <IEditor width={800} height={400} defaultValue={value}/>
  </div>,
  document.querySelector('#app')
)

