// Copyright 2018 Kensho Technologies, LLC.

export default function runHoverSolverOn(dataUnderMouse) {
  const {layerProps, renderDatum, hoverData, localMouse, mouse} = dataUnderMouse
  if (!renderDatum || !layerProps) return dataUnderMouse
  const hoverSolver = layerProps.hoverSolver || renderDatum.hoverSolver
  if (!hoverSolver) return dataUnderMouse
  const hoverSolverData = hoverSolver(layerProps, hoverData, renderDatum, localMouse)
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
