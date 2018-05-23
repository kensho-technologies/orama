// Copyright 2018 Kensho Technologies, LLC.

export const windowMock = {
  innerWidth: 1000,
  innerHeight: 1000,
  open: () => undefined,
}

export function getWindow() {
  if (global.window) return global.window
  return windowMock
}
