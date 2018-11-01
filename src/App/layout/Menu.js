import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import lodash from 'lodash';

import { siderMenus } from '../../common/utils/Menus';

const { Item, SubMenu } = Menu;

const Menus = ({ location }) => {
  // 过滤权限
  const visitMenu = lodash.cloneDeep(siderMenus);
  const illegalKey = 'mpid';
  visitMenu.forEach((item) => {
    if (item[illegalKey] && item[illegalKey].substr(0, 1) === '/') {
      item[illegalKey] = item[illegalKey].replace('/', '');
    }
    if (item.path.indexOf('/') >= 0) {
      item.path = item.path.replace('/', '');
    }
    if (item.route.indexOf(':') >= 0) {
      item.route = item.route.substr(0, item.route.indexOf(':') - 1);
    }
  });
  // 生成menu树状结构
  const menuTree = [];
  for (let i = 0; i < visitMenu.length; i += 1) {
    const item = visitMenu[i];
    if (!item.mpid && item.name) {
      menuTree.push(item);
    }
    const children = [];
    for (let j = 0; j < visitMenu.length; j += 1) {
      const item1 = visitMenu[j];
      if (item1.mpid === item.path && item1.name) {
        children.push(item1);
      }
    }
    if (children.length > 0) item.children = children;
  }

  const MenuList = (menus) => {
    const list = [];
    for (const item of menus) {
      if (!item.mh) {
        if (item.children && item.children.length > 0) {
          list.push(<SubMenu
            key={item.route}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
              }
          >
            {MenuList(item.children)}
          </SubMenu>);
        } else {
          list.push(<Item key={item.route}>
            <Link to={item.route} replace>
              <Icon type={item.icon} />
              <span className="nav-text">{item.name}</span>
            </Link>
          </Item>);
        }
      }
    }
    return list;
  };
  // 默认展开菜单
  const activeItem = siderMenus.find(_ => _.route === location.pathname);

  function getOpenArray(item, array, id, mpid) {
    const arr = [];
    if (!item[mpid]) return arr;

    function getOpenParent(item1) {
      const item2 = array.find(_ => item1[mpid] === _.path);
      arr.push(item2.route);
      if (item2 && item2[mpid]) getOpenParent(item2);
    }

    getOpenParent(item);
    return arr;
  }

  let defaultOpenKeys = [];
  if (activeItem) {
    defaultOpenKeys = getOpenArray(activeItem, siderMenus, 'id', 'mpid');
  }
  /*
    处理 menu组件的 selectedKeys
    由于存在url 带 params的情况 故对菜单进行处理 将route中占位符部分你都去掉
  */
  let selectedKey = [];
  const handleSelectedKeys = () => {
    const handledSelected = visitMenu.map((item) => {
      item.route = item.route.replace(/\/:.*$/g, '');
      return item.route;
    });
    selectedKey = handledSelected.find(_ => location.pathname.includes(_));
    return handledSelected;
  };
  handleSelectedKeys();
  const menuProps = {
    defaultOpenKeys,
    selectedKeys: [selectedKey],
    defaultSelectedKeys: [location.pathname],
  };
  return (
    <Menu theme="dark" mode="inline" {...menuProps}>
      {MenuList(menuTree)}
    </Menu>
  );
};

export default Menus;
