var connector = require('../../connector');

module.exports = {
    command: 'clean',
    alias: ['clear'],
    description: [
        ['clean', 'clean', __('Clear screen.')],
        ['', 'clear', __('Alias for "clean".')],
    ],
    main: function () {
        connector.dispatch('renderer-main-clean');
    }
};