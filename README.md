## Orama
[![Build Status](https://travis-ci.org/kensho/orama.svg)](https://travis-ci.org/luiscarli/orama)

Orama is a group of React components for quickly exploring and deploying web visualizations, it provides an API similar to ggvis for easily deriving data and composing multi-layer visualizations, it also exposes interfaces for interactively creating visualizations, highlighting data, adding labels and sharing the resulting charts.   

(The library is currently under development)

## Development

Development needs node >= 0.12 and npm >= 3.
To update npm do `$ npm i -g npm`

**Scripts**
```bash
$ npm start
# install dependencies,
# start a hot reload development server on http://localhost:3000/
# run unit tests and lint on source change

$ npm test
# executes unit tests and lint files

$ npm run cov
# generate coverage information from tests
# open coverage report on the browser

$ npm run doc
# Generate markdown docs for functions and components and save then on ./docs

# For publishing bump the version and do
$ npm run build
$ npm publish

# Read package.json to see all scripts
```

**More Information**

- [Development Guide for new Components and Modules](/docs/development.md)
- [Docs for Components](/docs/components.md)
- [Docs Functions Modules](/docs/functions.md)
- [Structure of the Components on the library](/docs/componentsStructure.md)
