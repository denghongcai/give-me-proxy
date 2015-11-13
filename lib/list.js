/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let proxyList = {};

/**
 * get random proxy from crawled list
 *
 * @returns {ip, port, type}
 */
exports.get = function() {
    let keys = Object.keys(proxyList);
    return proxyList[keys[keys.length * Math.random() << 0]];
};

/**
 * confirm the proxy is usable
 *
 * @param ip
 */
exports.confirm = function(ip) {
    if(proxyList.hasOwnProperty(ip)) {
        proxyList[ip].confirm = true;
    }
};

/**
 * remove the proxy if it is unavailable
 *
 * @param ip
 */
exports.trash = function(ip) {
    if(proxyList.hasOwnProperty(ip) && proxyList[ip].confirm !== true) {
        delete proxyList[ip];
    }
};

/**
 * add proxy into list
 *
 * @param proxy
 */
exports.set = function(proxy) {
    proxyList[proxy.ip] = proxy;
};