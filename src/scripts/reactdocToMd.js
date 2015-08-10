
import getComponents from './reactdocToMd-utils'

var jsonString = ''
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  var chunk = process.stdin.read()
  if (chunk !== null) {
    jsonString += chunk
  }
})
process.stdin.on('end', () => {
  var markdown = getComponents(JSON.parse(jsonString))
  process.stdout.write(markdown)
})
