import React from 'react';
import { Layout } from 'antd';
import Menu from './Menu';
import styles from './sider.less';

const Sider = ({ collapsed, ...props }) => (
  <Layout.Sider
    className={styles.sider}
    trigger={null}
    collapsible
    collapsed={collapsed}
  >
    <div className="logo" />
    <Menu {...props} />
  </Layout.Sider>
);

export default Sider;
