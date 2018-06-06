// Copyright 2018 Kensho Technologies, LLC.

export default function runHoverSolverOn(dataUnderMouse) {
  const {layerProps, renderDatum, hoverData, localMouse} = dataUnderMouse
  if (!renderDatum || !layerProps) return dataUnderMouse
  const hoverSolver = layerProps.hoverSolver || renderDatum.hoverSolver
  if (!hoverSolver) return dataUnderMouse
  const hoverSolverData = hoverSolver(layerProps, hoverData, renderDatum, localMouse)
  return {
    layerProps,
    hoverRenderData: hoverSolverData.hoverRenderData,
    hoverData: hoverSolverData.hoverData,
    renderDatum,
    localMouse,
  }
}
