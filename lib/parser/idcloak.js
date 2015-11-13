/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let validator = require('validator');
let debug = require('debug')('give-me-proxy:parser:idcloak');

exports.targets = function($) {
    let targets = [];
    $('.pagination a').each(function(){
        targets.push('http://www.cool-proxy.net' + $(this).attr('href'));
    });
    debug(targets);
    return targets;
};

exports.parse = function($) {
    let rows = $('td[style="text-align:left; font-weight:bold;"]');
    let proxies = [];
    rows.each(function() {
        let ip = new Buffer(str_rot13($(this).find('script').text().slice(39, -3)), 'base64').toString('ascii');
        console.log(ip);
        if(!validator.isIP(ip, 4)) {
            return;
        }
        let info = $(this).siblings();
        let port = $(info[0]).text();
        proxies.push({
            ip: ip,
            port: port,
            protocol: 'HTTP'
        });
    });
    debug(proxies);

    return proxies;
};