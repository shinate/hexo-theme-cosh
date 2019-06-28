module.exports = function (el) {
    var table = $(el)
    $('<div class="table-wrapped-scroller" rel="x-scroll"></div>').insertBefore(table).append(table)
}