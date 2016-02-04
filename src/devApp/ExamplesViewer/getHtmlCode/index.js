
import _ from 'lodash'

export const getHtmlCode = code => `<!DOCTYPE html>
<meta charset="utf-8">
<script src="https://npmcdn.com/orama/dist/orama.min.js"></script>
<script src="https://npmcdn.com/babel-core@5.8.34/browser.min.js"></script>
<div id="root"/>
<script type="text/babel">

${_.replace(code, 'export ', '')}

ReactDOM.render(<DataVis/>, document.getElementById('root'))
</script>`
