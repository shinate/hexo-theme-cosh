(function () {

    var $LANG = {"zh-cn":{"Alias for \"clean\".":"“clean” 的另一种形式","Alias for \"font-size\".":"“字体大小” 的别名。","Alias for \"history clean\".":"“history clean” 的另一种形式","Alias for \"ls -l\".":"“ls -l” 的简便调用","Archives":"归档","Blog HOME Page":"博客首页","COMMAND-LINE":"命令格式","Categories":"分类","Change theme to default":"恢复默认主题","Change theme to {theme_name}":"将主题替换为 {主题名称}","Clear all histories.":"清除所有历史","Clear screen.":"清除屏幕。","Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License":"知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议","Creative Commons License":"知识共享许可协议","DESCRIPTION":"说明","FAIL":"错误","Get help about this blog, list of commands.":"获取有关此博客的帮助, 命令列表。","HALT":"终止","INFO":"信息","Last updated at":"最后更新于","List all articles with details.":"列出所有文章，包括详细信息","List all articles.":"列举所有文章","List all histories":"列举所有历史","NAME":"名称","Next page":"下一页","Next post":"后一篇","Page can not be found!":"无法找到页面！","Prev page":"上一页","Prev post":"前一篇","Read a list of pages.":"读取某一分页","Read more":"阅读全文","Search with the given in the title and content from the article.":"在文章的标题和内容中搜索","Set the font size in different ways\nThe \"size\" can be: multiple, percentage (%), pixels (px)":"以不同的方式设置字体大小 “大小” 可以是: 倍数, 百分比 (%), 像素 (px)","Show current font size (px)":"显示当前字体大小 (px)","Simplified for \"category\".":"“category” 命令的简写","Simplified for \"search\".":"“search” 的简写","Simplified for \"tag\".":"“tag” 的简写","Tags":"标签","This work is licensed under a ":"本作品许可采用自 ","WARN":"警告","created":"创建于","list all categories.":"列举全部分类","list all tags.":"列举所有标签","list posts of given category name.":"根据分类名称列出所有文章","list posts of given tag name.":"根据分类名称列出所有文章","size":"尺寸","title":"标题","toc":"目录","total":"总计","updated":"最后更新于"}};

    var userLang = $CONFIG.language || navigator.language || navigator.userLanguage || 'en';

    function getText(content) {
        if ($LANG != null && $LANG.hasOwnProperty(userLang) && $LANG[userLang].hasOwnProperty(content)) {
            return $LANG[userLang][content];
        }

        return content;
    }

    window.__ = getText;
})();