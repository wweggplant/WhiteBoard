import React from 'react'
import { initialState, reducer} from './reducer'
import applyMiddleware from './middleware'
const storeCxt = React.createContext(initialState);
const dispatchCtx = React.createContext((() => 0));
const Provider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const enhancedDispatch = applyMiddleware(state, dispatch);
  return (
    <dispatchCtx.Provider value={enhancedDispatch}>
      <storeCxt.Provider value={state}>{props.children}</storeCxt.Provider>
    </dispatchCtx.Provider>
  );
}

export const useStore = (nameSpace) => {
  const store = React.useContext(storeCxt);
  return nameSpace ? store[nameSpace] : store;
};
export const useDispatch = () => React.useContext(dispatchCtx)
export default Provider