import React from 'react'
import './index.css';
import Canvas from '../canvas'
import { useStore } from '../../store/index'
function Board() {
  const {canvasWidth, canvasHeight} = useStore()
  return (
    <div className="border-container">
      <Canvas width={canvasWidth} height={canvasHeight}></Canvas>
    </div>
  );
}

export default Board;
