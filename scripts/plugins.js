let {version, name} = require('../package.json'); // theme
let {env} = require('../../../package.json'); // global
let yargs = require('yargs').argv;
let {mo} = require('gettext-parser');
let fs = require('fs');
let {sprintf, vsprintf} = require('sprintf-js');
let {pick, chunk, map} = require('lodash');
var util = require('hexo-util');

let _VERSION

function staticVersion() {
    if (_VERSION == null) {
        let file = `${hexo.theme_dir}/.version`;
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file).toString();
            if (content) {
                _VERSION = content;
                return _VERSION;
            }
        }

        _VERSION = +new Date;
    }

    return _VERSION;
}


hexo.extend.helper.register('sprintf', sprintf);
hexo.extend.helper.register('vsprintf', vsprintf);

if (yargs.hasOwnProperty('env')) {
    env = yargs.env;
}

hexo.extend.helper.register('env', () => {
    return env;
});

hexo.extend.helper.register('theme_version', () => version);

hexo.extend.helper.register('lang', () => getText());

hexo.extend.helper.register('configuration', content => {
    return JSON.stringify(content || {});
});

hexo.extend.helper.register('$CONFIG', () => {
    let _config = pick(hexo.config, ['language', 'category_dir', 'tag_dir', 'root']);
    _config.env = env;
    return _config;
});

const source = (path, ext) => {
    if (env === 'production') {
        let file = path.substr(-4) === '.min' ? `${path}${ext}` : `${path}.min${ext}`;
        file = `${file}?_v=${staticVersion()}`
        return hexo.theme.config.cdn ? `//unpkg.com/${name}@${version}/${file}` : `${file}`;
    } else {
        return `${path}${ext}?_v=${staticVersion()}`;
    }
};

let LANG_MO;

function getText() {
    if (LANG_MO == null) {
        let langFile = `${hexo.theme_dir}/lang/${hexo.config.language}.mo`;
        if (fs.existsSync(langFile)) {
            LANG_MO = mo.parse(fs.readFileSync(langFile)).translations[''];
        }
    }

    return LANG_MO;
}

hexo.extend.helper.register('__', (source) => {
    if (source && getText() && getText().hasOwnProperty(source)) {
        return getText()[source].msgstr[0];
    }

    return source;
});

hexo.extend.helper.register('theme_load_js', (path) => source(path, '.js'));
hexo.extend.helper.register('theme_load_css', (path) => source(path, '.css'));

hexo.extend.helper.register('cli', () => {
    return `<div id="cli"><div class="prompt">cosh-${version}&#36;&nbsp;</div><div><input type="text" class="inputing"></div></div>`;
});

function renderImage(src, alt = '', title = '') {
    return `<figure class="image-bubble">
                <div class="img-lightbox">
                    <div class="overlay"></div>
                    <img src="${src}" alt="${alt}" title="${title}">
                </div>
                <div class="image-caption">${title || alt}</div>
            </figure>`;
}

hexo.extend.tag.register('image', ([src, alt = '', title = '']) => {
    return hexo.theme.config.lightbox ? renderImage(src, alt, title) : `<img src="${src}" alt="${alt}" title="${title}">`;
});

hexo.extend.filter.register('before_post_render', data => {
    if (hexo.theme.config.lightbox) {
        // 包含图片的代码块 <escape>[\s\S]*\!\[(.*)\]\((.+)\)[\s\S]*<\/escape>
        // 行内图片 [^`]\s*\!\[(.*)\]\((.+)\)([^`]|$)
        data.content = data.content.replace(/<escape>.*\!\[(.*)\]\((.+)\).*<\/escape>|([^`]\s*|^)\!\[(.*)\]\((.+)\)([^`]|$)/gm, match => {

            // 忽略代码块中的图片
            if (/<escape>[\s\S]*<\/escape>|.?\s{3,}/.test(match)) {
                return match;
            }

            return match.replace(/\!\[(.*)\]\((.+)\)/, (img, alt, src) => {
                const attrs = src.split(' ');
                const title = (attrs[1] && attrs[1].replace(/\"|\'/g, '')) || '';
                return `{% image ${attrs[0]} '${alt}' '${title}' %}`;
            });
        });
    }
    return data
});

hexo.extend.helper.register('customToc', (content) => {
    var header, regexp = new RegExp('<h(\\d)[^>]*>(.+?)<\/h\\1>', 'g');
    var tree = [], minLevel = null, maxLevel = null
    while ((header = regexp.exec(content)) != null) {
        var _l = {level: parseInt(header[1]), title: util.stripHTML(header[2])}
        if (minLevel === null) {
            minLevel = _l.level
        } else if (minLevel > _l.level) {
            minLevel = _l.level
        }
        if (maxLevel === null) {
            maxLevel = _l.level
        } else if (maxLevel < _l.level) {
            maxLevel = _l.level
        }
        tree.push(_l)
    }

    if (tree.length === 0) {
        return '';
    }

    function customTocBasedLevel(base, level) {
        return level - base;
    }

    // base降级
    tree = map(tree, function (item) {
        item.level = customTocBasedLevel(minLevel, item.level);
        return item
    })

    // 合理排序
    var lf = [];
    tree = tree.map(function (item) {
        var f = [].concat(lf).slice(0, item.level + 1);
        f[item.level] = true;
        // fc.push(f.filter(function (item) {
        //         return item !== undefined
        //     }).length - 1);
        item.level = f.filter(function (item) {
                return item !== undefined
            }).length - 1;
        lf = f;

        return item;
    })

    tree = chunk(tree, tree.length > 16 ? Math.ceil(tree.length / 4) : 4);

    var customTocLevels = [];

    function customTocBasedIndex(level) {
        if (customTocLevels[level] === undefined) {
            customTocLevels[level] = 1;
        } else {
            customTocLevels[level]++;
        }
        customTocLevels = customTocLevels.slice(0, level + 1);
        return customTocLevels
        // .filter(function (item) {
        //     return item !== undefined;
        // })
            .join('.');
    }

    function anchorId(str, transformOption) {
        return util.slugize(str.trim(), {transform: transformOption});
    }

    tree = '<ol>' +
        map(tree, function (column) {
            return map(column, function (item) {
                return `<li class="post-toc-level-${item.level}"><em>${customTocBasedIndex(item.level)}</em><a href="#${anchorId(item.title, '')}">${item.title}</a></li>`
            }).join('')
        }).join('</ol><ol>') + '</ol>';

    var html = '<div class="post-toc-content">' + tree + '</ol></div>'

    return html;
})