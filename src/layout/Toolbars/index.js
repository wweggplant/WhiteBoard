import React, { useState }  from 'react'
import ToolButton from "./ToolButton"
import { useDispatch } from '../../store/index'
import CONST from '../../const'
import './index.css'
import { ReactComponent as PenLogo } from './pen.svg'
import { ReactComponent as RectLogo } from './rect.svg'
import { ReactComponent as CircleLogo } from './circle.svg'
import { ReactComponent as EraserLogo } from './eraser.svg'
import { ReactComponent as CleanLogo } from './clean.svg'
import { ReactComponent as UndoLogo } from './undo.svg'
import { ReactComponent as RestoreLogo } from './restore.svg'
import { ReactComponent as SaveLogo } from './save.svg'


function Toolbars() {
  const dispatch = useDispatch()
  const togglePen = (status)  => () => {
    dispatch({
      type: 'CHANGE_STRATEGY',
      payload: {
        status
      }
    });
  }
  const setSetting = (name) => (event) => {
    const val = event.target.value
    dispatch({
      type: 'SET_CANVAS_DATA',
      payload: {
        [name]: val
      }
    });
  }
  const [visibility, setVisibility] = useState(true)
  return (
    <div  className={ `toolbars-wrap ${ visibility ? 'moveDown' : 'moveUp' }` }>
      <div className="toolbars">
        <div className="toolbars-area">
          <ToolButton title="重做" status={CONST.PAINT} onClick={togglePen(CONST.PAINT)}>
            <PenLogo />
          </ToolButton>
          <ToolButton title="矩形" status={CONST.RECT} onClick={togglePen(CONST.RECT)}>
            <RectLogo />
          </ToolButton>
          <ToolButton title="圆形" status={CONST.CIRCULAR} onClick={togglePen(CONST.CIRCULAR)}>
            <CircleLogo />
          </ToolButton>
          <ToolButton title="橡皮檫" status={CONST.ERASER} onClick={togglePen(CONST.ERASER)}>
            <EraserLogo />
          </ToolButton>
          <ToolButton title="清空画板" status={CONST.NOONE} onClick={togglePen(CONST.NOONE)}>
            <CleanLogo />
          </ToolButton>
        </div>
        <div className="toolbars-area">
          线条粗细:<input type="range" id="volume" name="volume"
                      min="0" max="11" onChange={setSetting('lineWidth')}/>
          颜色:
          <input type="color" onChange={setSetting('strokeStyle')}/>
        </div>
        <div className="toolbars-area">
          <ToolButton title="撤回" status={CONST.UNDO} onClick={togglePen(CONST.UNDO)}>
            <UndoLogo />
          </ToolButton>
          <ToolButton title="重做" status={CONST.RESTORE} onClick={togglePen(CONST.RESTORE)}>
            <RestoreLogo />
          </ToolButton>
        </div>
        <div className="toolbars-area">
          <ToolButton title="下载" status={CONST.SAVE} onClick={togglePen(CONST.SAVE)}>
            <SaveLogo />
          </ToolButton>
        </div>
      </div>
      <div className="toolbars-top-up" onClick={() => {
        setVisibility(!visibility)
      }} onMouseMove={ () => {
        if(!visibility) {
          setVisibility(true)
        }
      }}>

      </div>

    </div>
  );
}
export default Toolbars;