var connector = require('../model/connector');
require('../model/profile').autoload();
require('../model/cli').listen(document.getElementById('cli'));
require('../model/bp');
require('../model/renderer');

/**
 * 命令
 */
connector.register('command', require('../model/cli/index').dispatch);

/**
 * 行内消息
 */
connector.register('row-message', function rowMessage(message, type) {
    var type = type || 'info';

    var msgEl = $('<section class="command"><i class="command-row-message command-row-message-' + type + '">' + message + '</i></section>');
    connector.dispatch('renderer-main', msgEl);
    connector.dispatch('scrollTo', ':bottom');
});

/**
 * 滚动到
 */
connector.register('scrollTo', function scrollTo(where) {

    var pos = null;

    switch (where) {
        case ':top':
            pos = 0;
            break;
        case ':bottom':
            pos = $('#main').height() - $(window).height();
            break;
        default:
            var target = $(where);
            if (target.length) {
                pos = target.position().top;
            }
            break;
    }

    if (pos != null) {
        $(window).scrollTop(pos);
    }
});