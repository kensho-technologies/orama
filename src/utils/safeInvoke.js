// Copyright 2018 Kensho Technologies, LLC.

export default function safeInvoke(fn, ...args) {
  return fn ? fn(...args) : undefined
}
