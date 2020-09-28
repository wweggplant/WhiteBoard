import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react'
import './index.css';
import Canvas from '../canvas'
import Pen from '../../components/pen'
function Board({state, canvasRef, strategy}) {
  return (
    <div className="border-container">
      <Canvas state={ state } canvasRef={canvasRef} strategy={strategy}></Canvas>
      <Pen state={ state }/>
    </div>
  );
}

export default Board;
