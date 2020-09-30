import CONST from '../const'
import { drawLine, drawRect, saveCtx, restoreCtx,setCtxData } from '../utils/canvas'

function canMotion(motion) {
  return motion === CONST.MOTION_NOONE || motion === CONST.MOTION_END
}
function isMotion(motion, compareStatus = CONST.MOTION_MOVE) {
  return motion === compareStatus
}
/* 
  画笔的策略工厂方法
*/
export function strategyFactory(state){
  switch (state.status) {
    case CONST.PAINT:
      return new PaintStrategy(state)
    case CONST.RECT:
      return new ReatStrategy(state)
    case CONST.ERASER:
      return new EraserStrategy(state)
    case CONST.CIRCULAR:
      return new CircularStrategy(state)
    default:
      return new PenStrategy(state);
  }
}
class PenStrategy {
  state
  name = '默认'
  constructor(state) {
    this.state = state
    console.log(`当前选择的画笔策略是:${this.name}`)
  }
  start(ctx, e) {
    const motion = this.state.motion
    if (canMotion(motion)) {
      this.state.motion = CONST.MOTION_MOVE
      setCtxData(ctx, this.state.penCanvasData)
    } else {
      // TODO
    }
  }
  move(ctx, e) {

  }
  end(ctx, e) {
    this.state.motion = CONST.MOTION_END
  }
}

class PaintStrategy extends PenStrategy{
  name = '🖌'
  last = []
  constructor(state) {
    super(state)
    console.log(`当前选择的画笔策略是:${this.name}`)
  }
  start(ctx, e) {
    const point = [e.clientX, e.clientY]
    // 设置初始状态
    const motion = this.state.motion
    if (canMotion(motion)) {
      this.state.motion = CONST.MOTION_MOVE
      this.last = point
      setCtxData(ctx, this.state.penCanvasData)
    } else {
      // TODO
    }
  }
  move(ctx, e) {
    if (isMotion(this.state.motion)) {
      drawLine(ctx, this.last, [e.clientX, e.clientY])
      this.last = [e.clientX, e.clientY]
    }
  }
  end(ctx, e) {
    this.state.motion = CONST.MOTION_END
  }
}

class ReatStrategy extends PenStrategy{
  origin = [] // 矩形的起点
  point = []
  name = '⏹'
  width = 0
  height = 0
  raf
  ctx
  start(ctx, e) {
    const point = [e.clientX, e.clientY]
    this.ctx = ctx
    // 设置初始状态
    const motion = this.state.motion
    if (canMotion(motion)) {
      this.state.motion = CONST.MOTION_DRAG_MOVE
      this.origin = point
      this.point = point
      setCtxData(ctx, this.state.penCanvasData)
      saveCtx(this.ctx)
      this.raf = requestAnimationFrame(this.draw.bind(this));
    } else {
      // TODO
    }
  }
  draw() {
    drawRect(this.ctx, this.origin, this.point, 'clear')
    drawRect(this.ctx, this.origin, this.point)
    if (this.state.motion === CONST.MOTION_DRAG_MOVE) {
      this.raf = requestAnimationFrame(this.draw.bind(this))
    } else {
      cancelAnimationFrame(this.raf)
    }
    
  }
  move(ctx, e) {
    if (isMotion(this.state.motion, CONST.MOTION_DRAG_MOVE)) {
      // 清除掉之前的矩形框
      this.point = [e.clientX, e.clientY]
    }
  }
  end(ctx, e) {
    this.state.motion = CONST.MOTION_END
    this.origin = []
    this.point = []
    cancelAnimationFrame(this.raf)
    restoreCtx(this.ctx)
  }
}

class EraserStrategy extends PenStrategy{
  name = '🧼'
}

class CircularStrategy extends PenStrategy{
  name = '⭕️'
}