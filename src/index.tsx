import React from 'react';
import classNames from 'classnames';
import { createClassName, createClassNameFunc } from './util/name';
import { FlexRows, FlexRowItem } from './components/flex-rows';
import { Content } from './modules/content';
import { Header, headerHeight } from './modules/header';
import { Footer, footerHeight } from './modules/footer';
import { Provider } from './context';
import { ConfigProvider } from './components/ui';
import { UI_PREFIX, DEFAULT_ZINDEX, UI_WRAPPER_CLASSNAME } from './config';

const NAME = 'wrapper';

const getCls = createClassNameFunc(NAME);

export type TypeIEditorProps = {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  defaultValue?: string;
  defaultName?: string;
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
        zIndex: DEFAULT_ZINDEX,
        width: '100%',
        height: '100%',
      }
    }
  }
  return result;
}

function IEditor(props: TypeIEditorProps) {

  const { className, defaultValue, defaultName } = props;

  return (
    <ConfigProvider prefixCls={UI_PREFIX}>
      <Provider defaultValue={defaultValue} defaultName={defaultName} >
        <div
          className={classNames(
            createClassName(NAME), className, UI_WRAPPER_CLASSNAME
          )}
          style={getStyle(props)}
        >
          <FlexRows>
            <FlexRowItem height={headerHeight} className={getCls('header')}>
              <Header />
            </FlexRowItem>
            <FlexRowItem>
              <Content defaultValue={defaultValue} />
            </FlexRowItem>
            <FlexRowItem height={footerHeight} className={getCls('footer')}>
              <Footer />
            </FlexRowItem>
          </FlexRows>
        </div>
      </Provider>
    </ConfigProvider>
  )
}

export default IEditor;