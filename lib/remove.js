/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const {writeAllDefault: write, readDefault: read} = require('./config')

function * remove (name, options) {
  let obj = read(options.debug)
  if (!obj) return false

  let result = false
  obj.users.every((u, i) => {
    if (u.name === name) {
      obj.users.splice(i, 1)
      if (write(obj, options.debug)) result = true
      return false
    }
    return true
  })

  return result
}

module.exports = (name, options) => new Promise(resolve => {
  resolve(remove(name, options).next().value)
})
