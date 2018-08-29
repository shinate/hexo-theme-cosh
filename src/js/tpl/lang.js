(function () {

    var $LANG;

    var userLang = $CONFIG.language || navigator.language || navigator.userLanguage || 'en';

    function getText(content) {
        if ($LANG != null && $LANG.hasOwnProperty(userLang) && $LANG[userLang].hasOwnProperty(content)) {
            return $LANG[userLang][content];
        }

        return content;
    }

    window.__ = getText;
})();