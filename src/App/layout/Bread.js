import React from 'react';
import loadsh from 'lodash';
import { Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Bread = ({ menu, location }) => {
  // 默认展开菜单
  /*
    siderMenus 是由上级传过来的 故已经是处理好route的数组
    进行比较 返回当前选中的路由元素
  */
  const breadMenus = loadsh.cloneDeep(menu);
  breadMenus.forEach((item) => {
    if (item.path.indexOf(':') >= 0) {
      item.path = item.path.substr(0, item.path.indexOf(':') - 1);
    }
    if (!item.name) {
      item.name = item.path;
    }
  });

  const activeItem = breadMenus.find(item =>
    location.pathname.includes(item.route));
  // const activeItem = menu.find(_ => _.route === location.pathname);
  function getBreadArray(item, array, path, mpid) {
    const arr = [];
    if (!item[mpid]) return arr;

    function getBreadParent(item1) {
      const item2 = array.find(_ => item1[mpid] === _[path]);
      arr.push(item2);
      if (item2 && item2[mpid]) {
        getBreadParent(item2);
      }
    }

    getBreadParent(item);
    return arr;
  }
  let breadArray = [];
  if (activeItem) {
    breadArray = getBreadArray(
      activeItem,
      breadMenus,
      'path',
      'mpid',
    ).reverse();
  }

  const BreadcrumbItem = props => (
    <Breadcrumb.Item key={props.route}>
      <Link to={props.route} replace>
        <Icon type={props.icon} /> {props.name}
      </Link>
    </Breadcrumb.Item>
  );
  return (
    <div>
      {activeItem ? (
        <Breadcrumb>
          {breadArray.map(_ => BreadcrumbItem(_))}
          <Breadcrumb.Item>
            <Icon type={activeItem.icon} /> {activeItem.name}
          </Breadcrumb.Item>
        </Breadcrumb>
      ) : (
        <Breadcrumb>
          <Breadcrumb.Item>404</Breadcrumb.Item>
        </Breadcrumb>
      )}
    </div>
  );
};

export default Bread;
