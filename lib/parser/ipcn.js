/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let validator = require('validator');
let debug = require('debug')('give-me-proxy:parser:ipcn');

exports.targets = function($) {
    let targets = [];
    $('td[align=center] > a').each(function(){
        targets.push($(this).attr('href'));
    });
    debug(targets);
    return targets;
};

exports.parse = function($) {
    let raw = $('td[valign=top] > pre').text();
    let rows = raw.split('\n');
    let proxies = [];
    rows.forEach(function(row) {
        row = row.split(':');
        let ip = row[0];
        if(!validator.isIP(ip, 4)) {
            return;
        }
        let port = row[1];
        proxies.push({
            ip: ip,
            port: port,
            protocol: 'HTTP'
        });
    });
    debug(proxies);

    return proxies;
};