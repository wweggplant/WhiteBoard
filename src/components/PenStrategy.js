import CONST from '../const'
import { drawLine } from '../utils/canvas'
/* 
  画笔的策略
*/
export function strategyFactory(ctx, state){
  if (state === CONST.PAINT) {
    return new PaintPenStrategy(ctx, state)
  } else {

  }
  return new PenStrategy(ctx, state)
}
class PenStrategy {
  state
  ctx
  constructor(ctx, state) {
    this.state = state
    this.ctx = ctx
    debugger
    const { penCanvasData } = state
    for(let key in penCanvasData) {
      this.ctx[key] = penCanvasData[key]
    }
  }
  start(e) {
    console.log('默认的策略')
  }
  move(e) {

  }
  end(e) {

  }
}

class PaintPenStrategy extends PenStrategy{
  last = []
  start(e) {
    console.log('🖌的策略')
    const point = [e.clientX, e.clientY]
    // 设置初始状态
    const state = this.state
    if (state === CONST.NORMAL) {
      this.state.state = CONST.PAINT
      this.last = point
    } else {
      // TODO 
    }
  }
  move(e) {
    if (this.state.state === CONST.PAINT) {
      drawLine(this.ctx, this.last, [e.clientX, e.clientY])
      this.last = [e.clientX, e.clientY]
    }
  }
  end(e) {
    this.state.state = CONST.NORMAL
  }
}