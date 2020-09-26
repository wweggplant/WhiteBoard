import React from 'react'
function Canvas({ width, height}) {
    const canvasRef = React.createRef();
    const doc = document.documentElement
    width = width || doc.clientWidth
    height = height || doc.clientHeight
    return (
        <canvas onmousedown={} onmousemove={} onmouseup={} width={width} height={height}  ref={canvasRef}></canvas>
    )
}
export default Canvas