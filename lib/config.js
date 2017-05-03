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
  // config dir
  let stat
  try {
    stat = fs.statSync(dir)
  } catch (e) {
    stat = null
  }
  if (stat) {
    if (!stat.isDirectory()) throw new ReferenceError('Can not create config directory')
  } else {
    fs.mkdirSync(dir, 0o777)
  }

  // config file
  file = path.join(dir, file)
  try {
    stat = fs.statSync(file)
  } catch (e) {
    stat = null
  }
  if (stat) {
    if (!stat.isFile()) throw new ReferenceError('Can not create config file')
  } else {
    fs.writeFileSync(file, JSON.stringify(defaultData))
  }

  return file
}

function write (dir, file, data) {
  file = init(dir, file)
  fs.accessSync(file, fs.F_OK)

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

module.exports.base = {init, write, read}

const DefaultDir = path.join(os.homedir(), '.gituser')
const DefaultFileName = 'config.test'

function initDefault () {
  return init(DefaultDir, DefaultFileName)
}

function writeDefault (user, name, email) {
  if (!user) throw new TypeError('"user" argument must not be empty')
  if (!name) throw new TypeError('"name" argument must not be empty')
  if (!email) throw new TypeError('"email" argument must not be empty')

  let data = readDefault()
  if (!data) data = defaultData
  data.version = pkg.version

  let obj = {
    'user': user,
    'name': name,
    'email': email
  }
  data.overwrite = false
  data.users.every((u, i) => {
    if (u.user === user) {
      data.users[i] = obj
      data.overwrite = true
      return false
    }
  })
  if (!data.overwrite) data.users.push(obj)

  return write(DefaultDir, DefaultFileName, JSON.stringify(data))
}

function readDefault () {
  return read(DefaultDir, DefaultFileName)
}

module.exports = {initDefault, writeDefault, readDefault}