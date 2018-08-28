var connector = require('../../connector');

module.exports = {
    command: 'clean',
    alias: ['clear'],
    description: [
        ['clean', 'clean', 'Clear screen.'],
        ['', 'clear', 'Alias for "clean".'],
    ],
    main: function () {
        connector.dispatch('renderer-main-clean');
    }
};