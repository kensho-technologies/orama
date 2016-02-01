
export const fetchJson = url =>
  fetch(url)
    .then(response => response.json())

export const fetchText = url =>
  fetch(url)
    .then(response => response.text())
