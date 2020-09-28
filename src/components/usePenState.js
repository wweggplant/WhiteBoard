import { useState, useEffect} from 'react'
import CONST from '../const'


function usePenState({ state }) {
  const [penState, setPenState] = useState({
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
  useEffect(() => {
    if  (state === CONST.NOONE) {
      penState.state = CONST.PAINT
      setPenState(penState)
    }
  }, [state])
  return [penState]
}

export default usePenState