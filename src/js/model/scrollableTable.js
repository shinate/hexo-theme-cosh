module.exports = function (el) {
    var table = $(el)
    $('<div class="table-wrapped-scroller"></div>').insertBefore(table).append(table)
}