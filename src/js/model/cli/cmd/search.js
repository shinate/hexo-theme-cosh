var connector = require('../../connector');
var postdb = require('../../postdb');
var test = /^>/;
var range = 10;

function search(word) {
    var results = [];
    var needle = new RegExp('(' + word + ')', 'gi');

    postdb.DATA.Post.forEach(function (item) {
        var match;
        var matchedContent = [];
        var matchedTitle = needle.exec(item.title);

        while (match = needle.exec(item.content)) {
            if (match != null) {
                matchedContent.push(match.input.substr(match.index - range, match[1].length + range * 2).replace(match[1], '<b>' + match[1] + '</b>'));
                if (matchedContent.length >= 3) {
                    break;
                }
            }
        }

        if (matchedTitle || matchedContent.length) {
            if (matchedTitle) {
                results.push('<div class="search-result-title-range"><a href="' + $CONFIG.root + 'post/' + item.slug + '">' + item.title.replace(needle, "<b>$1</b>") + '</a></div>');
            } else {
                results.push('<div class="search-result-title-range"><a href="' + $CONFIG.root + 'post/' + item.slug + '">' + item.title + '</a></div>');
            }
            if (matchedContent.length) {
                results.push('<div class="search-result-content-range">...' + matchedContent.join('... ...') + '...</div>');
            }
        }
    });

    if (results.length) {
        connector.dispatch('row-message', '<div class="post-title">Search result of "' + word + '"</div>');
        connector.dispatch('row-message', results.join(''), 'search');
    } else {

    }
}

module.exports = {
    test: test,
    command: 'search',
    description: [
        [
            'search',
            'search {needle}',
            __('Search with the given in the title and content from the article.')
        ],
        [
            '',
            '>{needle}',
            __('Simplified for "search".')
        ]
    ],
    main: function (parsedCommand) {
        var needle = '';
        if (test.test(parsedCommand._[0])) {
            needle = parsedCommand._.join(' ').replace(/^>[\x20]*/, '');
        } else if (parsedCommand._.hasOwnProperty(1)) {
            needle = parsedCommand._.slice(1).join(' ');
        }

        if (!needle) {
            return;
        }

        if (postdb.inited()) {
            search(needle);
        } else {
            postdb.load(function () {
                search(needle);
            });
        }
    }
};