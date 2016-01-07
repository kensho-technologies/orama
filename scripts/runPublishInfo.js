/* eslint no-console:0 */

import {exec} from 'child_process'
import _ from 'lodash'
import c from 'colors/safe'

const LOG_CMD = 'git log `git describe --tags --abbrev=0 HEAD`..HEAD --pretty=format:"%s"'
const TIME_CMD = 'git log -1 --format=%ar `git describe --tags --abbrev=0 HEAD`'

const filterCommits = (commits, pattern) => {
  var regex = new RegExp(pattern, 'g')
  return _.filter(commits, d => d.match(regex))
}

const plotLevel = (commits, level) => {
  if (_.isEmpty(commits)) return
  console.log(`${c.red(commits.length)} new ${level}`)
  _.each(commits, d => console.log(d))
}
const plotChores = chores => {
  if (_.isEmpty(chores)) return
  console.log(`${c.red(chores.length)} new chores`)
}

const formatCommits = (commits) => {
  const fixes = filterCommits(commits, '(FIX)')
  const features = filterCommits(commits, '(FTR)')
  const breaks = filterCommits(commits, '(BRK)')
  const choresLength = commits.length - fixes.length - features.length - breaks.length
  return {fixes, features, breaks, chores: _.range(choresLength)}
}

export const getCommits = clbck => {
  exec(LOG_CMD, (error, stdout) => {
    if (error) {
      console.log('error getting git log titles')
      return
    }
    const commits = stdout.split('\n').reverse()
    exec(TIME_CMD, (error2, time) => {
      if (error2) {
        console.log('error getting time since last tag')
        return
      }
      clbck(formatCommits(commits), time)
    })
  })
}

getCommits(({fixes, features, breaks, chores}, time) => {
  console.log('\n')
  console.log(`last published: ${c.yellow(time)}`)
  plotLevel(breaks, 'break change(s)')
  plotLevel(features, 'feature(s)')
  plotLevel(fixes, 'fixe(s)')
  plotChores(chores)
  console.log('\n')
})
