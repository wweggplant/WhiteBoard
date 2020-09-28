import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import useStrategy from '../../components/useStrategy'



function Canvas({ state }) {
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  const [strategy, setStrategy, canvasRef] = useStrategy({state})
  function injectStrategy(strategy, name, event) {
    strategy[name] && strategy[name](event)
  }
  function start(event) {
    injectStrategy(strategy, 'start', event)
  }
  function move(event) {
    injectStrategy(strategy, 'move', event)
  }
  function end(event) {
    injectStrategy(strategy, 'end', event)
  }

  
  return (
    <div>
      <canvas onMouseDown={start} onMouseMove={move} onMouseUp={end} width={width} height={height} ref={canvasRef}></canvas>
    </div>
  )
}
export default Canvas