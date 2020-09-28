import { useState, useEffect, useRef} from 'react'
import { strategyFactory } from "./PenStrategy";
import usePenState from './usePenState'

function useStrategy({state}) {
  const [strategy, setStrategy] = useState({})
  const [penState] = usePenState({state})
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const strategy = strategyFactory(ctx, penState)
    setStrategy(strategy)
  }, [state, penState])
  return [strategy, setStrategy, canvasRef]
}

export default useStrategy