/**
 * Created by WindomZ on 17-6-11.
 */
'use strict'

const os = require('os')
const util = require('util')

require('colors')

const _add = require('../lib/add')
const _remove = require('../lib/remove')
const _list = require('../lib/list')
const _set = require('../lib/set')
const _unset = require('../lib/unset')
const _select = require('../lib/select')
const _show = require('../lib/show')

function getOptions (options) {
  if (options && options.parent) { options.debug = options.parent.debug }
  return options
}

function add (name, email, options) {
  _add(name, email, options)
    .then(() => {
      process.stdout.write('Success!'.green + os.EOL)
    })
    .catch(e => {
      console.error(options.parent.log ? e : e.message)
    })
}

function remove (name, options) {
  if (name) {
    _remove(name, options)
      .then(r => {
        process.stdout.write((r ? 'Success!'.green : 'Not found "'.red +
            name + '"'.red) + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  } else {
    _select(options)
      .then(answer => {
        if (answer && answer.user) {
          remove(answer.user, options)
        } else {
          process.stdout.write('No user!'.yellow + os.EOL)
        }
      })
  }
}

function list (options) {
  _list(options)
    .then(r => {
      if (r && r.length > 0) {
        r.every(u => {
          process.stdout.write(util.format('%s %s %s',
              '-'.gray, u.name.green, ('<' + u.email + '>').blue) +
            os.EOL)
          return true
        })
      } else {
        process.stdout.write(util.format('%s %s',
            '-'.gray, 'No user data!'.yellow) +
          os.EOL)
      }
    })
    .catch(e => {
      console.error(options.parent.log ? e : e.message)
    })
}

function set (name, options) {
  if (name) {
    _set(name, options)
      .then(r => {
        process.stdout.write((r ? 'Success to set user <'.green +
            name + '>'.green : 'Not found "'.red + name + '"'.red) + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  } else {
    _select(options)
      .then(answer => {
        if (answer && answer.user) {
          set(answer.user, options)
        } else {
          process.stdout.write('No user!'.yellow + os.EOL)
        }
      })
  }
}

function unset (options) {
  _unset(options)
    .then(r => {
      process.stdout.write((r ? 'Success to unset user'.green : 'Fail to unset user'.red) +
        os.EOL)
    })
    .catch(e => {
      console.error(options.parent.log ? e : e.message)
    })
}

function show (options) {
  _show(options)
    .then(r => {
      process.stdout.write((r ? r.join(os.EOL).green : 'Not found user.* config'.red) + os.EOL)
    })
    .catch(e => {
      console.error(options.parent.log ? e : e.message)
    })
}

module.exports = {getOptions, add, remove, list, set, unset, show}
