var command = require('../command');
var pad = require('pad-right');
var nl2br = require('nl2br');
var connector = require('../../connector');

function space2nbsp(content, opts) {
    opts = Object.assign({
        space: 1,
        tab: 3,
    }, opts || {});

    return content.replace(/\x20/g, (new Array(opts.space + 1)).join('&nbsp;')).replace(/\t/g, (new Array(opts.tab + 1)).join('&nbsp;'))
}

module.exports = {
    command: 'help',
    description: 'Get help about this blog, list of commands.',
    main: function () {

        var contents = [];
        // var columnWidth = [0, 0, 0];

        Object.entries(command._CMD.__cache).forEach(function (item) {
            // console.log(item[1]);
            if (item[1].hasOwnProperty('description')) {
                if (Array.isArray(item[1].description)) {
                    item[1].description.forEach(function (row) {
                        // row.forEach(function (content, k) {
                        //     if (content && columnWidth[k] < content.length) {
                        //         columnWidth[k] = content.length;
                        //     }
                        // })
                        contents.push(row);
                    });
                } else if (typeof item[1].description === 'string') {
                    contents.push([item[1].command, item[1].command, item[1].description]);
                }

                // contents.push(['', '', '']);
            }
        });


        var sic = document.querySelector('#site-info-creativecommons');
        if (sic != null) {
            connector.dispatch('row-message', sic.innerHTML);
        }

        var cit = document.querySelector('#site-info-copyright-icp-theme');
        if (cit != null) {
            connector.dispatch('row-message', cit.innerHTML);
        }

        if (contents.length) {
            var style = 'style="padding:1px 3em 2px 0;word-break:keep-all;white-space:nowrap;"';
            var res = '<table>' +
                '<thead><tr><th align="left"' + style + '>' + [
                    'NAME',
                    'COMMAND-LINE',
                    'DESCRIPTION'
                ].join('</th><th align="left"' + style + '>') + '</th></tr></thead>' +
                '<tbody><tr>' + contents.map(function (row) {
                    return '<td valign="top"' + style + '>' + row.map(function (content, k) {
                            return nl2br(space2nbsp(content));
                        }).join('</td><td valign="top"' + style + '>') + '</td>';
                }).join('</tr><tr>') + '</tr></tbody>' +
                '</table>';
            connector.dispatch('row-message', res, 'ansi');
        }
    }
};
