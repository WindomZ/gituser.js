/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const {writeDefault: write} = require('./config')

function * add (user, name, email, options) {
  if (options.privateGithub) email = name + '@users.noreply.github.com'
  return write(user, name, email)
}

module.exports = (user, name, email, options) => new Promise(resolve => {
  resolve(add(user, name, email, options).next().value)
})
