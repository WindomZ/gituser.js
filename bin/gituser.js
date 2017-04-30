#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-22.
 */
'use strict'

const process = require('process')

const program = require('commander')

const pkg = require('../package.json')

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
    console.log('add %j %j %j', user, name, email)
  }
  )

program
  .command('remove <user>')
  .alias('rm')
  .action((user, options) => {
    noArgs = false
    console.log('remove %j', user)
  }
  )

program
  .command('list')
  .alias('ls')
  .action((options) => {
    noArgs = false
    console.log('list')
  }
  )

program
  .command('set <user>')
  .option('-g --global', 'set global git user configuration', null, null)
  .option('--private-github', 'private email address for GitHub', null, null)
  .action((user, options) => {
    noArgs = false
    console.log('set %j', user)
  }
  )

program
  .command('unset')
  .action((options) => {
    noArgs = false
    console.log('unset')
  }
  )

program.parse(process.argv)

if (noArgs) {
  program.outputHelp()
}
