import {
  createContext
} from 'react'
import CONST from '../const'

export const PenStateContext = createContext({
  state: {
    status: CONST.NORMAL,
    motion: CONST.MOTION_NOONE,
    penCanvasData: {
      lineWidth: 5,
      lineColor: 'black',
      fillStyle: 'black',
      strokeStyle: 'black',
      lineCap: 'round',
    }
  },
  setState: () => {
    debugger
  },
})