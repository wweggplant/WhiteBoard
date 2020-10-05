import CONST from '../const'
import { strategyFactory } from '../components/PenStrategy'
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
    undoStack: [],
    restoreStack: []
  },
  globalCtx: null,
  _globalCtx: null,
  strategy: strategyFactory({
    status: CONST.NORMAL
  }),
  operatorStack: []
}

export function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_STRATEGY':{
      const payload  = action.payload
      return Object.assign({}, state, {event: Object.assign({}, state.event, payload)})
    }
    case 'SET_CTX':{
      const { globalCtx, _globalCtx }  = action.payload
      return  Object.assign({}, state, {globalCtx, _globalCtx})
    }
    case 'SET_CANVAS_DATA': {
      const penCanvasData = action.payload
      state.event.penCanvasData = Object.assign({}, state.event.penCanvasData, penCanvasData)
      return Object.assign({}, state)
    }
    case 'PUSH_UNDOSTACK': {
      const { canvasData } = action.payload
      state.event.undoStack.push(canvasData)
      return Object.assign({}, state)
    }
    default:
      return state;
  }
}