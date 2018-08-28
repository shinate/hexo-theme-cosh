var connector = require('../../connector');
var defaultSize;

module.exports = {
    command: 'font-size',
    alias: ['fontSize'],
    description: [
        [
            'font-size',
            'font-size',
            'Show current font size (px)'
        ],
        [
            '',
            'font-size {size}',
            "Set the font size in different ways\nThe \"size\" can be: multiple, percentage (%), pixels (px)"
        ],
        [
            '',
            'fontSize',
            'Alias for "font-size".'
        ]
    ],
    main: function (parsedCommand) {
        var currentSize = parseInt(document.body.computedStyleMap().get('font-size').toString());
        if (parsedCommand._.hasOwnProperty(1)) {
            var size = parsedCommand._[1];
            if (defaultSize == null) {
                defaultSize = currentSize;
            }
            if (size == 'default') {
                size == defaultSize;
            } else if (/%$/.test(size)) {
                size = defaultSize * (parseInt(size.slice(0, size.length - 1)) / 100);
            } else if (/^\d+(\.\d+)?$/.test(size)) {
                size = defaultSize * parseFloat(size);
            } else if (/px$/.test(size)) {
                size = parseInt(size);
                if (size < 12)
                    size = 12;
            }
            size += 'px';
            var node = document.getElementById('font_size');
            if (!node) {
                node = document.createElement('style');
                node.setAttribute('id', 'font_size');
            }
            document.head.appendChild(node);
            node.innerText = 'body{font-size:' + size + '}';
            connector.dispatch('scrollTo', ':bottom');
        } else {
            connector.dispatch('row-message', 'Current font-size is ' + currentSize + 'px');
        }
    }
};