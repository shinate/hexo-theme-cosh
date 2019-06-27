var scrollableTable = require('../model/scrollableTable')
$('.post-content').find('table').each(function (_, node) {
    scrollableTable(node)
})