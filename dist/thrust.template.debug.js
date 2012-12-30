

define('thrust/template/config',["require", "exports"], function(require, exports) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    /**
    Provides thrust configuration
    
    @module thrust.template
    @submodule thrust.template.config
    **/
    /**
    Resolves the given properties when creating an instance of the plugin.
    
    This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
    to the plugin constructor method.
    
    @for thrust.template.config
    @private
    @property resolve
    @readOnly
    @type {Array}
    **/
    exports.resolve = [
        'cfg', 
        'data'
    ];
    /**
    The set of conventions to load into thrust/template.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/template/convention/template', 
        'thrust/template/convention/knockout.engine'
    ];
    /**
    Maps the available templates, to their appropriate module name.
    
    **precompiled is a special case, and those methods are expected to be code built functions.
    
    @property types
    @readOnly
    @type {Object}
    **/
    exports.types = {
        'doT': 'doT',
        'precompiled': true
    };
    /**
    Maps the template evaluators, so that when creating a template for knockout, it knows how to properly output the information.
    
    @property evaluators
    @readOnly
    @type {Object}
    **/
    exports.evaluators = {
        'doT': {
            left: '{{= ',
            right: '}}'
        }
    };
    /**
    The default template type, used when extension isn't given.
    
    @property defaultType
    @readOnly
    @type {String}
    @default 'doT'
    **/
    exports.defaultType = 'doT';
    /**
    The base location, relative to the application path for template location.
    If template paths are given relative to application path, this can be left empty.
    
    @property baseUrl
    @readOnly
    @type {String}
    @default ''
    **/
    exports.baseUrl = '';
    /**
    Defines the extension used for templates stored on the server.
    
    @property extension
    @readOnly
    @type {String}
    @default '.tmpl'
    **/
    exports.extension = '.tmpl';
})
//@ sourceMappingURL=config.js.map
;
define('thrust/template/main',["require", "exports", 'thrust/util', 'domReady', 'thrust/facade', './config'], function(require, exports, __util__, __domReady__, __facade__, __config__) {
    /// <reference path="../interfaces/template/template.d.ts" />
    /// <reference path="../interfaces/template/template.facade.d.ts" />
    /// <reference path="../interfaces/template/template.config.d.ts" />
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
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
    /**
    @module thrust.template
    @requires thrust.data
    **/
    /**
    The template plugin consturctor.
    
    @for thrust.template
    @class thrust.template.Template
    @param {Object} config The thrust config object
    @param {Object} data The thrust data instance
    @uses thrust.data.Data
    @constructor
    **/
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
        /**
        Gets a template from the cache if it has been fetched. False otherwise.
        
        @for thrust.template.Template
        @method get
        @param {String} name The template name to try and get.
        @returns {Function} The template object
        **/
        /**
        Gets a template from the cache if it has been fetched. False otherwise.
        
        @for thrust.template.TemplateFacade
        @method get
        @param {String} name The template name to try and get.
        @returns {Function} The template object
        **/
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
        }/**
        Sets a template to the cache, with the given information
        
        @for thrust.template.Template
        @method set
        @param {String} name The template name
        @param {String} type The template engine type
        @param {Function} compiledTemplate The compiled template method
        @param {String} html The template HTML.
        **/
        ;
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
        }/**
        Checks if the template exists in the cache.
        
        @for thrust.template.Template
        @method has
        @param {String} name The template name
        @returns {Boolean} Wether the template exists or not.
        **/
        /**
        Checks if the template exists in the cache.
        
        @for thrust.template.TemplateFacade
        @method has
        @param {String} name The template name
        @returns {Boolean} Wether the template exists or not.
        **/
        ;
        Template.prototype.has = function (name) {
            var that = this;
            return !!that.get(name);
        }/**
        Creates a new template given the information
        
        @for thrust.template.Template
        @method newTemplate
        @param {String} name The template name
        @param {String} type The template engine type
        @param {String} html The template HTML.
        @param {String} engine The template engine
        @returns {Object} The new template instance.
        **/
        ;
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
        }/**
        Compiles a template given the html and the engine type.
        
        @for thrust.template.Template
        @method compile
        @param {String} html The html to generate the template from
        @param {String} engine The template engine that is being used.
        @returns {Function} The compiled template method
        **/
        ;
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
        }/**
        Fetchs a template from the server, or template store.
        
        @for thrust.template.Template
        @method fetch
        @param {String} name The template name
        @param {String} [type] The template type if not the default
        @returns {Promise} The promise for when the template has been loaded.
        **/
        /**
        Fetchs a template from the server, or template store.
        
        @for thrust.template.TemplateFacade
        @method fetch
        @param {String} name The template name
        @param {String} [type] The template type if not the default
        @returns {Promise} The promise for when the template has been loaded.
        **/
        ;
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
        }/**
        Creates a new template from the given DOM Node
        
        @for thrust.template.Template
        @method createFromDomNode
        @protected
        @param {Node} element THe dome element.
        **/
        ;
        Template.prototype.createFromDomNode = function (element) {
            var that = this;
            that.newTemplate(element.getAttribute('data-template'), element.getAttribute('data-type'), element.text);
        }/**
        
        @for thrust.template.Template
        @method createFacade
        @param {thrust.Thrust} thrust The thrust instance
        @param {thrust.Module} module The module to create the facade for
        @param {Object} facades The facades already added for this module.
        **/
        ;
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
    /**
    
    @for thrust.template
    @class thrust.template.TemplateFacade
    @constructor
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.template.Template} parent The template instance to create the facade for.
    **/
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

define('thrust/template/convention/template',["require", "exports", 'thrust/convention', 'thrust/util'], function(require, exports, __c__, __util__) {
    /// <reference path="../../interfaces/template/template.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var TEMPLATES = 'templates', when = util.when, each = _.each, hasOwn = Object.prototype.hasOwnProperty, find = _.find;
    var methods = {
        properties: [
            TEMPLATES
        ],
        init: function (facade, mod) {
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
                    /*jshint loopfunc:true */
                    _.forOwn(invertedTemplates, function (x, i) {
                        var template = find(loadedTemplates, function (x) {
                            return x.shortName === i || x.name === i;
                        });
                        moduleInstance.templates[i] = template.compiled;
                    });
                });
            }
            return null;
        },
        ready: function (facade, mod) {
            return facade.loadingPromise || undefined;
        }
    };
    exports.subscription = new Convention(methods);
})
//@ sourceMappingURL=template.js.map
;
define('thrust/template/convention/knockout.engine',["require", "exports", 'thrust/convention', 'thrust/util', 'knockout'], function(require, exports, __c__, __util__, __ko__) {
    /// <reference path="../../interfaces/thrust.d.ts" />
    /// <reference path="../../interfaces/template/template.facade.d.ts" />
    /// <reference path="../../interfaces/convention.d.ts" />
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    
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
                        this.evaluators = evaluators = templateManager.evaluators[templateManager.defaultType];
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
                    var evaluators = templateManager.evaluators[templateManager.defaultType];
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
;