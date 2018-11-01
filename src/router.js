import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '@/app';
import Login from '@/app/Login';

// 路由配置
class RouteMap extends React.PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={App} />
          <Route render={() => <span>404</span>} />
        </Switch>
      </Router>
    );
  }
}

export default RouteMap;
