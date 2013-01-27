/*! thrust-js - v0.1.5 - 2013-01-26 */
define('thrust/template/config',["require", "exports"], function(require, exports) {
    
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
;
define('thrust/template/main',["require", "exports", 'thrust/util', 'domReady', 'thrust/facade', './config'], function(require, exports, __util__, __domReady__, __facade__, __config__) {
    
    var util = __util__;

    var _ = util._;
    
    
    var domReady = __domReady__;

    var facade = __facade__;

    var config = __config__;

    exports.className = 'Template';
    config;
    var LONG = 'long', SHORT = 'short', ID = 'id', deepCopy = _.merge, format = util.format, each = _.each, bind = _.bind, when = util.when, reduce = _.reduce, memoize = _.memoize, map = _.map, extend = _.extend, getLongName = function (name, type) {
        var that = this, result = (that.shortName(name) + '.' + (type || that.config.defaultType) + that.config.extension).toLowerCase();
        return result;
    };
    var getShortName = function (name) {
        var that = this, result = reduce(that.templateTypes, function (memo, x) {
return memo.replace('.' + x.toLowerCase() + that.config.extension, '');        }, name.toLowerCase()).toLowerCase();
        return result;
    };
    var getTemplateId = function (name) {
        var that = this, result = that.shortName(name).replace(/\//g, '-');
        return result;
    };
    var Template = (function () {
        function Template(config, data) {
            var that = this, templateConfig = this.config = config.template;
            that.templateTypes = map(templateConfig.types, function (x, i) {
                return i;
            });
            that.templates = {
                long: {
                },
                short: {
                },
                id: {
                }
            };
            that.longName = memoize(bind(getLongName, that));
            that.shortName = memoize(bind(getShortName, that));
            that.templateId = memoize(bind(getTemplateId, that));
            that.engines = {
            };
            that.data = data;
            require([
                (templateConfig.templatePaths[templateConfig.defaultType] || 'thrust/template/' + templateConfig.defaultType)
            ], function (engine) {
                that.engines[templateConfig.defaultType] = engine;
                domReady(function () {
                    (_(document.getElementsByTagName('script'))).filter(function (x) {
                        return !!x.getAttribute('data-template');
                    }).each(bind(that.createFromDomNode, that));
                });
            });
        }
        Template.prototype.get = function (name) {
            var template = null, that = this, templates = that.templates;
            if(template = templates.long[that.longName(name)]) {
                return template;
            } else {
                if(template = templates.short[that.shortName(name)]) {
                    return template;
                } else {
                    if(template = templates.id[that.templateId(name)]) {
                        return template;
                    }
                }
            }
            return null;
        };
        Template.prototype.set = function (name, type, compiledTemplate, html) {
            var that = this, shortName = that.shortName(name), templateId = that.templateId(name), longName = that.longName(name, type), templates = that.templates;
            templates.long[longName] = templates.short[shortName] = templates.id[templateId] = {
                name: name,
                shortName: name,
                id: templateId,
                type: type,
                html: html,
                compiled: compiledTemplate
            };
        };
        Template.prototype.has = function (name) {
            var that = this;
            return !!that.get(name);
        };
        Template.prototype.newTemplate = function (name, type, html, engine) {
            var that = this, template = that.get(name);
            if(!template) {
                if(type == 'precompiled') {
                    that.set(name, type, html, html.toString());
                } else {
                    var templatingMethod;
                    var compiledTemplate = this.compile(html, engine);
                    that.set(name, type, compiledTemplate, html);
                }
            }
            return that.get(name);
        };
        Template.prototype.compile = function (html, engine) {
            var that = this, templatingMethod;
            if(!engine) {
                engine = that.engines[that.config.defaultType];
            }
            if(typeof engine === 'function') {
                templatingMethod = engine;
            } else {
                if(typeof engine.template === 'function') {
                    templatingMethod = engine.template;
                }
            }
            return templatingMethod(html);
        };
        Template.prototype.fetch = function (name, type) {
            var that = this, type = type || that.config.defaultType, shortName = that.shortName(name), longName = that.longName(name, type), template;
            var defer = when.defer();
            if(template = that.get(name)) {
                defer.resolve(template);
                return defer.promise;
            }
            that.data.get(that.config.baseUrl + longName, {
                contentType: 'text/plain',
                dataType: 'text',
                silent: true
            }).then(when.apply(function (data) {
                if(type == 'precompiled') {
                    var template = that.newTemplate(name, type, data);
                    defer.resolve(template);
                } else {
                    if(that.engines[type]) {
                        var template = that.newTemplate(name, type, data, that.engines[type]);
                        defer.resolve(template);
                    } else {
                        require([
                            (that.config.templatePaths[type] || 'thrust/template/' + type)
                        ], function (engine) {
                            that.engines[type] = engine;
                            var template = that.newTemplate(name, type, data, engine);
                            defer.resolve(template);
                        });
                    }
                }
            }), defer.reject);
            return defer.promise;
        };
        Template.prototype.createFromDomNode = function (element) {
            var that = this;
            that.newTemplate(element.getAttribute('data-template'), element.getAttribute('data-type'), element.text);
        };
        Template.prototype.createFacade = function (thrust, mod, facades) {
            var templateInstance = thrust.template;
            var facade = facades.template = new TemplateFacade(mod, this);
            mod.templates = {
                fetch: bind(templateInstance.fetch, templateInstance),
                get: bind(templateInstance.get, templateInstance),
                has: bind(templateInstance.has, templateInstance)
            };
            return facade;
        };
        Template.config = config;
        return Template;
    })();
    exports.Template = Template;    
    var TemplateFacade = (function () {
        var templateFacade = facade.createFacade(function (module, parent) {
            this.name = module.name + '-template';
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;
            extend(this, {
                fetch: bind(parent.fetch, parent),
                get: bind(parent.get, parent),
                has: bind(parent.has, parent)
            });
        });
        return templateFacade;
    })();
})
//@ sourceMappingURL=main.js.map
;
define('thrust/template', ['thrust/template/main'], function (main) { return main; });

define('thrust/template/convention/knockout.engine',["require", "exports", 'thrust/convention', 'thrust/util', 'knockout'], function(require, exports, __c__, __util__, __ko__) {
    
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
        }
    };
    exports.knockoutEngine = new Convention(methods);
})
//@ sourceMappingURL=knockout.engine.js.map
;
define('thrust/template/convention/template',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    
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
;