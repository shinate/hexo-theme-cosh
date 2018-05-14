var connector = require('../connector');

var CMD = {
    __cache: {},
    test: [],
    command: {}
};

function register(name, config) {
    if (name && config.hasOwnProperty('main')) {
        CMD.__cache[name] = config;

        if (config.hasOwnProperty('test')) {
            CMD.test.push([config.test, name]);
        }

        if (config.hasOwnProperty('command')) {
            CMD.command[config.command] = name;
            if (config.hasOwnProperty('alias')) {
                config.alias.forEach(function (c) {
                    CMD.command[c] = name;
                });
            }
        }
    }
}

function dispatch(parsedCommand) {
    var command = parsedCommand._[0];

    if (CMD.test.length > 0) {
        for (var i = 0, len = CMD.test.length; i < len; i++) {
            if (CMD.test[i][0].test(command)) {
                CMD.__cache[CMD.test[i][1]].main(parsedCommand);
                return;
            }
        }
    }

    if (CMD.command.hasOwnProperty(command)) {
        CMD.__cache[CMD.command[command]].main(parsedCommand);
        return;
    }

    connector.dispatch('row-message', 'cosh: command not found: ' + command);
}

module.exports = {
    _CMD: CMD,
    register: register,
    dispatch: dispatch,
};