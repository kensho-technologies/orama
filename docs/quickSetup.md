
## Quick setup

If you don't know what npm/webpack/babel is, or if you don't want to do any complex setup yet, you can start prototyping with Orama by scripting inside a HTML file with the following code.

**It's recommended to use this setup only for prototypes.**

```html
<!DOCTYPE html>
<meta charset="utf-8">
<script src="https://npmcdn.com/orama/dist/orama.min.js"></script>
<script src="https://npmcdn.com/babel-core@5.8.34/browser.min.js"></script>

<div id="root"/>

<script type="text/babel">
  const {Chart, Lines} = orama
  const linesData = orama.getTimeSeries(_.range(1000))

  const myChart = (
    <Chart>
      <Lines
        data={linesData}
        x='x'
        y='y'
      />
    </Chart>
  )

  ReactDOM.render(myChart, document.getElementById('root'))
</script>
```

For convenience, the `orama.min.js` bundle globally exports React, ReactDOM and lodash.

Orama uses [React](http://facebook.github.io/react/) for its view rendering and component architecture. You don't need to leverage React for the rest of your application if you just want to use the charts, you can render then on pre-defined nodes by using the `ReactDOM.render` call as shown above.

This example uses [ES6](https://babeljs.io/docs/learn-es2015/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) syntax, but those are not a requirement, you can stick to old ES5 javascript if you prefer, you can code the previous example by directly using [React.createElement](https://facebook.github.io/react/docs/top-level-api.html#react.createelement) calls, the build gets simpler (as there's no transpilation phase), but the component structure gets harder to read:

```html
<!DOCTYPE html>
<meta charset="utf-8">
<script src="https://npmcdn.com/orama/dist/orama.min.js"></script>

<div id="root"/>

<script>
  var re = React.createElement
  var Chart = orama.Chart
  var Lines = orama.Lines
  var linesData = orama.getTimeSeries(_.range(1000))

  var myChart = (
    re(Chart, undefined, [
      re(Lines, {
        data: linesData,
        x: 'x',
        y: 'y',
      })
    ])
  )

  ReactDOM.render(myChart, document.getElementById('root'))
</script>
```

#### Other

- [Getting started](gettingStarted.md)
- [API docs](api.md)
