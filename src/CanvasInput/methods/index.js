
export const runHoverSolverOn = dataUnderMouse => {
  const {
    layerProps,
    renderDatum,
    hoverData,
    localMouse,
    mouse,
  } = dataUnderMouse

  if (!renderDatum || !layerProps) return dataUnderMouse
  const hoverSolver = layerProps.hoverSolver || renderDatum.hoverSolver
  if (!hoverSolver) return dataUnderMouse
  const hoverSolverData = hoverSolver(
    layerProps, hoverData, renderDatum, localMouse,
  )
  return {
    layerProps,
    hoverOriginalData: hoverData,
    hoverRenderData: hoverSolverData.hoverRenderData,
    hoverData: hoverSolverData.hoverData,
    renderDatum,
    localMouse,
    mouse,
  }
}

export const getMouseFromEvt = evt => {
  if (evt.touches) {
    return {
      x: evt.touches[0].clientX,
      y: evt.touches[0].clientY,
    }
  }
  return {
    x: evt.clientX,
    y: evt.clientY,
  }
}
