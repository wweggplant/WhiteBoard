import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import useStrategy from '../../components/useStrategy'

function Canvas({ state, canvasRef, strategy }) {
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  function initStrategy(strategy, name, event) {
    strategy[name] && strategy[name](event)
  }
  function start(event) {
    initStrategy(strategy, 'start', event)
  }
  function move(event) {
    initStrategy(strategy, 'move', event)
  }
  function end(event) {
    initStrategy(strategy, 'end', event)
  }

  return (
    <div>
      <canvas onMouseDown={start} onMouseMove={move} onMouseUp={end} width={width} height={height} ref={canvasRef}></canvas>
    </div>
  )
}
export default Canvas