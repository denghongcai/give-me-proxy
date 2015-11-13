/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let EventEmitter = require('events');
let util = require('util');
let request = require('request-promise');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let async = require('async');
let proxyList = require('./list');
let parser = require('./parser');

// set request to output body as Buffer
request = request.defaults({encoding: null});

let Crawler = function() {
    EventEmitter.call(this);

    // expose list
    this.get = proxyList.get;
    this.confirm = proxyList.confirm;
    this.trash = proxyList.trash;
};

util.inherits(Crawler, EventEmitter);

/**
 * set proxy sources
 *
 * @param sources
 */
Crawler.prototype.setSources = function(sources) {
    this.sources = sources;
    if(typeof this._init === 'undefined') {
        this._init = false;
    }
};

Crawler.prototype.begin = function() {
    this.sources.forEach(source => {
        if(typeof parser[source.name] === 'undefined') {
            return;
        }
        request = request.defaults({headers: source.headers, transform: source.transform});
        request({
            uri: source.index
        }).then(body => {
            let targets = parser[source.name].targets(body);
            async.each(targets, (target, cb) => {
                request({
                    uri: target
                }).then(body => {
                    let proxies = parser[source.name].parse(body);
                    proxies.forEach(proxy => {
                        proxyList.set(proxy);
                        if(this._init === false) {
                            this._init = true;
                            this.emit('here we go');
                        }
                    });
                    cb();
                }).catch(err => {
                    cb(err);
                });
            }, err => {
                if (err) {
                    console.error(err.stack);
                }
            });
        }).catch(err => {
            console.error(err.stack);
        });
    });
};

let crawler = new Crawler();

// singleton
module.exports = crawler;
