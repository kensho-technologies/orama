// Copyright 2018 Kensho Technologies, LLC.

import ctxMock from './ctxMock'

export default {
  getContext: () => ctxMock,
  getBoundingClientRect: () => ({left: 0, top: 0, width: 500, height: 500}),
}
