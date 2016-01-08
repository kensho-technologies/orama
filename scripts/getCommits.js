/* eslint no-console:0 */

import {exec} from 'child_process'
import _ from 'lodash'

const BASE_CMD = 'git log `git describe --tags --abbrev=0 HEAD^`..HEAD'
const TITLES_CMD = `${BASE_CMD} --pretty=format:":: %s"`
const MSGS_CMD = `${BASE_CMD} --pretty=format:":: %b"`

const filterCommits = (commits, pattern) => {
  var regex = new RegExp(pattern, 'g')
  return _.filter(commits, d => d.title.match(regex))
}

const formatCommits = (titles, messages) => {
  const commits = _.map(titles, (d, i) => ({
    title: titles[i],
    message: messages[i],
  })).reverse()
  const fixes = filterCommits(commits, '(FIX)')
  const features = filterCommits(commits, '(FTR)')
  const breaks = filterCommits(commits, '(BRK)')
  const choresLength = titles.length - fixes.length - features.length - breaks.length
  return {fixes, features, breaks, chores: _.range(choresLength)}
}

export const getCommits = clbck => {
  exec(TITLES_CMD, (error, stdout) => {
    if (error) {
      console.log('error getting git log titles')
      return
    }
    const titles = stdout.split('::').map(d => d.trim())
    exec(MSGS_CMD, (error2, stdout2) => {
      if (error2) {
        console.log('error getting git log messages')
        return
      }
      const messages = stdout2.split('::').map(d => d.trim())
      clbck(formatCommits(titles, messages))
    })
  })
}
