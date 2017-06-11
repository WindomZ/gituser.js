/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const shell = require('shelljs')

const {readDefault: read} = require('./config')

function * set (name, options) {
  let data = read(options.debug)
  if (!data) return false

  let obj = null
  data.users.every(u => {
    if (u.name === name) {
      obj = u
      return false
    }
    return true
  })
  if (!obj) return null

  if (!shell.which('git')) {
    throw new ReferenceError('Sorry, this script requires git')
  }

  if (options.privateGithub) obj.email = obj.name + '@users.noreply.github.com'

  let cmd = 'git config user.name ' + obj.name
  if (shell.exec(cmd).code !== 0) {
    throw new ReferenceError('Error: "' + cmd + '" commit failed')
  }

  cmd = 'git config user.email ' + obj.email
  if (shell.exec(cmd).code !== 0) {
    throw new ReferenceError('Error: "' + cmd + '" commit failed')
  }

  return obj
}

module.exports = (name, options) => new Promise(resolve => {
  resolve(set(name, options).next().value)
})
