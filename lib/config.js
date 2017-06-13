/**
 * Created by WindomZ on 17-5-2.
 */
'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')

const pkg = require('../package.json')

const defaultData = {
  'version': pkg.version,
  'users': []
}

function init (dir, file) {
  let stat = null
  // config dir
  try {
    stat = fs.statSync(dir)
  } catch (e) {
    fs.mkdirSync(dir, 0o777)
  }
  if (stat && !stat.isDirectory()) {
    throw new ReferenceError('Can not create config directory')
  }

  stat = null
  // config file
  file = path.join(dir, file)
  try {
    stat = fs.statSync(file)
  } catch (e) {
    fs.writeFileSync(file, JSON.stringify(defaultData))
  }
  if (stat && !stat.isFile()) {
    throw new ReferenceError('Can not create config file')
  }

  return file
}

function write (dir, file, data) {
  file = init(dir, file)
  fs.accessSync(file, fs.F_OK)

  if (typeof data === 'object') data = JSON.stringify(data)
  fs.writeFileSync(file, data)

  return file
}

function read (dir, file) {
  file = init(dir, file)
  fs.accessSync(file, fs.R_OK)

  let data = '' + fs.readFileSync(file)
  if (data.length === 0) return null

  let obj = JSON.parse(data)
  if (!obj || typeof obj !== 'object') return null
  return obj
}

const DefaultDir = path.join(os.homedir(), '.gituser')
const DefaultFileName = 'config'

function initDefault (debug = false) {
  return init(DefaultDir, debug ? DebugFileName : DefaultFileName)
}

function writeDefault (name, email, debug = false) {
  if (!name) throw new TypeError('"name" argument must not be empty')
  if (!email) throw new TypeError('"email" argument must not be empty')

  let data = readDefault(debug)
  if (!data) data = defaultData
  data.version = pkg.version

  let obj = {
    'name': name,
    'email': email
  }

  data.overwrite = false
  data.users.every((u, i) => {
    if (u.name === name) {
      data.users[i] = obj
      data.overwrite = true
      return false
    }
    return true
  })
  if (!data.overwrite) data.users.push(obj)

  return write(DefaultDir, debug ? DebugFileName : DefaultFileName, JSON.stringify(data))
}

function writeAllDefault (data, debug = false) {
  if (!data) throw new TypeError('"data" argument must not be empty')
  if (typeof data === 'object') {
    data.overwrite = true
    data = JSON.stringify(data)
  }
  return write(DefaultDir, debug ? DebugFileName : DefaultFileName, data)
}

function readDefault (debug = false) {
  return read(DefaultDir, debug ? DebugFileName : DefaultFileName)
}

const DebugFileName = 'config.debug'

function initDebug () {
  return initDefault(true)
}

function writeDebug (name, email) {
  return writeDefault(name, email, true)
}

function writeAllDebug (data) {
  return writeAllDefault(data, true)
}

function readDebug () {
  return readDefault(true)
}

module.exports = {initDefault, writeDefault, writeAllDefault, readDefault}
module.exports.debug = {initDebug, writeDebug, writeAllDebug, readDebug}

module.exports.base = {init, write, read}
