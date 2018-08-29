/**
 * Created by shinate on 2018/4/27.
 */

var argsParser = require('yargs-parser');
var connector = require('./connector');

var history = {
    load: function () {
        return JSON.parse(window.localStorage.getItem('cosh_cli_history'));
    },
    save: function (history) {
        window.localStorage.setItem('cosh_cli_history', JSON.stringify(history));
    },
    clear: function () {
        window.localStorage.removeItem('cosh_cli_history');
    }
};

function CLI(node) {
    this.history = history.load() || [];
    this.historyChosed = null;

    if (node != null) {
        this.listen(node);
    }
}

CLI.prototype.listen = function (node) {
    this.node = node;
    this.inputing = node.getElementsByClassName('inputing')[0];
    this.prompt = node.getElementsByClassName('prompt')[0];
    this.inputing.addEventListener('keydown', this.input.bind(this), true);
    this.node.addEventListener('focus', this.inputFocus.bind(this), false);
    window.addEventListener('keydown', this.inputFocusFromOutter.bind(this), true);
};

CLI.prototype.input = function (e) {
    // console.log(e);
    switch (e.key) {
        case 'Enter':
            if (!e.shiftKey) {
                e.preventDefault();
                var content = this.getInputContent();
                this.clean();
                this.exec(content);
                return false;
            }
            break;
        case 'ArrowUp':
            if (this.history.length) {
                if (this.historyChosed == null) {
                    this.historyChosed = this.history.length;
                }
                if (this.historyChosed <= 0) {
                    this.historyChosed = this.history.length;
                }
                this.setInputContent(this.history[--this.historyChosed]);
            }
            break;
        case 'ArrowDown':
            if (this.history.length) {
                if (this.historyChosed == null) {
                    this.historyChosed = 0;
                }
                if (this.historyChosed >= this.history.length - 1) {
                    this.historyChosed = -1;
                }
                this.setInputContent(this.history[++this.historyChosed]);
            }
            break;
    }
};

CLI.prototype.historyClear = function () {
    history.clear();
    this.history = [];
    this.historyChosed = null;
};

CLI.prototype.inputFocusFromOutter = function (e) {
    if (e.key === 'Enter' && e.target != this.inputing) {
        this.inputFocus();
        e.preventDefault();
    }
};

CLI.prototype.inputFocus = function () {
    this.inputing.focus();
};

CLI.prototype.setInputContent = function (content) {
    this.inputing.innerText = content || '';
};

CLI.prototype.getInputContent = function () {
    return this.inputing.innerText;
};

CLI.prototype.clean = function () {
    this.inputing.innerText = '';
};

CLI.prototype.exec = function (content) {

    connector.dispatch('row-message', this.prompt.innerText + content);
    connector.dispatch('scrollTo', ':bottom');

    var parsed = argsParser(content);
    if (!parsed._.hasOwnProperty(0)) {
        return false;
    }
    this.history.push(content);
    this.historyChosed = this.history.length;
    history.save(this.history);
    connector.dispatch('command', parsed);
};

module.exports = (function (global) {
    if (!('__CLI' in global)) {
        global.__CLI = new CLI();
    }
    return global.__CLI;
})(this || window);