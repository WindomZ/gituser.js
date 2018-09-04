/**
 * Created by WindomZ on 17-5-3.
 */
'use strict'

const os = require('os')
const path = require('path')
const fs = require('fs')

const test = require('ava')

const pkg = require('../package.json')

const testDir = path.join(os.homedir(), '.gituser-test')
const testFileName = 'config.test'

const { init, write, read } = require('../lib/config').base
const { writeAllDefault, readDefault } = require('../lib/config')
const { initDebug, writeDebug, writeAllDebug, readDebug } = require('../lib/config').debug

const _init = require('../lib/init')

function rmdirSync (dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function (f) {
      let curPath = path.join(dir, f)
      if (fs.lstatSync(curPath).isDirectory()) {
        rmdirSync(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(dir)
  }
}

test.serial('start', t => {
  try {
    rmdirSync(testDir)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('init pass', t => {
  try {
    _init()
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config init pass', t => {
  fs.mkdirSync(testDir, 0o777)
  fs.mkdirSync(path.join(testDir, testFileName), 0o777)
  try {
    init(testDir, testFileName)
    t.fail('Should be error!')
  } catch (e) {
    t.true(!!e)
  }
  fs.rmdirSync(path.join(testDir, testFileName))
  fs.rmdirSync(testDir)
  try {
    init(testDir, testFileName)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config init fail', t => {
  try {
    init(path.join(testDir, testFileName), testFileName)
    t.fail('Should not be directory.')
  } catch (e) {
    t.true(!!e)
  }
  t.pass()
})

test.serial('config write pass1', t => {
  try {
    let file = write(testDir, testFileName, null)
    t.true(!!file)
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config read fail', t => {
  try {
    let obj = read(testDir, testFileName)
    t.false(!!obj)
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config write pass2', t => {
  try {
    let file = write(testDir, testFileName, {
      'version': pkg.version,
      'users': [{
        'user': 'xxx',
        'name': 'uuu',
        'email': 'eee'
      }]
    })
    t.true(!!file)
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config read pass2', t => {
  try {
    let obj = read(testDir, testFileName)
    t.true(!!obj)
    obj.users.every(u => {
      if (u.user === 'xxx') {
        t.pass()
        return false
      }
      return true
    })
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config initDebug pass', t => {
  try {
    initDebug()
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config writeDebug fail', t => {
  try {
    writeDebug()
    t.fail('Should be error.')
  } catch (e) {
    t.true(!!e)
  }
  try {
    writeDebug('xxx')
    t.fail('Should be error.')
  } catch (e) {
    t.true(!!e)
  }
  try {
    writeDebug('xxx', 'uuu')
  } catch (e) {
    t.fail('Should not be error.')
  }
  t.pass()
})

test.serial('config writeDebug pass1', t => {
  try {
    writeDebug('x1', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config writeAllDebug fail', t => {
  try {
    writeAllDebug()
    t.fail('Should be error.')
  } catch (e) {
    t.pass()
  }
})

test.serial('config writeAllDebug pass', t => {
  try {
    writeAllDebug(readDebug())
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config readDebug pass', t => {
  try {
    t.true(!!readDebug())
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config writeDebug pass2', t => {
  try {
    writeDebug('x1', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
  try {
    writeDebug('x2', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config Default pass', t => {
  try {
    writeAllDefault(readDefault())
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('end', t => {
  try {
    rmdirSync(testDir)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})
