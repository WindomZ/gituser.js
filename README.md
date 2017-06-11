# gituser.js

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/gituser.js.svg)](https://greenkeeper.io/)
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

    add|save [options] <name> [email]  save the configuration information
    remove|rm [name]                   delete the specified [name] configuration information
    list|ls                            list all user configuration information
    set|s [options] [name]             set local git config user from [name] configuration information
    unset                              unset local git config user

  Easily switch git users.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --debug        debug mode, similar to sandbox mode
    --log          log method, print error tracks
```

## Example

```bash
$ gituser add WindomZ WindomZ@users.noreply.github.com  # Save 'WindomZ' into configuration file
$ gituser save WindomZ --private-github                 # Ibid, but email is GitHub privacy address
$ gituser rm WindomZ                                    # Delete selected from configuration file
$ gituser rm                                            # Delete 'WindomZ' from configuration file
$ gituser list                                          # List all saved users
$ gituser set WindomZ                                   # Set local git user and email
$ gituser set                                           # Set local git selected user and email
$ gituser unset                                         # Unset local git user and email
```

## Related

[WindomZ/gituser](https://github.com/WindomZ/gituser) - Written in **Go**

## License

The [MIT License](https://github.com/WindomZ/gituser.js/blob/master/LICENSE)
