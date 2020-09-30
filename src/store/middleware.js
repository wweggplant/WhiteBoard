const applyMiddleware = (
  state,
  dispatch
) => async (action) => {
  // middleware 逻辑
  switch (action.type) {
    case 'AGENTS_FETCH': {
      break;
    }
    default:
  }

  // 继续默认的 dispatch 逻辑
  dispatch(action);
};

export default applyMiddleware;
