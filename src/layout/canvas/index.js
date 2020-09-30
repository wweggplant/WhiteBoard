import React, { useRef } from 'react'
import { useStore } from '../../store/index'

function eventHandler(strategy, event, name) {
  strategy[name].call(strategy, event.target.getContext('2d'), event)
}

function Canvas() {
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  const canvasRef = useRef(null)
  const strategy = useStore('strategy')
  return (
    <canvas onMouseDown={(e) => { eventHandler(strategy, e, 'start') }} onMouseMove={(e) => { eventHandler(strategy, e,  'move') }} onMouseUp={(e) => { eventHandler(strategy, e, 'end') }} width={width} height={height} ref={canvasRef}>
    </canvas>
  )
}
export default Canvas