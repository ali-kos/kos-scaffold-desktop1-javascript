import { login } from './services';

export default {
  initial: {
    name: '123',
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  asyncs: {
    async login(dispatch, getState) {
      const { loginForm } = getState();
      await login(loginForm);
    },
  },
};
