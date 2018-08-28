var connector = require('../../connector');
var test = /^@/;

module.exports = {
    test: test,
    description: [
        [
            'tag',
            'tag',
            'list all tags.'
        ],
        [
            '',
            'tag {tag_name}',
            'list posts of given tag name.'
        ],
        [
            '',
            '@{tag_name}',
            'Simplified for "tag".'
        ]
    ],
    command: 'tag',
    main: function (parsedCommand) {
        if (test.test(parsedCommand._[0])) {
            connector.dispatch('bp-load', $CONFIG.root + $CONFIG.tag_dir + '/' + parsedCommand._[0].slice(1) + '/');
        } else if (parsedCommand._.hasOwnProperty(1)) {
            connector.dispatch('bp-load', $CONFIG.root + $CONFIG.tag_dir + '/' + parsedCommand._[1] + '/');
        }
    }
};