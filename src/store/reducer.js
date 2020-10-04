import CONST from '../const'
import { strategyFactory } from '../components/PenStrategy'
import { merge } from 'immutable';
const initPenCanvasData = {
  lineWidth: 5,
  lineColor: 'black',
  fillStyle: 'black',
  strokeStyle: 'black',
  lineCap: 'round',
}

export const initialState = {
  event: {
    status: CONST.PAINT,
    motion: CONST.MOTION_NOONE,
    penCanvasData: initPenCanvasData,
  },
  globalCtx: null,
  _globalCtx: null,
  strategy: strategyFactory({
    status: CONST.NORMAL
  })
}

export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_STRATEGY':
      const payload  = action.payload
      return merge(state, {event: Object.assign({}, state.event, payload)})
    case 'SET_CTX':
      const { globalCtx, _globalCtx }  = action.payload
      return merge(state, {globalCtx, _globalCtx})
    default:
      return state;
  }
}