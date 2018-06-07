const MS_IN_DAY = 24 * 60 * 60 * 1000
const TODAY = +Date.now()

export default function getRandomTimeseries(n) {
  const data = []
  data.push({
    date: new Date(+TODAY - n * MS_IN_DAY),
    value: Math.random() * 50 + 50,
  })
  for (let i = 1; i < n; i += 1) {
    const prev = data[i - 1]
    data.push({
      date: new Date(+prev.date + MS_IN_DAY),
      value: prev.value * (Math.random() * 0.04 + 0.98),
    })
  }
  return data
}
