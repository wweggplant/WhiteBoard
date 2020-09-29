import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import useStrategy from '../../components/useStrategy'

function Canvas({ state }) {
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  const canvasRef = useRef(null)
  const [getStrategy, commit] = useStrategy(state)
  function initStrategy(strategy, name, event) {
    strategy && strategy[name] && strategy[name](event)
  }
  function start(event) {
    initStrategy(getStrategy(), 'start', event)
  }
  function move(event) {
    initStrategy(getStrategy(), 'move', event)
  }
  function end(event) {
    initStrategy(getStrategy(), 'end', event)
  }

  useEffect(() => {
    commit('setCanvasCtx', canvasRef.current.getContext('2d'))
  })

  return (
    <div>
      <canvas onMouseDown={start} onMouseMove={move} onMouseUp={end} width={width} height={height} ref={canvasRef}></canvas>
    </div>
  )
}
export default Canvas