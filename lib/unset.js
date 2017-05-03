/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const shell = require('shelljs')

function * unset (options) {
  if (!shell.which('git')) {
    throw new ReferenceError('Sorry, this script requires git')
  }

  let cmd = 'git config --unset user.name'
  if (shell.exec(cmd).code !== 0) {
    throw new ReferenceError('Error: "' + cmd + '" commit failed')
  }

  cmd = 'git config --unset user.email'
  if (shell.exec(cmd).code !== 0) {
    throw new ReferenceError('Error: "' + cmd + '" commit failed')
  }

  return true
}

module.exports = (options) => new Promise(resolve => {
  resolve(unset(options).next().value)
})
