// import React from 'react';
// import Button from '@mui/material/Button';
import Button from 'antd/es/button';
import ConfigProvider from 'antd/es/config-provider';
import Tree from 'antd/es/tree';
import message from 'antd/es/message';

import IconMarkdown from '@ant-design/icons/FileMarkdownOutlined'
import IconRight from '@ant-design/icons/RightOutlined';
import IconDown from '@ant-design/icons/DownOutlined';
import IconFolderOpen from '@ant-design/icons/FolderOpenOutlined';
import IconWarning from '@ant-design/icons/WarningOutlined';
import IconSearch from '@ant-design/icons/SearchOutlined';

import { UI_PREFIX } from '../../config';

message.config({
  prefixCls: `${UI_PREFIX}-message`,
})

export {
  Button,
  ConfigProvider,
  Tree,
  message,

  IconDown,
  IconRight,
  IconWarning,
  IconFolderOpen,
  IconMarkdown,
  IconSearch,
}