import React from 'react';
import { Layout, Icon } from 'antd';
import styles from './header.less';

const Header = ({ toggle, collapsed }) => (
  <Layout.Header className={styles.header}>
    <Icon
      className={styles.trigger}
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={toggle}
    />
  </Layout.Header>
);

export default Header;
