/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const util = require('util')

const {readDefault: read} = require('./config')

function * list (options) {
  let obj = read()
  if (!obj) return null

  let result = []
  obj.users.every(u => {
    result.push(util.format('>>> %s - %s(%s)', u.user, u.name, u.email))
    return true
  })

  return result
}

module.exports = (options) => new Promise(resolve => {
  resolve(list(options).next().value)
})
