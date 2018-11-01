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
  asyncs: {},
};
