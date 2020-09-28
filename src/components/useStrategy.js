import { useState, useEffect, useRef, useCallback} from 'react'
import { strategyFactory } from "./PenStrategy";
import usePenState from './usePenState'
import CONST from '../const'

const pen = {
    state: CONST.NORMAL,
    motion: CONST.MOTION_NOONE,
    penCanvasData: {
        lineWidth: 5,
        lineColor: 'black',
        fillStyle: 'black',
        strokeStyle: 'black',
        lineCap: 'round',
    },
    point: []
}
let strategy
const actionList = {
  changeStrategy(state){
    strategy = strategyFactory(ctx, penState)
  },
  getStrategy() {
    return strategy
  }
}
const commit = useCallback((actionToken, payload)=>{
    actionList[actionToken](payload)
},[ actionList ])


function useStrategy({state}) {
  const [strategy, setStrategy] = useState({})
  const [penState] = usePenState({state})
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const strategy = strategyFactory(ctx, penState)
    setStrategy(strategy)
  }, [state])
  return [strategy, setStrategy, canvasRef]
}

export default useStrategy