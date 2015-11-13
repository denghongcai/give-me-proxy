/**
 * Created by Hongcai Deng on 2015/8/18.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var parsers = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename))
  .forEach(file => {
    let name = path.basename(file, '.js');
    parsers[name] = require(path.resolve(__dirname, file));
  });

module.exports = parsers;
