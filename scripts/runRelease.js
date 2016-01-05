/* eslint no-console:0 */

import {exec} from 'child_process'
import {getCommits} from './getCommits'
import prompt from 'prompt'
import c from 'colors/safe'
import _ from 'lodash'
import pkg from '../package.json'

prompt.message = ''
prompt.delimiter = ''

const plotVersionUpgrade = newVersion => {
  console.log(`${pkg.name} is on ${c.yellow.bgBlack(pkg.version)}`)
  if (newVersion) {
    console.log(`will upgrade to ${c.red.bgBlack(newVersion)}`)
    return
  }
  console.log('no relevant commits for a new release')
}

const getNewVersionKey = ({fixes, features, breaks}) => {
  const semVer = _.map(
    pkg.version.split('-')[0].split('.'), d => +d
  )
  // beta
  if (semVer[0] === 0) {
    if (!_.isEmpty(breaks)) {
      const newVersion = `${semVer[0]}.${semVer[1] + 1}.0`
      plotVersionUpgrade(newVersion)
      return 'minor'
    } else if (!_.isEmpty(features) || !_.isEmpty(fixes)) {
      const newVersion = `${semVer[0]}.${semVer[1]}.${semVer[2] + 1}`
      plotVersionUpgrade(newVersion)
      return 'patch'
    }
    plotVersionUpgrade()
    return undefined
  }
  // after 1.0
  if (!_.isEmpty(breaks)) {
    const newVersion = `${semVer[0] + 1}.0.0`
    plotVersionUpgrade(newVersion)
    return 'major'
  } else if (!_.isEmpty(features)) {
    const newVersion = `${semVer[0]}.${semVer[1] + 1}.0`
    plotVersionUpgrade(newVersion)
    return 'minor'
  }
  const newVersion = `${semVer[0]}.${semVer[1]}.${semVer[2] + 1}`
  plotVersionUpgrade(newVersion)
  return 'patch'
}

const plotLevel = (commits, level) => {
  if (_.isEmpty(commits)) return
  console.log(`${c.red(commits.length)} ${level}`)
  _.each(commits, d => console.log(d.title))
}

const checkPromptResult = result => (
  result.yesno === 'y' || result.yesno === 'yes' || result.yesno === 'Y'
)

function runNPMVersion(newVersionKey) {
  exec('npm version ' + newVersionKey, err => {
    if (!err) {
      exec('git push --follow-tags', err2 => {
        if (!err2) {
          console.log(c.green('done!'))
          console.log('\n')
        }
      })
    } else {
      console.log(c.red('failed to tag a new version'))
      console.log(c.red('you probably have unstaged commits'))
      console.log('\n')
    }
  })
}

function runTestBeforeTag(newVersionKey) {
  console.log('\n')
  console.log('running tests')
  exec('npm test', err => {
    if (err) {
      console.log(c.red.bgBlack('tests failed'))
      console.log('\n')
    } else {
      console.log(c.green('pushing ' + newVersionKey))
      console.log('\n')
      runNPMVersion(newVersionKey)
    }
  })
}

const promptProp = {
  name: 'yesno',
  message: 'Push new tag [y/N]',
  validator: /y[es]*|n[o]?/,
  warning: 'Must respond yes or no',
}

const runPublish = ({fixes, features, breaks}) => {
  console.log('\n')
  plotLevel(fixes, 'fixe(s)')
  plotLevel(features, 'feature(s)')
  plotLevel(breaks, 'break change(s)')
  console.log('\n')
  const newVersionKey = getNewVersionKey({fixes, features, breaks})
  console.log('\n')
  if (!newVersionKey) return
  prompt.start()
  prompt.get(promptProp, (err, result) => {
    if (checkPromptResult(result)) runTestBeforeTag(newVersionKey)
  })
}

exec('git branch', (err, stdout) => {
  if (stdout.match(/master/g)) {
    getCommits(runPublish)
  } else {
    console.log(c.red('you need to be on master to run this command'))
  }
})
