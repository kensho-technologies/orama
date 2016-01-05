/* eslint no-console:0 */

import _ from 'lodash'
import GitHubApi from 'github'
import pkg from '../package.json'
import {getCommits} from './getCommits'
import c from 'colors/safe'

const github = new GitHubApi({
  version: '3.0.0',
  protocol: 'https',
})
github.authenticate({
  type: 'oauth',
  token: process.env.GIT_TOKEN,
})

const plotCommits = (body, commitsType) => (
  _.reduce(commitsType, (acc, commit) => {
    let txt = acc.concat(`${commit.title}\n`)
    if (!_.isEmpty(commit.message)) {
      txt = txt.concat(`${commit.message}\n`)
    }
    return txt
  }, body)
)

const getBody = ({fixes, features, breaks}) => (
  _.flow(
    body => plotCommits(body, breaks),
    body => plotCommits(body, features),
    body => plotCommits(body, fixes),
  )('')
)

const getRelease = commits => ({
  owner: 'Kensho',
  repo: 'orama',
  tag_name: 'v' + pkg.version,
  name: pkg.version,
  body: getBody(commits),
})

getCommits(commits => {
  const release = getRelease(commits)
  github.releases.createRelease(release, err => {
    if (err) console.log(err)
    console.log('\n')
    console.log(release.body)
    console.log('\n')
    console.log(c.green(`${pkg.version} released to github`))
    console.log('\n')
  })
})
