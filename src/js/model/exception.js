module.exports = {
    temp: {
        halt   : function (m) {
            return ['[', __('HALT'), ']', ' ', m].join('')
        },
        fail   : function (m) {
            return ['[', __('FAIL'), ']', ' ', m].join('')
        },
        warning: function (m) {
            return ['[', __('WARN'), ']', ' ', m].join('')
        },
        info   : function (m) {
            return ['[', __('INFO'), ']', ' ', m].join('')
        }
    }
}