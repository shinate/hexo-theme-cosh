function profile_loader() {
    this.theme_profile_list = require('../../config/profile');
    this.minSuffix = $CONFIG.env == 'production' ? '.min' : '';
}

profile_loader.prototype.has = function (profile) {
    return this.theme_profile_list.hasOwnProperty(profile);
};

profile_loader.prototype.save = function (profile) {
    window.localStorage.setItem('profile', profile);
};

profile_loader.prototype.forget = function () {
    window.localStorage.removeItem('profile');
};

profile_loader.prototype.autoload = function () {
    this.load(window.localStorage.getItem('profile') || 'basic');
};

profile_loader.prototype.load = function (profile) {
    var theme_profile_config = profile != null && this.has(profile) ? this.theme_profile_list[profile] : this.theme_profile_list['basic'];
    for (var type in theme_profile_config) {
        if (theme_profile_config.hasOwnProperty(type)) {
            this.loadStyle(type, theme_profile_config[type]);
        }
    }
};

profile_loader.prototype.loadStyle = function (type, file) {
    var link = document.createElement('link');
    link.setAttribute('id', 'style_' + type);
    link.setAttribute('type', "text/css");
    link.setAttribute('rel', "stylesheet");
    link.setAttribute('media', "all");
    link.href = $CONFIG.root + 'css/' + type + '/' + file + this.minSuffix + '.css';

    var node = document.getElementById('style_' + type);
    if (node) {
        node.parentNode.replaceChild(link, node);
    } else {
        document.head.appendChild(link);
    }
};

module.exports = (function (global) {
    if (!('__PROFILE' in global)) {
        global.__PROFILE = new profile_loader();
    }
    return global.__PROFILE;
})(this || window);