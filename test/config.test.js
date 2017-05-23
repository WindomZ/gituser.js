/**
 * Created by WindomZ on 17-5-3.
 */
const os = require('os')
const path = require('path')
const fs = require('fs')

const test = require('ava')

const pkg = require('../package.json')

const dir = path.join(os.homedir(), '.gituser')
const fileName = 'config.test'

const {init, write, read} = require('../lib/config').base
const {initDebug, writeDebug, writeAllDebug, readDebug} = require('../lib/config').debug

const _init = require('../lib/init')

test.serial('init pass', t => {
  try {
    _init()
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config init', t => {
  try {
    fs.unlinkSync(path.join(dir, fileName))
    fs.unlinkSync(path.join(dir, 'config.debug'))
  } catch (e) {
  }
  t.pass()
})

test.serial('config init pass', t => {
  try {
    init(dir, fileName)
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config init fail', t => {
  try {
    init(path.join(dir, fileName), fileName)
    t.fail('Should not be directory.')
  } catch (e) {
    t.pass()
  }
})

test.serial('config write pass1', t => {
  try {
    let file = write(dir, fileName, null)
    t.true(!!file)
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config read fail', t => {
  try {
    let obj = read(dir, fileName)
    t.false(!!obj)
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config write pass2', t => {
  try {
    let file = write(dir, fileName, {
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
    let obj = read(dir, fileName)
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
    t.fail('Should not be error.')
  } catch (e) {
  }
  try {
    writeDebug('xxx')
    t.fail('Should not be error.')
  } catch (e) {
  }
  try {
    writeDebug('xxx', 'uuu')
    t.fail('Should not be error.')
  } catch (e) {
  }
  t.pass()
})

test.serial('config writeDebug pass1', t => {
  try {
    writeDebug('x1', 'uuu', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config writeAllDebug fail', t => {
  try {
    writeAllDebug()
    t.fail('Should not be error.')
  } catch (e) {
    t.pass()
  }
})

test.serial('config writeAllDebug pass', t => {
  try {
    console.log(readDebug())
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
    writeDebug('x1', 'uuu', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
  try {
    writeDebug('x2', 'uuu', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})
