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
let strategy = strategyFactory({
  status: CONST.PAINT,
  motion: CONST.MOTION_NOONE,
  penCanvasData: initPenCanvasData
})
export const initialState = {
  status: CONST.PAINT,
  motion: CONST.MOTION_NOONE,
  penCanvasData: initPenCanvasData,
  strategy
}

export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_STRATEGY':
      const { status, motion = state.motion, penCanvasData = state.penCanvasData }  = action.payload
      strategy =  strategyFactory({
        status,
        motion,
        penCanvasData
      })
      return merge(state, {status, motion, penCanvasData, strategy})
    default:
      return state;
  }
}