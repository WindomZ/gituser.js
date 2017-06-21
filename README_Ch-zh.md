# gituser.js

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/gituser.js.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/WindomZ/gituser.js.svg?branch=master)](https://travis-ci.org/WindomZ/gituser.js)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/gituser.js/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/gituser.js?branch=master)
[![Dependency](https://david-dm.org/WindomZ/gituser.js.svg)](https://david-dm.org/WindomZ/gituser.js)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

> 轻松切换git用户信息配置。

[![NPM](https://nodei.co/npm/gituser.png)](https://nodei.co/npm/gituser/)

[![gituser](https://img.shields.io/npm/v/gituser.svg)](https://www.npmjs.com/package/gituser)
[![status](https://img.shields.io/badge/status-stable-green.svg)](https://www.npmjs.com/package/gituser)

[English](https://github.com/WindomZ/gituser.js/blob/master/README.md#readme)

## 安装

```bash
npm install -g gituser
```

## CLI用法

```
$ gituser -h

  Usage: gituser [options] [command]


  Commands:

    add|save [options] <name> [email]  save the configuration information
    remove|rm [name]                   delete the specified [name] configuration information
    list|ls                            list all user configuration information
    set|s [options] [name]             set local git config user from [name] configuration information
    unset                              unset local git user configuration
    show                               displays the local git user configuration

  Easily switch git users.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --debug        debug mode, similar to sandbox mode
    --log          log method, print error tracks
```

更多帮助可以见[范例](#范例)

## 范例

```bash
gituser add WindomZ WindomZ@users.noreply.github.com  # 添加或覆盖'WindomZ'到清单
gituser save WindomZ --private-github                 # 同上，但是邮箱采用GitHub的私密邮箱地址
gituser rm WindomZ                                    # 从清单删除'WindomZ'
gituser rm                                            # 从清单删除选定的用户
gituser list                                          # 列出所有用户清单
gituser set WindomZ                                   # 从清单设置当前git用户和邮箱
gituser set                                           # 从清单选择并设置当前git用户和邮箱
gituser unset                                         # 清除当前git用户和邮箱
gituser show                                          # 打印展示当前git用户和邮箱
```

## 相关

[WindomZ/gituser](https://github.com/WindomZ/gituser) - 通过**Go**编写实现

## 许可

The [MIT License](https://github.com/WindomZ/gituser.js/blob/master/LICENSE)
