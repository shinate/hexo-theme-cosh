module.exports = {
    command: 'clean',
    alias: ['clear'],
    main: function () {
        document.getElementById('wrap').innerHTML = '';
    }
};