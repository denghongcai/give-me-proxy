/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let validator = require('validator');
let debug = require('debug')('give-me-proxy:parser:hide-my-');

exports.targets = function($) {
    let targets = [];
    targets.push('https://www.hide-my-ip.com/proxylist.shtml');
    return targets;
};

exports.parse = function($) {
    let raw = $('script[type="text/javascript"]').text();
    raw = raw.match(/(var json = [\s\S]*?)<!-- proxylist -->/);
    let getJSON = new Function(raw[1] + 'return json');
    let rows = getJSON();

    let proxies = [];
    rows.forEach(function(row) {
        let ip = row['i'];
        if(!validator.isIP(ip, 4)) {
            return;
        }
        let port = row['p'];
        proxies.push({
            ip: ip,
            port: port,
            protocol: row['tp']
        });
    });
    debug(proxies);

    return proxies;
};