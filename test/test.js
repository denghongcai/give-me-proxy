/**
 * Created by Hongcai Deng on 2015/11/12.
 */

'use strict';

let proxy = require('../index');

proxy.once('here we go', function() {
    setInterval(() => {
        // get a random proxy from crawled list and enjoy it!
        console.log(proxy.get());
    }, 500);
});