/* eslint no-param-reassign:0 */

import {flow, get, map, zipObject, each, sortBy} from 'lodash/fp'
import {timeParse} from 'd3-time-format'

const getDate = timeParse('%Y-%m-%d')

const quandlMap = flow(
  get('dataset_data.column_names'),
  zipObject,
)

const quandlFlow = (result, name) =>
  flow(
    get('dataset_data.data'),
    map(quandlMap(result)),
    each(d => {
      d.Name = name
      d.Date = getDate(d.Date)
    }),
    sortBy('Date'),
  )(result)

export const fetchJson = url =>
  fetch(url).then(r => r.json())

export const fetchText = url =>
  fetch(url).then(r => r.text())

export const fetchQuandl = (url, name) =>
  fetchJson(url).then(r => quandlFlow(r, name))
