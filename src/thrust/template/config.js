define(["require", "exports"], function(require, exports) {
    'use strict';
    exports.resolve = [
        'cfg', 
        'data'
    ];
    exports.conventions = [
        'thrust/template/convention/template', 
        'thrust/template/convention/knockout.engine'
    ];
    exports.types = {
        'doT': 'doT',
        'precompiled': true
    };
    exports.evaluators = {
        'doT': {
            left: '{{= ',
            right: '}}'
        }
    };
    exports.defaultType = 'doT';
    exports.baseUrl = '';
    exports.extension = '.tmpl';
    exports.templatePaths = {
        'doT': 'doT'
    };
})
//@ sourceMappingURL=config.js.map
