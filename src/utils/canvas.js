export function drawLine(ctx, start, end) {
  ctx.beginPath()
  ctx.moveTo(start[0], start[1])
  ctx.lineTo(end[0], end[1])
  ctx.stroke()
}
export function saveCtx(ctx) {
  ctx.save();
}
export function restoreCtx(ctx) {
  ctx.restore();
}

export function clearCanvas(ctx) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  ctx.clearRect(0, 0, width, height)
}
export function image2Canvas(ctx, image) {
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  )
}
export function copyCanvasImg2Canvas(srcCtx, destCtx, callback) {
  const img = new Image()
  img.src = srcCtx.canvas.toDataURL()
  img.onload = () => {
    destCtx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        destCtx.canvas.width,
        destCtx.canvas.height
    )
    callback && callback(img)
  }
}
export function drawStrokeCircle(ctx, start, end) {
  ctx.beginPath()
  const [startX ,startY] = start
  const [endX ,endY] = end
  let radii = Math.sqrt(
      (startX - endX) * (startX - endX) + (startY - endY) * (startY - endY)
  )
  ctx.arc(startX, startY, radii, 0, Math.PI * 2, false)
  ctx.stroke()
}
export function drawRect(ctx, start, end) {
  ctx.beginPath()
  const [startX ,startY] = start
  const [endX ,endY] = end
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, startY)
  ctx.lineTo(endX, endY)
  ctx.lineTo(startX, endY)
  ctx.lineTo(startX, startY)
  ctx.stroke();
}
export function clearReact(ctx, point, size) {
  ctx.clearRect(point[0], point[1], size, size)
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