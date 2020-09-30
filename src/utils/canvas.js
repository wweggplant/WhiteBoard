export function drawLine(ctx, start, end) {
  ctx.beginPath()
  ctx.moveTo(start[0], start[1])
  ctx.lineTo(end[0], end[1])
  ctx.stroke()
}
// 绘制动态矩形
export function drawAniRect() {

}
export function saveCtx(ctx) {
  ctx.save();
}
export function restoreCtx(ctx) {
  ctx.restore();
}
export function drawRect(ctx, start, end, type = 'stroke') {
  const origin = [Math.min(start[0], end[0]), Math.min(start[1], end[1])]
  const width = Math.abs(start[0] - end[0])
  const height = Math.abs(start[1] - end[1])
  let method
  if(type=== 'fill'){
    method = 'fillRect'
  }else if(type=== 'stroke'){
    method = 'strokeRect'
  } else if (type=== 'clear'){
    method = 'clearRect'
  }
  ctx[method](origin[0], origin[1], width, height);
  return {
    origin,
    width,
    height,
  }
}
export function setCtxData(ctx, data) {
  if (ctx) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        ctx[key] = data[key];
      }
    }
  }
}