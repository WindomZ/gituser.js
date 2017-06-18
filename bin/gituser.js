#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-22.
 */
'use strict'

const program = require('commander')

const init = require('../lib/init')
const {getOptions, add, remove, list, set, unset, show} = require('./action')

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

    add(name, email, getOptions(options))
  })

program
  .command('remove [name]')
  .alias('rm')
  .description('delete the specified [name] configuration information')
  .action((name, options) => {
    noArgs = false

    remove(name, getOptions(options))
  })

program
  .command('list')
  .alias('ls')
  .description('list all user configuration information')
  .action((options) => {
    noArgs = false

    list(getOptions(options))
  })

program
  .command('set [name]')
  .alias('s')
  .description('set local git config user from [name] configuration information')
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((name, options) => {
    noArgs = false

    set(name, getOptions(options))
  })

program
  .command('unset')
  .description('unset local git config user')
  .action((options) => {
    noArgs = false

    unset(getOptions(options))
  })

program
  .command('show')
  .description('show local git config user')
  .action((options) => {
    noArgs = false

    show(getOptions(options))
  })

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
