/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let cheerio = require('cheerio');
let iconv = require('iconv-lite');

module.exports = [
    {
        name: 'cz88',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
        },
        index: 'http://www.cz88.net/proxy/index.shtml',
        transform: function (body) {
            return cheerio.load(iconv.decode(body, 'GB18030'));
        }

    },
    {
        name: 'ipcn',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
        },
        index: 'http://proxy.ipcn.org/proxylist.html',
        transform: function (body) {
            return cheerio.load(iconv.decode(body, 'GBK'));
        }
    },
    /* TODO: implement
    {
        name: 'hidemyass',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36',
            'Referer': 'http://proxylist.hidemyass.com'
        }
    },
    */
    {
        name: 'cool-proxy',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
        },
        index: 'http://www.cool-proxy.net/proxies/http_proxy_list/sort:score/direction:desc',
        transform: function (body) {
            return cheerio.load(body.toString('utf8'));
        }
    },
    /*
    { TODO: implement
        name: 'idcloak',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
        },
        index: 'http://www.idcloak.com/proxylist/free-proxy-servers-list.html',
        transform: function(body) {
            return cheerio.load(body.toString('utf8'));
        }
    },
    */
    {
        name: 'hide-my-ip',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
        },
        index: 'https://www.hide-my-ip.com/proxylist.shtml',
        transform: function (body) {
            return cheerio.load(body.toString('utf8'));
        }

    }
];
