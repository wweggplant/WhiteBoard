import React, {
  useRef, useContext
} from 'react'
import useStrategyEvents from '../../components/useStrategyEvents'
import usePenStateService from '../../components/usePenStateService'
function Canvas() {
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  const canvasRef = useRef(null)
  const [STATE, setStatus] = usePenStateService({})
  const [getEvents] = useStrategyEvents({
    STATE,
    canvasRef
  })
  const {
    start,
    move,
    end
  } = getEvents()
  return (
    <div>
      <canvas onMouseDown={start} onMouseMove={move} onMouseUp={end} width={width} height={height} ref={canvasRef}></canvas>
    </div>
  )
}
export default Canvas