var connector = require('./connector');

var main = $('.wrap');
var title = $('title');

connector.register('renderer-main', function (element) {
    return ($.zepto.isZ(element) ? element : $(element)).appendTo(main);
});

connector.register('renderer-title', function (text) {
    return title.text(text);
});

connector.register('renderer-main-clean', function () {
    return main.empty();
});