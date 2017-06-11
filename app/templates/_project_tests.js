/*
tests

each test will run and log the function name and true if passes
or function name and false if fails
*/

import * as spa from './src/library.js';

var $ = require('jquery');

$.noConflict();

const testProcess = (function() {
    var objProto = {
        test_ajaxGetContext: function() {},
        init: function() {

            let self = this;

            this
            .test_ajaxGetContext()
            .then(() => {

            });
        }
    }; 

    return function() {
        var obj = Object.create(objProto);
        return obj;
    };
})();

testProcess().init();
