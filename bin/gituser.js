#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-22.
 */
'use strict'

const os = require('os')
const util = require('util')

require('colors')
const program = require('commander')

const init = require('../lib/init')
const add = require('../lib/add')
const remove = require('../lib/remove')
const list = require('../lib/list')
const set = require('../lib/set')
const unset = require('../lib/unset')

init()

let noArgs = true

program
  .version(require('../package.json').version)
  .description('Easily switch git users.')
  .option('--debug', 'debug mode, similar to sandbox mode', null, null)
  .option('--log', 'log method, print error tracks', null, null)

program
  .command('add <name> [email]')
  .alias('save')
  .description('save the configuration information')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((name, email, options) => {
    noArgs = false

    options.debug = options.parent.debug
    add(name, email, options)
      .then(() => {
        process.stdout.write('Success!'.green + os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program
  .command('remove [name]')
  .alias('rm')
  .description('delete the specified [name] configuration information')
  .action((name, options) => {
    noArgs = false

    options.debug = options.parent.debug
    remove(name, options)
      .then(r => {
        process.stdout.write((r ? 'Success!'.green : 'Not found "'.red +
            name + '"'.red) + os.EOL)
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
  })

program
  .command('set [name]')
  .alias('s')
  .description('set local git config user from [name] configuration information')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((name, options) => {
    noArgs = false

    options.debug = options.parent.debug
    set(name, options)
      .then(r => {
        process.stdout.write((r ? 'Success to set user <'.green +
            name + '>'.green : 'Not found "'.red + name + '"'.red) + os.EOL)
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
        process.stdout.write((r ? 'Success to unset user'.green : 'Fail to unset user'.red) +
          os.EOL)
      })
      .catch(e => {
        console.error(options.parent.log ? e : e.message)
      })
  })

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
