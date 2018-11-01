import React, { PureComponent } from 'react';
import { Button, Row, Input } from 'antd';
import KOS from 'kos-core';
import { Form, Field } from '@/common/utils/kos-form-antd';
import styles from './login.less';
import model from './model';

@KOS.Wrapper({ model })
class Login extends PureComponent {
  handleSubmit() {
    const { dispatch } = this.props;
    const { getNamespace } = this.props;
    Form.validate(getNamespace(), 'loginForm', (result) => {
      if (result) {
        dispatch({
          type: 'login',
        });
      }
    });
  }
  submitForm = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login',
    });
  };
  render() {
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <span className={styles.imgs} />
          <span>登 录</span>
        </div>
        <Form name="loginForm" onSubmit={() => this.submitForm()}>
          <Field label="用户名：" field="username">
            <Input placeholder="用户名" />
          </Field>
          <Field label="密码：" field="password">
            <Input type="password" placeholder="密码" />
          </Field>
          <Row>
            <Button type="primary" onClick={() => this.handleSubmit()}>登录</Button>
            <p>
              <span>kos-admin</span>
            </p>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Login;
