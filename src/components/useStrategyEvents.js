import { useCallback} from 'react'
import { strategyFactory } from "./PenStrategy";


function useStrategyEvents({
  state,
  canvasRef
}) {
  function initStrategy(strategy, name, event) {
    strategy && strategy[name] && strategy[name](event)
  }
  const getEvents = useCallback(() => {
    if (canvasRef.current) {
      const strategy = strategyFactory(canvasRef.current.getContext('2d'), state)
      return {
        start(event) {
          initStrategy(strategy, 'start', event)
        },
        move(event) {
          initStrategy(strategy, 'move', event)
        },
        end(event) {
          initStrategy(strategy, 'end', event)
        }
      }
    }
  }, [canvasRef, state])
  return [getEvents]
}

export default useStrategyEvents