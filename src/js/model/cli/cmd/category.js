var connector = require('../../connector');
var test = /^&/;

module.exports = {
    test: test,
    description: [
        [
            'category',
            'category',
            __('list all categories.')
        ],
        [
            '',
            'category {category_name}',
            __('list posts of given category name.')
        ],
        [
            '',
            '&{category_name}',
            __('Simplified for "category".')
        ]
    ],
    command: 'category',
    main: function (parsedCommand) {
        if (test.test(parsedCommand._[0])) {
            connector.dispatch('bp-load', $CONFIG.root + $CONFIG.category_dir + '/' + parsedCommand._[0].slice(1) + '/');
        } else if (parsedCommand._.hasOwnProperty(1)) {
            connector.dispatch('bp-load', $CONFIG.root + $CONFIG.category_dir + '/' + parsedCommand._[1] + '/');
        } else {
            connector.dispatch('bp-load', $CONFIG.root + $CONFIG.category_dir + '/');
        }
    }
};