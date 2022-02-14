import React from 'react';
import ReactDOM from 'react-dom';
import IEditor from '../src/';
import { imageMarkdownBase64, imageNodejsBase64 } from './assets';

import '../src/index.less';

const value = `
# Hello iEditor

> A online editor of markdown based on [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

![md](${imageMarkdownBase64})

## Dependent Technology

- Environment
  - Node.js
  - Chrome Browser
- Source
  - React
  - Ant Design

![nodejs](${imageNodejsBase64})


![react](https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg)

## File System

The file system is based on [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

## Markdown Syntax

### Headings

Add number signs(#) in front of a word or phrase.

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

### Paragraphs

Use a blank line to seperate one or more lines of text.

### Emphasis

#### Bold

Add two asterisks or underscores before and after a word or phrase.

This is  **Bold Text** by asterisks.

This is  __Bold Text__ by underscores.

#### Italic

Add one asterisk or underscore before and after a word or phrase

This is  *Italic Text*  by asterisks.

This is  _Italic Text_  by underscore.

### Blockquotes

Add a > in front of a paragraph.

> This is Blockquotes Paragraph
>
> > This is Blockquotes Paragraph

### Lists


#### Order Lists

Add line items with numbers followed by periods.

1. Item 001
1. Item 002
1. Item 003
1. Item 004
1. Item 005

<br>

1. Item 001
2. Item 002
3. Item 003
4. Item 004
5. Item 005

#### Unordered Lists

Add dashes (-), asterisks (*), or plus signs (+) in front of line items.

##### Unordered Lists By Dashes

- Item 001 by dashes
  - Item 002 by dashes
  - Item 003 by dashes
- Item 004 by dashes
  - Item 005 by dashes
  - Item 006 by dashes

##### Unordered Lists By Asterisks

* Item 001 by asterisks
  * Item 002 by asterisks
  * Item 003 by asterisks
* Item 004 by asterisks
  * Item 005 by asterisks
  * Item 006 by asterisks


##### Unordered Lists By Signs

+ Item 001 by signs
  + Item 002 by signs
  + Item 003 by signs
+ Item 004 by signs
  + Item 005 by signs
  + Item 006 by signs

### Links

Enclose the link text in brackets (e.g., [Hello World]) and then follow it immediately with the URL in parentheses (e.g., (https://github.com)).

This is  [Github Link](https://github.com)


#### Add Links Title

This is  [Github Link](https://github.com "Hello GitHub")


### Images

Add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title in quotation marks after the path or URL.

![Hello Gitee](https://gitee.com/static/images/logo-black.svg?t=158106664)

### Escaping Characters

To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (\) in front of the character.

\*Hello\*
  
### Tables

Use three or more hyphens (---) to create each column's header, and use pipes (|) to separate each column.

| Header | Header |
|  ----  |  ----  |
|  Cell  |  Cell  |
|  Cell  |  Cell  |


### Code

#### Escaping Backticks

Enclosing the code in double backticks (\`\`).

\`React\`, \`React-DOM\`


#### Code Blocks

Indent every line of the block by at least four spaces or one tab.

\`\`\`js
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (<div>Hello World!</div>)
}

ReactDOM.render(<App />, document.querySelector('#app'))
\`\`\`


### HTML

Place the tags in the text of your Markdown-formatted file.

 Hello <span style="color:red; font-weight:bolder;">World</span>


`;

ReactDOM.render(
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
  }}>
    {/* <IEditor width={800} height={400} defaultValue={value}/> */}
    <IEditor
      width={800} height={400}
      fullScreen
      defaultValue={value}
      defaultName={'HelloWorld.md'}
    />
  </div>,
  document.querySelector('#app')
)

