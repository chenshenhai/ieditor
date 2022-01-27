import React from 'react';
import ReactDOM from 'react-dom';
import IEditor from '../src/';
import '../src/index.less';

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
      - Item 6
      - Item 7
        - Item 8
        - Item 9
          - Item 10
          - Item 11
            - Item 12
            - Item 13
              - Item 14
              - Item 15
                - Item 16
                - Item 17
                  - Item 18
                  - Item 19
                    - Item 20
                    - Item 21
- List 
  - Item 1
  - Item 2
    - Item 3
    - Item 4
      - Item 5
      - Item 6
      - Item 7
`;

ReactDOM.render(
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
  }}>
    {/* <IEditor width={800} height={400} defaultValue={value}/> */}
    <IEditor width={800} height={400} fullScreen defaultValue={value}/>
  </div>,
  document.querySelector('#app')
)

