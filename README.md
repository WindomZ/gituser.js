# gituser.js

[![Build Status](https://travis-ci.org/WindomZ/gituser.js.svg?branch=master)](https://travis-ci.org/WindomZ/gituser.js)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Dependency](https://david-dm.org/WindomZ/gituser.js.svg)](https://david-dm.org/WindomZ/gituser.js)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

> Easily switch git users.

[![NPM](https://nodei.co/npm/gituser.png)](https://nodei.co/npm/gituser/)

[![gituser](https://img.shields.io/npm/v/gituser.svg)](https://www.npmjs.com/package/gituser)
![status](https://img.shields.io/badge/status-stable-green.svg)

## Installation

```bash
npm install -g gituser
```

## Usage

```bash
$ gituser -h

  Usage: gituser [options] [command]


  Commands:

    add [options] <user> <name> [email]  add user configuration
    remove|rm <user>                     remove user configuration
    list|ls                              list user configuration
    set [options] <user>                 set local git user configuration from <user>
    unset                                unset local git user configuration

  Easily switch git users.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --debug        debug mode, such as print error tracks
```

## Related

[WindomZ/gituser](https://github.com/WindomZ/gituser) - Written by Go

## License

The [MIT License](https://github.com/WindomZ/gituser.js/blob/master/LICENSE)
