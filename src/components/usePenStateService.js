import {
  useEffect,
  useCallback,
  useContext
} from 'react'
import CONST from '../const'

const STATE = {
  status: CONST.NORMAL,
  motion: CONST.MOTION_NOONE,
  penCanvasData: {
    lineWidth: 5,
    lineColor: 'black',
    fillStyle: 'black',
    strokeStyle: 'black',
    lineCap: 'round',
  }
}

function usePenStateService({
  status
}) {
  const setStatus = useCallback(() => {
    if (status) {
      STATE.status = status
    }
  }, [status])
  const changeMotionStatus = useCallback((motion) => {
    if (motion) {
      STATE.motion = motion
    }
  }, [])
  return [STATE, setStatus, changeMotionStatus]
}


export default usePenStateService