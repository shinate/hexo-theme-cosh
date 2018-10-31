var connector = require('../../connector');

module.exports = {
    command: 'home',
    description: __('Blog HOME Page'),
    main: function () {
        connector.dispatch('bp-load', $CONFIG.root);
    }
};