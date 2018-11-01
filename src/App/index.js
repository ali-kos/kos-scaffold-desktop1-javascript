import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import KOS from 'kos-core';
import Loader from '@/components/Loader';
import Pages from '@/pages';
import model from './model';
import styles from './index.less';
import { Header, Sider, Bread } from './layout';
import { siderMenus } from '../common/utils/Menus';

const { Content, Footer } = Layout;
@KOS.Wrapper({ model, autoReset: false })
class App extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object,
  };

  toggle() {
    const { dispatch } = this.props;
    dispatch({
      type: 'toggleCollapsed',
    });
  }

  render() {
    const { collapsed, location, isLogin } = this.props;
    /*
      对从menus文件引入的对象 进行处理
      将占位符部分都去掉
    */
    const handledRouters = siderMenus.map((_) => {
      _.route = _.route.replace(/\/:.*$/g, '');
      return _.route;
    });
    /*
      将处理完的routers对象进行遍历
      寻找 location.pathname 是否包含 routers的子元素(这样判断 由于有url params 存在)
      errPage 用于判断 是否渲染正常页面
  */
    const errPage = handledRouters.find(item =>
      location.pathname.includes(item));
    const headerProps = {
      toggle: () => this.toggle(),
      collapsed,
    };
    const siderProps = {
      collapsed,
      menu: siderMenus,
      location,
    };
    return (
      <div>
        {!isLogin ? (
          <Loader />
        ) : (
          <Layout className={styles.main}>
            <Sider {...siderProps} />
            <Layout>
              <Header {...headerProps} />
              <Content className={styles.content}>
                <Bread {...siderProps} />
                <div className={styles['content-wrapper']}>
                  {errPage ? <Pages /> : <span>404 访问页面不存在</span>}
                </div>
              </Content>
              <Footer className={styles.content}>
                KOS ©2018 Created by Choice Soft Ltd.
              </Footer>
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}

export default App;
