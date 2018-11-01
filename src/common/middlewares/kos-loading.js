import KOS from 'kos-core';

const KOSUtil = KOS.Util;

const createLoadingAction = (action, isLoading) => {
  const { namespace, type } = KOSUtil.getActionType(action.type);
  const model = KOS.getModel(namespace);
  // const async = model.getAsync(type);
  let async;
  if (model) {
    async = model.getAsync && model.getAsync(type);
  }
  if (async) {
    return {
      type: `${namespace}/setState`,
      payload: {
        [`${type}_loading`]: isLoading,
      },
    };
  }
  return null;
};

export default store => next => async (action) => {
  const { dispatch } = store;

  const showLoadingAction = createLoadingAction(action, true);
  showLoadingAction && dispatch(showLoadingAction);

  await next(action);

  const hideLoadingAction = createLoadingAction(action, false);
  hideLoadingAction && dispatch(hideLoadingAction);
};
