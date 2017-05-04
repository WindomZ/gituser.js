/**
 * Created by WindomZ on 17-5-3.
 */
const os = require('os')
const path = require('path')

const test = require('ava')

const pkg = require('../package.json')

const dir = path.join(os.homedir(), '.gituser')
const fileName = 'config.test'

const {init, write, read} = require('../lib/config').base
const {writeDefault, writeAllDefault, readDefault} = require('../lib/config')

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

test.serial('config write pass', t => {
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

test.serial('config read pass', t => {
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

test.serial('config writeDefault fail', t => {
  try {
    writeDefault()
    t.fail('Should not be error.')
  } catch (e) {
  }
  try {
    writeDefault('xxx')
    t.fail('Should not be error.')
  } catch (e) {
  }
  try {
    writeDefault('xxx', 'uuu')
    t.fail('Should not be error.')
  } catch (e) {
  }
  t.pass()
})

test.serial('config writeDefault pass1', t => {
  try {
    writeDefault('x1', 'uuu', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config writeAllDefault fail', t => {
  try {
    writeAllDefault()
    t.fail('Should not be error.')
  } catch (e) {
    t.pass()
  }
})

test.serial('config writeAllDefault pass', t => {
  try {
    writeAllDefault(readDefault())
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config readDefault pass', t => {
  try {
    t.true(!!readDefault())
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})

test.serial('config writeDefault pass2', t => {
  try {
    writeDefault('x1', 'uuu', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
  try {
    writeDefault('x2', 'uuu', 'eee')
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})
