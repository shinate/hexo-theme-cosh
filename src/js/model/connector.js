/**
 * 页内调度
 */

function connector() {
    this.watchList = {};
}

connector.prototype.register = function (name, callback) {
    this.watchList[name] = callback;
};

connector.prototype.dispatch = function (name) {
    if (this.watchList.hasOwnProperty(name))
        return this.watchList[name].apply(null, [].concat(Array.prototype.slice.call(arguments, 1)));
};

module.exports = (function (global) {
    if (!('__CONNECTOR' in global)) {
        global.__CONNECTOR = new connector();
    }
    // 强上了window
    // if (global !== window) {
    //     window.__CONNECTOR = global.__CONNECTOR;
    // }
    return global.__CONNECTOR;
})(this || window);