/**
 * Created by WindomZ on 17-6-18.
 */
'use strict'

const shell = require('shelljs')

function * show (options) {
  if (!shell.which('git')) {
    throw new ReferenceError('Sorry, this script requires git')
  }

  let cmd = 'git config -l'
  let stdout = shell.exec(cmd, { silent: true }).stdout
  if (!stdout) {
    return []
  }

  return yield stdout.match(/user.(name|email)=.+/gi)
}

module.exports = (options) => new Promise(resolve => {
  resolve(show(options).next().value)
})
