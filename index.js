/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let crawler = require('./lib/crawler');
let sources = require('./source');

crawler.setSources(sources);

process.nextTick(function() {
    crawler.begin();
});

module.exports = crawler;