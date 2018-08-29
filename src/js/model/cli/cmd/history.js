var connector = require('../../connector');
var cli = require('../../cli');

module.exports = {
    command: 'history',
    description: [
        [
            'history',
            'history [list]',
            __('List all histories')
        ],
        [
            '',
            'history clean',
            __('Clear all histories.')
        ],
        [
            '',
            'history clear',
            __('Alias for "history clean".')
        ],
    ],
    main: function (parsedCommand) {
        // if (parsedCommand._.hasOwnProperty(1))
        switch (parsedCommand._[1]) {
            case 'clean':
            case 'clear':
                cli.historyClear();
                connector.dispatch('row-message', 'All histories has been cleaned!');
                break;
            case 'list':
            default:
                connector.dispatch('row-message', cli.history.join('<br>'));
                break;
        }
    }
};