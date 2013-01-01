define(["require", "exports", 'thrust/convention', 'thrust/util', 'knockout'], function(require, exports, __c__, __util__, __ko__) {
    /// <reference path="../../interfaces/template/template.d.ts" />
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../interfaces/template/template.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var ko = __ko__;

    var when = util.when, each = _.each, hasOwn = Object.prototype.hasOwnProperty, find = _.find, knockoutTemplates = {
    };
    var initKnockoutIntegration = function (templateManager) {
        var ThrustTemplateSource = (ko).templateSources.thrustTemplate = function (template) {
            this.template = template;
        };
        ThrustTemplateSource.prototype = {
            text: function () {
                var that = this;
                if(arguments.length === 0) {
                    return that.template.html;
                } else {
                    that.template.html = arguments[0];
                    //throw new Error('Thrust Template does not support rewriting...');
                                    }
            },
            data: function (key) {
                var that = this;
                if(!that.template.data) {
                    that.template.data = {
                    };
                }
                if(arguments.length === 1) {
                    return that.template.data[key];
                } else {
                    that.template.data[key] = arguments[1];
                }
            }
        };
        // Begin integration of template plugin, with Knockout.
        var oldEngine = (ko).nativeTemplateEngine.instance;
        var conventionTemplateEngine = (ko).conventionTemplateEngine = function () {
        };
        conventionTemplateEngine.prototype = ko.utils.extend(new (ko).templateEngine(), {
            renderTemplateSource: function (templateSource, bindingContext, options) {
                if(templateSource.template) {
                    var evaluators = this.evaluators;
                    if(!evaluators) {
                        this.evaluators = evaluators = templateManager.config.evaluators[templateManager.config.defaultType];
                    }
                    var precompiled = templateSource['data']('precompiled');
                    if(!precompiled) {
                        precompiled = templateManager.compile('{{ with($data) { }} ' + templateSource.text() + " {{ } }}");
                        templateSource['data']('precompiled', precompiled);
                    }
                    // Run the template and parse its output into an array of DOM elements
                    var renderedMarkup = templateSource.template.compiled(bindingContext).replace(/\s+/g, " ");
                    return (ko).utils.parseHtmlFragment(renderedMarkup);
                }
                return oldEngine.renderTemplateSource.apply(oldEngine, arguments);
            },
            createJavaScriptEvaluatorBlock: function (script) {
                if(!this.evaluatorCache) {
                    var evaluators = templateManager.config.evaluators[templateManager.config.defaultType];
                    this.evaluatorCache = evaluators.left + script + evaluators.right;
                }
                return this.evaluatorCache;
            },
            makeTemplateSource: function (template, templateDocument) {
                // Named template
                if(typeof template == "string") {
                    var definition = templateManager.get(template);
                    if(definition) {
                        return new ThrustTemplateSource(definition);
                    }
                }
                return oldEngine.makeTemplateSource.apply(oldEngine, arguments);
            }
        });
        (ko).setTemplateEngine(new (ko).conventionTemplateEngine());
    };
    var methods = {
        countdown: function (thrust) {
            initKnockoutIntegration(thrust.template);
            return null;
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=knockout.engine.js.map
