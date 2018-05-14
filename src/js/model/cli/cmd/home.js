var connector = require('../../connector');

module.exports = {
    command: 'home',
    main: function () {
        connector.dispatch('bp-load', '/b/');
    }
};