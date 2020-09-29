import CONST from '../const'
import { drawLine } from '../utils/canvas'
/* 
  画笔的策略
*/
export function strategyFactory(ctx, state){
  if (state.status === CONST.PAINT) {
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
    const motion = this.state.motion
    if (motion === CONST.MOTION_NOONE || motion === CONST.MOTION_END) {
      this.state.motion = CONST.MOTION_MOVE
      this.last = point
    } else {
      // TODO
    }
  }
  move(e) {
    if (this.state.motion === CONST.MOTION_MOVE) {
      drawLine(this.ctx, this.last, [e.clientX, e.clientY])
      this.last = [e.clientX, e.clientY]
    }
  }
  end(e) {
    this.state.motion = CONST.MOTION_END
  }
}