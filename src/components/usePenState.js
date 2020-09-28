import { useState, useEffect} from 'react'
import CONST from '../const'


function usePenState({ state }) {
  const [penState] = useState({
    state,
    motion: CONST.MOTION_NOONE,
    penCanvasData: {
      lineWidth: 5,
      lineColor: 'black',
      fillStyle: 'black',
      strokeStyle: 'black',
      lineCap: 'round',
    },
    point: []
  })
  return [penState]
}

export default usePenState