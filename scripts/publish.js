
var exec = require('child_process').exec;
var prompt = require('prompt');
var _ = require('lodash');
var c = require('colors/safe');
var package = require('../package.json');
prompt.message = '';
prompt.delimiter = '';

function zipCommits(titles, messages) {
  return _.map(titles, function(d, i) {
    return {
      title: titles[i],
      message: messages[i],
    }
  })
}
function filterCommits(commits, pattern) {
  var regex = new RegExp(pattern, 'g')
  return _.filter(commits, function(d, i) {
    return d.title.match(regex)
  })
}
function plotLevel(commits, level) {
  if (!_.isEmpty(commits)) {
    console.log(c.red(commits.length) + ' ' + level)
    _.each(commits, function(d) {
      console.log(d)
    })
  }
}
function getNewVersion(fixes, features, breaks) {
  var semVer = package.version.split('-')[0].split('.')
  semVer = _.map(semVer, function(d){ return +d})
  if (semVer[0] === 0) {
    if (!_.isEmpty(breaks)) {
      console.log(package.name + ' is on ' + c.yellow.bgBlack(package.version))
      var newVersion = semVer[0] + '.' + (semVer[1] + 1) + '.0'
      console.log('will upgrade to ' + c.red.bgBlack(newVersion))
      return 'minor'
    } else if (!_.isEmpty(features) || !_.isEmpty(fixes)) {
      console.log(package.name + ' is on ' + c.yellow.bgBlack(package.version))
      var newVersion = semVer[0] + '.' + semVer[1] + '.' + (semVer[2] + 1)
      console.log('will upgrade to ' + c.red.bgBlack(newVersion))
      return 'patch'
    } else {
      console.log(package.name + ' is on ' + c.yellow.bgBlack(package.version))
      console.log('no relevant commits for a new publish')
      return undefined
    }
  }
}
function npmVersion(versionKey) {
  exec('npm version ' + versionKey, function(err) {
    if (!err) {
      exec('git push --follow-tags', function(err) {
        if (!err) {
          console.log(c.green('done!'))
          console.log('\n')
        }
      })
    } else {
      console.log(c.red('failed to tag a new version'))
    }
  })
}
function testAndPushTag(versionKey) {
  console.log('\n')
  console.log('running tests')
  exec('npm test', function (err) {
    if (err) {
      console.log(c.red.bgBlack('tests failed'))
      console.log('\n')
    } else {
      console.log(c.green('pushing ' + versionKey))
      console.log('\n')
      npmVersion(versionKey)
    }
  })
}
function handleCommits(commits) {
  var property = {
    name: 'yesno',
    message: 'Push new tag [y/N]',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
  };
  var fixes = _.pluck(filterCommits(commits, '(FIX)'), 'title')
  var features = _.pluck(filterCommits(commits, '(FTR)'), 'title')
  var breaks = _.pluck(filterCommits(commits, '(BRK)'), 'title')
  console.log('\n')
  plotLevel(fixes, 'fixe(s)')
  plotLevel(features, 'feature(s)')
  plotLevel(breaks, 'break change(s)')
  console.log('\n')
  var versionKey = getNewVersion(fixes, features, breaks)
  console.log('\n')
  prompt.start()
  prompt.get(property, function (err, result) {
    if (result.yesno === 'y' || result.yesno === 'yes' || result.yesno === 'Y') {
      testAndPushTag(versionKey)
    }
  })
}
function getLogs() {
  exec(
    'git log `git describe --tags --abbrev=0 HEAD^`..HEAD --pretty=format:"%s"',
    function(error, stdout){
      var titles = stdout.split('\n')
      exec(
        'git log `git describe --tags --abbrev=0 HEAD^`..HEAD --pretty=format:"%b"',
        function(error, stdout){
          var messages = stdout.split('\n')
          handleCommits(zipCommits(titles, messages));
        }
      );
    }
  );
}

exec('git branch', function(err, stdout) {
  if (stdout.match(/master/g)) {
    getLogs()
  } else {
    console.log(c.red('you need to be on master to run this command'))
  }
})
