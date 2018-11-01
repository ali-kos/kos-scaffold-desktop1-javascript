import React from 'react';
import PropTypes from 'prop-types';
import { AutoWrapper } from '@/components/AutoWrapper';
import Loader from '@/components/Loader';
import model from './model';
import router from './router';

const { func } = PropTypes;

@AutoWrapper({ KOSconfig: { model }, router })
class Index extends React.Component {
  static propTypes = {
    dispatch: func,
  };

  updateName(name) {
    this.props.dispatch({
      type: 'login',
      payload: {
        name,
      },
    });
  }

  render() {
    return (
      <div className="header" style={{ position: 'relative' }}>
        <div>{this.props.routers}</div>
        <Loader spinning={this.props.login_loading} fullScreen={false} />
      </div>
    );
  }
}

export default Index;
