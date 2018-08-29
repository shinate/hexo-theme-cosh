var connector = require('../../connector');
var profile = require('../../profile');
module.exports = {
    command: 'theme',
    description: [
        [
            'theme',
            'theme {theme_name}',
            __('Change theme to {theme_name}')
        ],
        [
            '',
            'theme reset',
            __('Change theme to default')
        ]
    ],
    main: function (parsedCommand) {
        if (parsedCommand._.hasOwnProperty(1)) {
            var p = parsedCommand._[1];
            switch (p) {
                case 'reset':
                    profile.load();
                    profile.forget();
                    break;
                default:
                    if (profile.has(p)) {
                        profile.load(p);
                        profile.save(p);
                    }
                    break;
            }
        } else {
            connector.dispatch('row-message', '可用的主题:');
            connector.dispatch('row-message', '-&nbsp;' + Object.keys(profile.theme_profile_list).join('<br>-&nbsp;'));
        }
    }
};