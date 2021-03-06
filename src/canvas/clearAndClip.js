// Copyright 2018 Kensho Technologies, LLC.

export default function clearAndClip(props, ctx) {
  const {width, height, backgroundOffset} = props
  ctx.clearRect(0, 0, width, height)
  if (props.layerProps && props.layerProps.clipPlot === false) return
  if (props.plotRect && props.clip) {
    ctx.beginPath()
    ctx.rect(
      props.plotRect.x - backgroundOffset,
      props.plotRect.y - backgroundOffset,
      props.plotRect.width + backgroundOffset * 2,
      props.plotRect.height + backgroundOffset * 2
    )
    ctx.clip()
  }
}
