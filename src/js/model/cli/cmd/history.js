var connector = require('../../connector');
var cli = require('../../cli');

module.exports = {
    command: 'history',
    main: function (parsedCommand) {
        if (parsedCommand._.hasOwnProperty(1))
            switch (parsedCommand._[1]) {
                case 'clean':
                case 'clear':
                    cli.historyClear();
                    connector.dispatch('row-message', 'All histories has been cleaned!');
                    break;
                case 'list':
                    connector.dispatch('row-message', cli.history.join('<br>'));
                    break;
            }
    }
};