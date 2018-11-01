import { message } from 'antd';
import { login } from './services';

export default {
  namespace: 'login',
  initial: {
    loginForm: {
      username: '',
      password: '',
    },
  },
  validators: [{
    formName: 'loginForm',
    validators: [{
      field: 'username',
      rules: 'required',
      help: '请输入用户名',
    }, {
      field: 'password',
      rules: 'required',
      help: '请输入密码',
    }],
  }],
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    toggleCollapsed(state) {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    },
  },
  asyncs: {
    async login(dispatch, getState) {
      const { loginForm } = getState();
      const { code } = await login(loginForm);
      if (code === '200') {
        message.success('登录成功');
        dispatch({
          type: 'system/login',
        });
      }
    },
  },
};
