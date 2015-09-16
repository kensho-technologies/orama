## Explorer
[![Build Status](https://travis-ci.org/kensho/explorer.svg)](https://travis-ci.org/luiscarli/explorer)

Development needs node >= 0.12 and npm >= 3.
To update npm to version 3 pre-release do `$ npm install -g npm@3.0-latest`

**Scripts**
```bash
$ npm start
# install dependencies,
# start a hot reload development server on http://localhost:3000/
# run unit tests and lint on source change

$ npm test
# executes unit tests and lint files

$ npm run test:cov
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
