#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-22.
 */
'use strict'

const os = require('os')
const util = require('util')

require('colors')
const program = require('commander')

const pkg = require('../package.json')

const init = require('../lib/init')
const add = require('../lib/add')
const remove = require('../lib/remove')
const list = require('../lib/list')
const set = require('../lib/set')
const unset = require('../lib/unset')

init()

let noArgs = true

program
  .version(pkg.version)
  .description('Easily switch git users.')
  .option('--debug', 'debug mode, similar to sandbox mode', null, null)
  .option('--log', 'log method, print error tracks', null, null)

program
  .command('add <user> <name> [email]')
  .alias('save')
  .description('save the specified user configuration information')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((user, name, email, options) => {
    noArgs = false

    options.debug = options.parent.debug
    add(user, name, email, options)
      .then(() => {
        process.stdout.write('Success!'.green + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program
  .command('remove <user>')
  .alias('rm')
  .description('delete the specified user configuration information')
  .action((user, options) => {
    noArgs = false

    options.debug = options.parent.debug
    remove(user, options)
      .then(r => {
        process.stdout.write((r ? 'Success!'.green : 'Not found "'.red + user + '"'.red) + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program
  .command('list')
  .alias('ls')
  .description('list all user configuration information')
  .action((options) => {
    noArgs = false

    options.debug = options.parent.debug
    list(options)
      .then(r => {
        if (r && r.length > 0) {
          r.every(u => {
            process.stdout.write(util.format('%s %s - %s(%s)',
                '>>>'.gray, u.user.green, u.name.blue, u.email.cyan) + os.EOL)
            return true
          })
        } else {
          process.stdout.write('No user data!'.yellow + os.EOL)
        }
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program
  .command('set <user>')
  .description('set local git config user from <user> configuration information')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((user, options) => {
    noArgs = false

    options.debug = options.parent.debug
    set(user, options)
      .then(r => {
        process.stdout.write((r ? 'Success to set user "'.green +
            user + '"'.green : 'Not found "'.red + user + '"'.red) + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program
  .command('unset')
  .description('unset local git config user')
  .action((options) => {
    noArgs = false

    options.debug = options.parent.debug
    unset(options)
      .then(r => {
        process.stdout.write((r ? 'Success to unset user'.green : 'Fail to unset user'.red) + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
