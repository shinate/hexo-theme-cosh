/**
 * 页内调度
 */

function postdb() {
    this.DATA = null;
}

postdb.prototype.inited = function () {
    return this.DATA !== null
}

postdb.prototype.load = function (callback) {
    $.getJSON($CONFIG.root + 'search-index.json', function (data) {
        if ($.isPlainObject(data)) {
            this.DATA = data;
            typeof callback === 'function' && callback();
        }
    }.bind(this));
};

/**
 * connector
 */
module.exports = (function (global) {
    if (!('__POST_DB' in global)) {
        global.__POST_DB = new postdb();
    }
    // 强上了window
    // if (global !== window) {
    //     window.__CONNECTOR = global.__CONNECTOR;
    // }
    return global.__POST_DB;
})(this || window);