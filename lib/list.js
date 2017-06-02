/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const {readDefault: read} = require('./config')

function * list (options) {
  let obj = read(options.debug)
  if (!obj) return null

  let result = []
  obj.users.every(u => {
    if (u && u.name.length > 0) result.push(u)
    return true
  })

  return result
}

module.exports = (options) => new Promise(resolve => {
  resolve(list(options).next().value)
})
