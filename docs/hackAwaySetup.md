
## Hack away setup

If you don't know what npm/webpack/babel is, or if you don't want to do any complex setup yet, you can start prototyping with Orama by scripting inside a HTML file with the following setup.

> It's not recommended to use this setup for any serious work, or any production facing app.

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

This example uses [ES6](https://babeljs.io/docs/learn-es2015/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) syntax, but those are not a requirement, you can stick to old ES5 javascript if you prefer.

Orama uses [React](http://facebook.github.io/react/) for its view rendering and component architecture. You don't need to leverage React for the rest of your application if you just want to use the charts, you can render then on pre-defined nodes by using the `ReactDOM.render` call as shown above.

The orama.min.js bundle already contains the React and ReactDOM code, it also comes with lodash.
