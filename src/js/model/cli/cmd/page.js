var connector = require('../../connector');

module.exports = {
    command: 'page',
    description: [
        [
            'page',
            'page {page_num}',
            __('Read a list of pages.')
        ]
    ],
    main: function (parsedCommand) {
        if (parsedCommand._.hasOwnProperty(1)) {
            if (parsedCommand._[1] == 1) {
                connector.dispatch('bp-load', $CONFIG.root);
            } else {
                connector.dispatch('bp-load', $CONFIG.root + 'page/' + parsedCommand._[1]);
            }
        }
    }
};