var connector = require('../../connector');
var postdb = require('../../postdb');
var moment = require('moment');
moment.locale($CONFIG.language);

var current = moment(); // now

var list = {
    '_': function list() {
        var results = [];
        results.push('<div class="ls">')
        postdb.DATA.Post.forEach(function (item, i) {
            results.push('<div><a title="' + item.title + '" href="' + $CONFIG.root + 'post/' + item.slug + '">' + item.title + '</a></div>');
        });
        results.push('</div>')
        if (results.length) {
            connector.dispatch('row-message', results.join(''), 'ls');
        }
    },
    'l': function list_l() {
        var results = [];

        results.push('<div class="ls-l">');
        results.push('<div>' + __('total') + ' ' + postdb.DATA.Post.length + '</div>');
        results.push('<div rel="x-scroll">');
        results.push('<table><tbody>');

        results.push('<tr>' +
            '<th>' + __('title') + '</th>' +
            '<th class="sep-line"></th>' +
            '<th>' + __('size') + '</th>' +
            '<th class="sep-line"></th>' +
            '<th colspan="3">' + __('created') + '</th>' +
            '<th class="sep-line"></th>' +
            '<th colspan="3">' + __('updated') + '</th>' +
            '</tr>');

        postdb.DATA.Post.forEach(function (item) {
            var date = moment(item.date), updated = moment(item.updated), formatedDate, formatedUpdated;
            if (date.year() < current.year()) {
                formatedDate = date.format('MMM D YYYY'); // 去年以前
            } else {
                formatedDate = date.format('MMM DD H:mm'); // 今年
            }

            if (updated.year() < current.year()) {
                formatedUpdated = updated.format('MMM D YYYY'); // 去年以前
            } else {
                formatedUpdated = updated.format('MMM DD H:mm'); // 今年
            }

            results.push('<tr>' +
                '<td><a href="' + $CONFIG.root + 'post/' + item.slug + '" title="' + item.title + '">' + item.title + '</a></td>' +
                '<td class="sep-line"></td>' +
                '<td>' + item.size + '</td>' +
                '<td class="sep-line"></td>' +
                '<td>' + formatedDate.replace(/\x20/g, '</td><td>') + '</td>' +
                '<td class="sep-line"></td>' +
                '<td>' + formatedUpdated.replace(/\x20/g, '</td><td>') + '</td>' +
                '</tr>');
        });
        results.push('</tbody></table>');
        results.push('</div>');
        results.push('</div>');

        if (results.length) {
            connector.dispatch('row-message', results.join(''), 'ls');
        }
    }
};


module.exports = {
    command    : 'ls',
    description: [
        [
            'ls',
            'ls',
            __('List all articles.')
        ],
        [
            '',
            'ls -l',
            __('List all articles with details.')
        ]
    ],
    main       : function (parsedCommand) {
        var call = '_';
        if ('l' in parsedCommand && parsedCommand.l === true) {
            call = 'l';
        }

        if (postdb.inited()) {
            list[call]();
        } else {
            postdb.load(function () {
                list[call]();
            });
        }
    }
};