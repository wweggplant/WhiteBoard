import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useStore } from '../../store/index'
import { useDispatch } from '../../store/index'
import { strategyFactory } from '../../components/PenStrategy'
import './index.css'


function Canvas() {
  const dispatch = useDispatch();
  const doc = document.documentElement
  const width =  doc.clientWidth
  const height =  doc.clientHeight
  const canvasRef = useRef(null)
  const canvasBakRef = useRef(null)
  const [top, setTop] = useState(false)
  const eventInitData = useStore('event')
  let strategy
  useEffect(() => {
    const canvas = canvasRef.current.getContext('2d')
    const canvasBak = canvasBakRef.current.getContext('2d')
    dispatch({
      type: 'SET_CTX',
      payload: {
        globalCtx: canvas,
        _globalCtx: canvasBak
      }
    })
    strategy = strategyFactory(eventInitData, canvas, canvasBak)
  }, [eventInitData])
  // 回撤/重做功能
  function saveUndo(img) {
    dispatch({
      type: 'PUSH_UNDOSTACK',
      payload: {
        canvasData: img
      }
    })
  }
  const eventHandler = useCallback((event, name) => {
    strategy[name] && strategy[name].call(strategy, event)
    if (name==='start') {
      setTop(true)
    }
    if (name==='end') {
      setTop(false)
    }
    strategy.eventEnd.call(strategy, event, saveUndo)
  }, [eventInitData])

  let canvasBackClass = 'canvas-bak'
  if (top) {
    canvasBackClass += ' top'
  }
  return (
    <div className="canvas-wrap" onMouseDown={(e) => { eventHandler( e, 'start') }} onMouseMove={(e) => { eventHandler( e,  'move') }} onMouseUp={(e) => { eventHandler(e, 'end') }}>
      <canvas  width={width} height={height} ref={canvasRef}>
      </canvas>
    <canvas width={width} height={height} className={canvasBackClass} ref={canvasBakRef}>
      </canvas>
    </div> 

  )
}
export default Canvas