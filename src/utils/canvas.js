export function drawLine(ctx, start, end) {
  if(ctx) {
    ctx.beginPath()
    ctx.moveTo(start[0], start[1])
    ctx.lineTo(end[0], end[1])
    ctx.stroke()
  }
}