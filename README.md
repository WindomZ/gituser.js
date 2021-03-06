```

  ______ _____ _______ _     _ _______ _______  ______
 |  ____   |      |    |     | |______ |______ |_____/
 |_____| __|__    |    |_____| ______| |______ |    \_
                                                      

```

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/gituser.js.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/WindomZ/gituser.js.svg?branch=master)](https://travis-ci.org/WindomZ/gituser.js)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/gituser.js/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/gituser.js?branch=master)
[![Dependency](https://david-dm.org/WindomZ/gituser.js.svg)](https://david-dm.org/WindomZ/gituser.js)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

> Easily switch and manage git config users.

[![NPM](https://nodei.co/npm/gituser.png)](https://nodei.co/npm/gituser/)

[![gituser](https://img.shields.io/npm/v/gituser.svg)](https://www.npmjs.com/package/gituser)
[![status](https://img.shields.io/badge/status-stable-brightgreen.svg)](https://www.npmjs.com/package/gituser)

[中文文档](https://github.com/WindomZ/gituser.js/blob/master/README_Ch-zh.md#readme)

## Install

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
    unset                              unset local git user configuration
    show                               displays the local git user configuration

  Easily switch git users.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --debug        debug mode, similar to sandbox mode
    --log          log method, print error tracks
```

For more help, see [Example](#example)

## Examples

```bash
gituser add WindomZ WindomZ@users.noreply.github.com  # Save 'WindomZ' into lists
gituser save WindomZ --private-github                 # Ibid, but email is GitHub privacy address
gituser rm WindomZ                                    # Delete 'WindomZ' from lists
gituser rm                                            # Delete the selected user from lists
gituser list                                          # List all saved user lists
gituser set WindomZ                                   # Set local git user and email
gituser set                                           # Set local git selected user and email
gituser unset                                         # Unset local git user configuration
gituser show                                          # Displays the local git user configuration
```

## Contributing

Welcome to pull requests, report bugs, suggest ideas and discuss **gituser.js**, 
i would love to hear what you think about **gituser.js** on [issues page](https://github.com/WindomZ/gituser.js/issues).

If you like it then you can put a :star: on it.

## License

[MIT](https://github.com/WindomZ/gituser.js/blob/master/LICENSE)
