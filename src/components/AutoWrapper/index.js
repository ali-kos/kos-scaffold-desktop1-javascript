import React from 'react';
import KOS from 'kos-core';
import loadsh from 'lodash';
import { Switch, Route, withRouter } from 'react-router-dom';

import { siderMenus } from '../../common/utils/Menus';

const routeMenus = loadsh.cloneDeep(siderMenus);

const sortList = (a, b) => {
  const pathA = a.path;
  const pathB = b.path;
  if (pathA.indexOf(pathB) === 0) {
    return -1;
  } else if (pathB.indexOf(pathA) === 0) {
    return 1;
  }
  return -1;
};

const RouterWrapper = ({ router = {}, history = {} }) => {
  if (!(router instanceof Array)) {
    throw new Error('router config is expected a Array!');
  }
  if (router.length <= 0) {
    return '';
  }
  const sortRouter = router.sort(sortList);
  return (
    <Switch>
      {sortRouter.map((_) => {
        const { Component, path } = _;
        const currentRoute = loadsh.find(
          routeMenus,
          item => item.path === path,
        );
        const childPath = currentRoute.route.toLowerCase();
        return (
          <Route
            key={childPath}
            path={childPath}
            render={() => <Component history={history} namespacePath={path} />}
          />
        );
      })}
    </Switch>
  );
};
const AutoWrapper = ({ KOSconfig = {}, router = [] }) => (Component) => {
  const KosWrapper = KOS.Wrapper({
    namespace: Symbol('namespace'),
    ...KOSconfig,
  })(Component);
  const Cp = (props) => {
    const { namespacePath = '', history } = props;
    const Rt = <RouterWrapper history={history} router={router} />;
    // 判断是否使用KOS
    let viewNamespace;
    if (namespacePath.indexOf(':') >= 0) {
      viewNamespace = namespacePath.substr(0, namespacePath.indexOf(':') - 1);
    } else {
      viewNamespace = namespacePath;
    }
    if (KOSconfig.model) {
      const namespace =
        KOSconfig.model.namespace || KOSconfig.namespace || viewNamespace;
      return (
        <KosWrapper
          namespace={namespace}
          history={history}
          {...props}
          routers={Rt}
        />
      );
    }
    return <Component {...props} history={history} routers={Rt} />;
  };
  return withRouter(Cp);
};

module.exports = {
  AutoWrapper,
};
