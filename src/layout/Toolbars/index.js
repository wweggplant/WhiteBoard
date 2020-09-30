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
  return (
    <div className="toolbars-wrap">
      <div className="toolbars">
        <button onClick={togglePen(CONST.PAINT)}>画笔</button>
        <button onClick={togglePen(CONST.RECT)}>矩形框</button>
        <button onClick={togglePen(CONST.CIRCULAR)}>圆形</button>
        <button onClick={togglePen(CONST.ERASER)}>橡皮擦</button>
      </div>
    </div>
  );
}
export default Toolbars;