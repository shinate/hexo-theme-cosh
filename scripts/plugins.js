let {version, name} = require('../package.json');
let {env} = require('../../../package.json');
let yargs = require('yargs').argv;
let {mo} = require('gettext-parser');
let fs = require('fs');
let {sprintf, vsprintf} = require('sprintf-js');

hexo.extend.helper.register('sprintf', sprintf);
hexo.extend.helper.register('vsprintf', vsprintf);

if (yargs.hasOwnProperty('env')) {
    env = yargs.env;
}

hexo.extend.helper.register('env', () => {
    return env;
});

hexo.extend.helper.register('theme_version', () => version);

hexo.extend.helper.register('language', () => getText());

const source = (path, ext) => {
    if (env === 'production') {
        const file = path.substr(-4) === '.min' ? `${path}${ext}` : `${path}.min${ext}`;
        return hexo.theme.config.cdn ? `//unpkg.com/${name}@${version}/${file}` : `${file}`;
    } else {
        return path + ext;
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
    return `<div id="cli"><i class="prompt">cosh-${version}&#36;&nbsp;</i><i class="inputing" contenteditable="true"></i></div>`;
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
