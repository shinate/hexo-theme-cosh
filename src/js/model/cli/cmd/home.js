var connector = require('../../connector');

module.exports = {
    command: 'home',
    description: 'Blog HOME Page',
    main: function () {
        connector.dispatch('bp-load', '/b/');
    }
};