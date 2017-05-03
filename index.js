/**
 * Created by WindomZ on 17-4-22.
 */
'use strict'

const init = require('./lib/init')
const add = require('./lib/add')
const remove = require('./lib/remove')
const list = require('./lib/list')
const set = require('./lib/set')
const unset = require('./lib/unset')

module.exports = init

module.exports.add = add
module.exports.remove = remove
module.exports.list = list
module.exports.add = set
module.exports.unset = unset
