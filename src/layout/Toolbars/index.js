import React  from 'react';
import { useDispatch, useStore } from '../../store/index'
import CONST from '../../const'
import './index.css'
import { ReactComponent as PenLogo } from './pen.svg'
import { ReactComponent as RectLogo } from './rect.svg'
import { ReactComponent as CircleLogo } from './circle.svg'
import { ReactComponent as EraserLogo } from './eraser.svg'
import { ReactComponent as CleanLogo } from './clean.svg'
import { ReactComponent as UndoLogo } from './undo.svg'
import { ReactComponent as RestoreLogo } from './restore.svg'

function Toolbars() {
  const dispatch = useDispatch();
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
  const { status } = useStore('event')
  function btnClass (sts) {
    return `btn ${status === sts ? 'active': ''}`
  }
  return (
    <div className="toolbars-wrap">
      <div className="toolbars">
        <div className="toolbars-area">
          <div className={btnClass(CONST.PAINT)} onClick={togglePen(CONST.PAINT)}>
            <PenLogo className="btn-img" />
          </div>
          <div className={btnClass(CONST.RECT)} onClick={togglePen(CONST.RECT)}>
            <RectLogo className="btn-img" />
          </div>
          <div className={btnClass(CONST.CIRCULAR)} onClick={togglePen(CONST.CIRCULAR)}>
            <CircleLogo className="btn-img" />
          </div>
          <div className={btnClass(CONST.ERASER)} onClick={togglePen(CONST.ERASER)}>
            <EraserLogo className="btn-img" />
          </div>
          <div className={btnClass(CONST.NOONE)} onClick={togglePen(CONST.NOONE)}>
            <CleanLogo className="btn-img" />
          </div>
        </div>
        <div className="toolbars-area">
          线条粗细:<input type="range" id="volume" name="volume"
                      min="0" max="11" onChange={setSetting('lineWidth')}/>
          颜色:<select onChange={setSetting('strokeStyle')} >
          <option value="black">黑</option>
          <option value="red">红</option>
          <option value="yellow">黄</option>
          <option value="blue">蓝</option>
          <option value="green">绿</option>
        </select>
        </div>
        <div className="toolbars-area">
          <div className={btnClass(CONST.UNDO)} onClick={togglePen(CONST.UNDO)}>
            <UndoLogo className="btn-img" />
          </div>
          <div className={btnClass(CONST.RESTORE)} onClick={togglePen(CONST.RESTORE)}>
            <RestoreLogo className="btn-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Toolbars;