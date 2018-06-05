// Copyright 2018 Kensho Technologies, LLC.

export default function createLayerComponent(plot) {
  const Layer = () => null
  if (plot) Layer.defaultProps = {plot}
  return Layer
}
