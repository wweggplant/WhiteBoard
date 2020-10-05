import CONST from '../const'
import { drawLine, drawRect, drawStrokeCircle, clearReact, image2Canvas, setCtxData, copyCanvasImg2Canvas, clearCanvas } from '../utils/canvas'
function canMotion(motion) {
  return motion === CONST.MOTION_NOONE || motion === CONST.MOTION_END
}
function isMotion(motion, compareStatus = CONST.MOTION_MOVE) {
  return motion === compareStatus
}
/*
  画笔的策略工厂方法
*/
export function strategyFactory(state, ctx, _ctx){
  switch (state.status) {
    case CONST.PAINT:
      return new PaintStrategy(ctx, _ctx, state, '🖌')
    case CONST.RECT:
      return new RectStrategy(ctx, _ctx, state, '⏹')
    case CONST.ERASER:
      return new EraserStrategy(ctx, _ctx, state, '🧼')
    case CONST.CIRCULAR:
      return new CircularStrategy(ctx, _ctx, state, '⭕️')
    case CONST.UNDO:
      return new UndoStrategy(ctx, _ctx, state, '撤回')
    case CONST.RESTORE:
      return new ClearStrategy(ctx, _ctx, state, '重做')
    default:
      return new PenStrategy(state);
  }
}
class PenStrategy {
  state
  name
  canEventEnd = true
  ctx
  _ctx
  constructor(ctx, _ctx, state, name = '默认') {
    this.state = state
    this.name = name
    this.ctx = ctx
    this._ctx = _ctx
    console.log(`当前选择的画笔策略是:${this.name}`)
  }
  canMotion() {
    return canMotion(this.state.motion)
  }
  isMotion(status = CONST.MOTION_MOVE) {
    return isMotion(this.state.motion, status)
  }
  eventEnd(e, callback) {
    if(this.canEventEnd && e.type === 'mouseup') {
      // 保存蒙版canvas到真正的canvas上
      copyCanvasImg2Canvas(this._ctx, this.ctx, (img) => {
        // 清空蒙版画布
        clearCanvas(this._ctx)
        callback && callback(img)
      })
    }
  }
  clearCanvas(type=1){
    if(type === 1) {
      clearCanvas(this._ctx)
    } else if(type === 2) {
      clearCanvas(this.ctx)
    } else {
      clearCanvas(this._ctx)
      clearCanvas(this.ctx)
    }

  }
  move(e) {

  }
  end(e) {
    this.state.motion = CONST.MOTION_END
    // const event = useStore('event')
    // console.log(event.undoStack)
  }
}

class PaintStrategy extends PenStrategy{
  last = []
  start(e) {
    const point = [e.clientX, e.clientY]
    // 设置初始状态
    if (this.canMotion()) {
      this.state.motion = CONST.MOTION_MOVE
      this.last = point
      setCtxData(this._ctx, this.state.penCanvasData)
    } else {
      // TODO
    }
  }
  move(e) {
    if (this.isMotion()) {
      drawLine(this._ctx, this.last, [e.clientX, e.clientY])
      this.last = [e.clientX, e.clientY]
    }
  }
}

class RectStrategy extends PenStrategy{
  origin = [] // 矩形的起点
  point = []
  start(e) {
    const point = [e.clientX, e.clientY]
    // 设置初始状态
    if (this.canMotion()) {
      this.state.motion = CONST.MOTION_DRAG_MOVE
      this.origin = point
      this.point = point
      setCtxData(this._ctx, this.state.penCanvasData)
    } else {
      // TODO
    }
  }
  move(e) {
    if (this.isMotion(CONST.MOTION_DRAG_MOVE)) {
      // 清除掉之前的矩形框
      this.point = [e.clientX, e.clientY]
      this.clearCanvas()
      drawRect(this._ctx, this.origin, this.point)
    }
  }
  end(e) {
    this.state.motion = CONST.MOTION_END
    this.origin = []
    this.point = []
  }
}

class EraserStrategy extends PenStrategy{
  point = []
  canEventEnd = false
  size = 50
  start(e) {
    const point = [e.clientX, e.clientY]
    // 设置初始状态
    if (this.canMotion()) {
      this.state.motion = CONST.MOTION_DRAG_MOVE
      this.point = point
    }
  }
  move(e) {
    if (this.isMotion(CONST.MOTION_DRAG_MOVE)) {
      // 清除掉之前的矩形框
      this.point = [e.clientX, e.clientY]
      this.clearCanvas()
      clearReact(this.ctx, this.point, this.size)
    }
  }
  end(e) {
    this.state.motion = CONST.MOTION_END
    this.point = []
  }
}

class CircularStrategy extends PenStrategy{
  origin = [] // 圆形原点
  point = []
  start(e) {
    const point = [e.clientX, e.clientY]
    // 设置初始状态
    if (this.canMotion()) {
      this.state.motion = CONST.MOTION_DRAG_MOVE
      this.origin = point
      this.point = point
      setCtxData(this._ctx, this.state.penCanvasData)
    }
  }
  move(e) {
    if (this.isMotion(CONST.MOTION_DRAG_MOVE)) {
      // 清除掉之前的矩形框
      this.point = [e.clientX, e.clientY]
      this.clearCanvas()
      drawStrokeCircle(this._ctx, this.origin, this.point)
    }
  }
  end(e) {
    this.state.motion = CONST.MOTION_END
    this.origin = []
    this.point = []
  }
}

class ClearStrategy extends PenStrategy{
  constructor(ctx, _ctx) {
    super(ctx, _ctx, {}, '');
    clearCanvas(ctx)
  }
}

class UndoStrategy extends PenStrategy{
  constructor(ctx, _ctx, state, name) {
    super(ctx, _ctx, state, name);
    clearCanvas(ctx)
    const { undoStack, restoreStack } = state
    // console.log('----撤回操作---')
    // console.log(undoStack, 'undoStack')
    // console.log(restoreStack, 'restoreStack')
    // 把栈顶元素推入restoreStack, 这样回撤的时候,正好缺少栈顶的一次操作
    restoreStack.push(undoStack.pop())
    // slice出一个浅复制的undoStack,进行后续的操作
    const copyUndoStack = undoStack.slice()
    while(copyUndoStack.length > 0) {
      const img = copyUndoStack.pop()
      if (img) {
        restoreStack.push(img)
        image2Canvas(this.ctx, img)
      }
    }
    // console.log('----撤回操作 end---')
    // console.log(undoStack, 'undoStack')
    // console.log(restoreStack, 'restoreStack')
  }
}