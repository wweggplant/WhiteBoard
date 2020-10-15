import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useStore } from '../../store/index'
import { useDispatch } from '../../store/index'
import { strategyFactory } from '../../components/PenStrategy'
import './index.css'


function Canvas(props) {
  const dispatch = useDispatch();
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
    strategy && strategy[name] && strategy[name].call(strategy, event)
    if (name==='start') {
      setTop(true)
    }
    if (name==='end') {
      setTop(false)
    }
    strategy && strategy.eventEnd.call(strategy, event, saveUndo)
  }, [eventInitData])

  let canvasBackClass = 'canvas-bak'
  if (top) {
    canvasBackClass += ' top'
  }
  return (
    <div className="canvas-wrap" style={ { width: `${props.width}px`, height: `${props.height}px`, margin: 'auto'}} onMouseDown={(e) => { eventHandler( e, 'start') }} onMouseMove={(e) => { eventHandler( e,  'move') }} onMouseUp={(e) => { eventHandler(e, 'end') }}>
      <canvas width={props.width} height={props.height} className="canvas" ref={canvasRef} />
      <canvas width={props.width} height={props.height} className={canvasBackClass} ref={canvasBakRef} />
    </div> 

  )
}
export default Canvas