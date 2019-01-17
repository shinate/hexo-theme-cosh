var ls = require('./ls')

module.exports = {
    command    : 'll',
    description: [
        [
            'll',
            'll',
            __('Alias for "ls -l".')
        ]
    ],
    main       : function (parsedCommand) {
        parsedCommand.l = true;
        ls.main(parsedCommand)
    }
};