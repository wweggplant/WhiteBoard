const FLAGS = {
  // 正常情况
  NORMAL: 1,
  // 自由的画
  PAINT: 1 << 1,
  // 选取矩形
  RECT: 1 << 2,
  // 橡皮
  ERASER: 1 << 3,
  //  清空状态
  NOONE: 1 << 4,
  // 圆形
  CIRCULAR: 1 << 5,
  UNDO: 1 << 6,
  RESTORE: 1 << 7,
  // 运动状态
  MOTION_NOONE:1 << 100,
  MOTION_START: 1 << 101,
  MOTION_MOVE: 1 << 102,
  MOTION_END: 1 << 103,
  MOTION_DRAG_START: 1 << 104,
  MOTION_DRAG_MOVE: 1 << 105,
}

export default FLAGS
