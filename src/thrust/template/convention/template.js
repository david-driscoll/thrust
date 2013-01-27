define(["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var TEMPLATES = 'templates', when = util.when, each = _.each, hasOwn = Object.prototype.hasOwnProperty, find = _.find;
    var methods = {
        properties: [
            TEMPLATES
        ],
        init: function (mod, facade) {
            var defer = when.defer();
            var templates = mod.convention(TEMPLATES), invertedTemplates = util.invert(templates), moduleInstance = mod.instance;
            if(templates) {
                var defers = [];
                each(templates, function (template) {
                    if(typeof template === 'string') {
                        defers.push(facade.fetch(template));
                    }
                });
                facade.loadingPromise = when.all(defers).then(function (loadedTemplates) {
                    _.each(invertedTemplates, function (x, i) {
                        var template = _.find(loadedTemplates, function (x) {
                            return x.shortName === i || x.name === i;
                        });
                        moduleInstance.templates[i] = template.compiled;
                    });
                });
            }
        },
        ready: function (mod, facade) {
            return facade.loadingPromise || undefined;
        }
    };
    exports.template = new Convention(methods);
})
//@ sourceMappingURL=template.js.map
