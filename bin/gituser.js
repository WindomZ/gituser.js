#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-22.
 */
'use strict'

const process = require('process')

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
  .option('--debug', 'debug mode, such as print error tracks', null, null)

program
  .command('add <user> <name> [email]')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((user, name, email, options) => {
    noArgs = false

    add(user, name, email, options)
      .then(() => {
        console.log('Success!')
      })
      .catch(e => {
        console.error(options.parent.debug ? e : e.message)
      })
  })

program
  .command('remove <user>')
  .alias('rm')
  .action((user, options) => {
    noArgs = false

    remove(user, options)
      .then(r => {
        console.log(r ? 'Success!' : 'Not found "' + user + '"')
      })
      .catch(e => {
        console.error(options.parent.debug ? e : e.message)
      })
  })

program
  .command('list')
  .alias('ls')
  .action((options) => {
    noArgs = false

    list(options)
      .then(r => {
        console.log(r.join('\r\n'))
      })
      .catch(e => {
        console.error(options.parent.debug ? e : e.message)
      })
  })

program
  .command('set <user>')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((user, options) => {
    noArgs = false

    set(user, options)
      .then(r => {
        console.log(r ? 'Success to set user "' + user + '"' : 'Not found "' + user + '"')
      })
      .catch(e => {
        console.error(options.parent.debug ? e : e.message)
      })
  })

program
  .command('unset')
  .action((options) => {
    noArgs = false

    unset(options)
      .then()
      .catch(e => {
        console.error(options.parent.debug ? e : e.message)
      })
  })

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
