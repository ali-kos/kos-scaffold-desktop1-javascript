import { message } from 'antd';
import { checkLogin as cLogin } from './services';

export default {
  namespace: 'system',
  initial: {
    collapsed: false,
    isLogin: false,
  },
  reducers: {
    toggleCollapsed(state) {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    },
  },
  asyncs: {
    async login(dispatch) {
      await dispatch({
        type: 'setState',
        payload: {
          isLogin: true,
        },
      });
      window.location.replace('#/a');
    },
    async checkLogin(dispatch) {
      const { code } = await cLogin();
      if (code === '200') {
        message.success('已登录');
        dispatch({
          type: 'setState',
          payload: {
            isLogin: true,
          },
        });
      } else {
        window.location.replace('#/login');
      }
    },
  },
  setup(dispatch, getState) {
    console.log('checkLogin');
    const { isLogin } = getState();
    if (!isLogin) {
      dispatch({
        type: 'checkLogin',
      });
    }
  },
};
