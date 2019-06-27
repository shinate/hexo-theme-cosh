/**
 * Created by shinate on 2018/5/10.
 */
var command = require('./command');

command.register('clean', require('./cmd/clean'));
command.register('home', require('./cmd/home'));
command.register('page', require('./cmd/page'));
command.register('history', require('./cmd/history'));
command.register('font-size', require('./cmd/font-size'));
command.register('tag', require('./cmd/tag'));
command.register('category', require('./cmd/category'));
command.register('theme', require('./cmd/theme'));
command.register('help', require('./cmd/help'));
command.register('search', require('./cmd/search'));
command.register('ls', require('./cmd/ls'));
command.register('ll', require('./cmd/ll'));

module.exports = command;