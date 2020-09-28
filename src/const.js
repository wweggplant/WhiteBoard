const FLAGS = {
  // 正常情况
  NORMAL: 1,
  // 自由的画
  PAINT: 1 << 1,
  // 选取固定图形,如矩形、圆形等
  GRAPH: 1 << 2,
  // 橡皮
  ERASER: 1 << 3,
  // 运动状态
  MOTION_NOONE:1 << 100,
  MOTION_START: 1 << 101,
  MOTION_MOVE: 1 << 102,
  MOTION_END: 1 << 103
}

export default FLAGS