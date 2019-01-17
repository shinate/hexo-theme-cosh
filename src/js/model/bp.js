/**
 * Created by shinate on 2018/4/26.
 */

require('../lib/iframe-ready')

var md5 = require('md5');
var connector = require('./connector');
var ua = window.navigator.userAgent.toLowerCase();
var positionToBottom;

// !! SUPPORT BP !!
if (!/msie/.test(ua) && !(/gecko/.test(ua) && !/(compatible|webkit)/.test(ua)) && 'pushState' in window.history) {
    $(document).on('click', 'a', linkHandle);
    $(window).on('popstate', popHandle);
}

var main = $('#main');
var win = $(window);

function linkHandle(e) {
    var url = $(this).attr('href');
    $(this).blur();

    var name = '#BP_' + md5(url);
    if ($(name).length) {
        e.preventDefault();
        document.location.href = name;
    } else if (url.indexOf('/') === 0) {
        e.preventDefault();
        load(url);
        return false;
    }
}

/**
 * History
 */
function popHandle(e) {
    try {
        _load(window.history.state.URL)
            .then(function () {
                connector.dispatch('scrollTo', ':bottom');
            })
            .catch(function () {
            });
    } catch (err) {
        e.preventDefault();
    }
}

function load(url) {
    _load(url)
        .then(function (id) {
            window.history.pushState({URL: url}, null, url);

            if (positionToBottom < $(window).height()) {
                connector.dispatch('scrollTo', ':bottom');
            } else {
                connector.dispatch('scrollTo', $('#' + id));
            }
        })
        .catch(function (e) {
            console.log(e)
            connector.dispatch('row-message', '[FAIL] BP:Page can not be found!', 'error');
        })
}

/**
 * promise load
 *
 * @param url
 * @returns {Promise}
 * @private
 */
function _load(url) {
    var frameLoader = $('<iframe style="display: none;"></iframe>');
    // var name = 'BP_' + (+new Date);
    var name = 'BP_' + md5(url);

    return new Promise(function (resolve, reject) {
        frameLoader.frameReady(function () {
            var el = $(this);
            if (window._b_p_active_name === name) {
                positionToBottom = main.height() - win.scrollTop() - win.height();
                var container = $(window.frames[name].document).find('#wrap > section.container');
                if (container.length) {
                    connector.dispatch('renderer-main', $('<section></section>')
                        .addClass('container')
                        .attr('id', name)
                        .html(container.html()))
                        .find('pre code')
                        .each(function (_, node) {
                            window.hljs.highlightBlock(node)
                        });
                    connector.dispatch('renderer-title', $(window.frames[name].document).find('title').text());
                    resolve(name);
                } else {
                    reject();
                }
            }
            el.off('load', arguments.callee);
            el.remove();
            el = null;
        });

        frameLoader.attr('src', url + '#_b_p_');
        frameLoader.attr('name', name);
        frameLoader.appendTo($(document.body));
        // lock
        window._b_p_active_name = name;
    });
}

connector.register('bp-load', load);