// Copyright 2018 Kensho Technologies, LLC.

import ctxMock from './ctxMock'

let cachedCtx
/*
Returns a cached offscreen canvas render.
In case the DOM is not available, returns a mocked render context.

The context returned by this function is shared, always call `save()` and `restore()` when manipulating it
*/
export default function getCachedContext() {
  if (cachedCtx) return cachedCtx
  if (global.document && global.document.createElement) {
    cachedCtx = document.createElement('canvas').getContext('2d')
    return cachedCtx
  }
  return ctxMock
}
