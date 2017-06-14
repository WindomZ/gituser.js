/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const {writeDefault: write} = require('./config')

function * add (name, email, options) {
  if (!email || (options && options.privateGithub)) email = name + '@users.noreply.github.com'
  return write(name, email, options && options.debug)
}

module.exports = (name, email, options) => new Promise(resolve => {
  resolve(add(name, email, options).next().value)
})
