// Copyright 2018 Kensho Technologies, LLC.

// splits an array into portions separated by elements for which iteratee returns truthy
// e.g. splitBy([0, 1, 2, false, 3], d => !d) -> [[], [1, 2], [3]]
export default function splitBy(arr, iteratee) {
  const result = []
  let lastIndex = 0
  for (let i = 0; i < arr.length; i += 1) {
    if (iteratee(arr[i], i)) {
      result.push(arr.slice(lastIndex, i))
      lastIndex = i + 1
    }
  }
  result.push(arr.slice(lastIndex))
  return result
}
