/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let validator = require('validator');
let debug = require('debug')('give-me-proxy:parser:cz88');

exports.targets = function($) {
    let sections = $('.box250').filter(function() {
        return $(this).find('h4').text() !== '代理教程';
    });
    let a = sections.find('li > a');
    let targets = [];
    a.each(function() {
        targets.push(`http://www.cz88.net${$(this).attr('href')}`);
    });
    debug(targets);
    return targets;
};

exports.parse = function($) {
    let rows = $('#boxright li');
    let proxies = [];
    rows.each(function() {
        let row = $(this);
        let ip = row.find('.ip').text();
        if(!validator.isIP(ip, 4)) {
            return;
        }
        let port = row.find('.port').text();
        let type = row.find('.type').text().trim();
        if(type === '透明') {
            type = 'HTTP';
        }
        let reg = /[\d\w]+/;
        if(!reg.test(type)) {
            type = 'HTTP';
        }
        proxies.push({
            ip: ip,
            port: port,
            protocol: type
        });
    });
    debug(proxies);

    return proxies;
};