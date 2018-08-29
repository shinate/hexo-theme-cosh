#!/usr/bin/env node

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const {mo} = require('gettext-parser');
require('colors');

let language = {};

let languageFileTemplate = fs.readFileSync('./src/js/tpl/lang.js').toString();

glob.sync('./lang/*.mo').forEach(function (src) {
    // src = path.resolve(src);
    var name = path.basename(src, '.mo');
    var content = mo.parse(fs.readFileSync(src)).translations[''];

    var value = {};
    Object.entries(content).forEach(function (row) {
        if (row[0] && row[1].msgstr.length) {
            value[row[1].msgid.toString()] = row[1].msgstr[0];
        }
    });

    language[name] = value;
});

languageFileTemplate = languageFileTemplate.replace(/(var \$LANG)(;)/, "$1 = " + JSON.stringify(language) + "$2");

fs.writeFile('./src/js/bundle/lang.js', languageFileTemplate, function () {
    console.log('Language file ./src/js/bundle/lang.js has been created'.bold.green);
});