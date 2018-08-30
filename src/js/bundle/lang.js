(function () {

    var $LANG = {"cn":{"Categories":"分类","Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License":"知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议","Creative Commons License":"知识共享许可协议","Last updated at":"最后更新于","Next page":"下一页","Next post":"后一篇","Prev page":"上一页","Prev post":"前一篇","Read more":"阅读全文","Tags":"标签","This work is licensed under a ":"本作品许可采用自 ","toc":"目录"}};

    var userLang = $CONFIG.language || navigator.language || navigator.userLanguage || 'en';

    function getText(content) {
        if ($LANG != null && $LANG.hasOwnProperty(userLang) && $LANG[userLang].hasOwnProperty(content)) {
            return $LANG[userLang][content];
        }

        return content;
    }

    window.__ = getText;
})();