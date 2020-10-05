import React  from 'react';
import { useDispatch } from '../../store/index'
import CONST from '../../const'
import './index.css'
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
  return (
    <div className="toolbars-wrap">
      <div className="toolbars">
        基本功能:
        <button onClick={togglePen(CONST.PAINT)}>画笔</button>
        <button onClick={togglePen(CONST.RECT)}>矩形框</button>
        <button onClick={togglePen(CONST.CIRCULAR)}>圆形</button>
        <button onClick={togglePen(CONST.ERASER)}>橡皮擦</button>
        <button onClick={togglePen(CONST.NOONE)}>清空</button>
        属性设置:
        线条粗细:<input type="range" id="volume" name="volume"
                     min="0" max="11" onChange={setSetting('lineWidth')}/>
        颜色:<select onChange={setSetting('strokeStyle')} >
                <option value="black">黑</option>
                <option value="red">红</option>
                <option value="yellow">黄</option>
                <option value="blue">蓝</option>
                <option value="green">绿</option>
            </select>
        撤回/重做: <button onClick={togglePen(CONST.UNDO)}>撤回</button>
        <button onClick={togglePen(CONST.RESTORE)}>重做</button>
      </div>
    </div>
  );
}
export default Toolbars;