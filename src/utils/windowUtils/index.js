
export const windowMock = {
  innerWidth: 1000,
  innerHeight: 1000,
}

export const getWindow = () => {
  if (global.window) return global.window
  return windowMock
}
