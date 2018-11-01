import React from 'react';
import { Button } from 'antd';
import { AutoWrapper } from '@/components/AutoWrapper';
import model from './model';

@AutoWrapper({ KOSconfig: { model } })
class Analysis extends React.Component {
  handleUrl1 = () => {
    const { history } = this.props;
    history.push({
      pathname: '/dashboard/monitor',
      query: { id: '789', name: '654' },
    });
  };
  handleUrl2 = () => {
    const { history } = this.props;
    history.push({
      pathname: '/dashboard/monitor/workspace/abc/123',
    });
  };

  render() {
    return (
      <div className="header">
        <Button.Group>
          <Button onClick={this.handleUrl1}>
            To Monitor page with query string
          </Button>
          <Button onClick={this.handleUrl2}>
            To Workspace page with params
          </Button>
        </Button.Group>
      </div>
    );
  }
}

export default Analysis;
