/**
 * Created by WindomZ on 17-6-11.
 */
'use strict'

const inquirer = require('inquirer')

const {readDefault: read} = require('./config')

function * select (options) {
  let obj = read(options.debug)
  if (!obj) return null

  let list = []
  obj.users.every(u => {
    if (u && u.name.length > 0) {
      list.push({
        name: u.name + ' <' + u.email + '>',
        value: u.name,
        short: u.name,
      })
    }
    return true
  })

  if (!list.length) return null

  return yield inquirer.prompt([{
    type: 'list',
    name: 'user',
    message: 'Please select the user:',
    choices: list
  }])
}

module.exports = (options) => new Promise(resolve => {
  let r = select(options)
  if (r) {
    resolve(r.next().value)
  } else {
    resolve()
  }
})
