import React from 'react';
import PropTypes from 'prop-types';
import { AutoWrapper } from '@/components/AutoWrapper';
import model from './model';
import router from './router';

const { func } = PropTypes;

@AutoWrapper({ KOSconfig: { model }, router })
class Monitor extends React.Component {
  static propTypes = {
    dispatch: func,
  };

  updateName(name) {
    this.props.dispatch({
      type: 'updateState',
      payload: {
        name,
      },
    });
  }

  render() {
    return (
      <div className="header">
        <div>{this.props.routers}</div>
      </div>
    );
  }
}

export default Monitor;
