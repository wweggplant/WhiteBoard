import React, { useRef, useState } from 'react'
import { useStore } from '../../store/index'
import { clearCanvas } from '../../utils/canvas'
import './index.css'


function Canvas() {
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  const canvasRef = useRef(null)
  const canvasBakRef = useRef(null)
  const strategy = useStore('strategy')
  const [top, setTop] = useState(false)
  function eventHandler(strategy, event, name) {
    const canvas = canvasRef.current.getContext('2d')
    const canvasBak = canvasBakRef.current.getContext('2d')
    strategy.eventStart.call(strategy, event, canvasBak, canvas)
    strategy[name].call(strategy, event)
    if (name==='start') {
      setTop(true)
    }
    if (name==='end') {
      setTop(false)
    }
    strategy.eventEnd.call(strategy, event, canvasBak, canvas)
  }
  let canvasBackClass = 'canvas-bak'
  if (top) {
    canvasBackClass += ' top'
  }
  return (
    <div className="canvas-wrap" onMouseDown={(e) => { eventHandler(strategy, e, 'start') }} onMouseMove={(e) => { eventHandler(strategy, e,  'move') }} onMouseUp={(e) => { eventHandler(strategy, e, 'end') }}>
      <canvas  width={width} height={height} ref={canvasRef}>
      </canvas>
    <canvas width={width} height={height} className={canvasBackClass} ref={canvasBakRef}>
      </canvas>
    </div> 

  )
}
export default Canvas