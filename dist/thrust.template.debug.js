/*! Thrust JS Framework - v0.1.0 - 2012-10-27
* thrust-home
* Copyright (c) 2012 David Driscoll; Licensed MIT */


define('thrust/template/config',['require'],function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust.template
    @submodule thrust.template.config
    **/
    

    var config = {
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
        resolve: ['cfg', 'data'],
        /**
        The set of conventions to load into thrust/template.

        @property conventions
        @readOnly
        @type {Array}
        **/
        conventions: [
            'thrust/template/convention/template',
            'thrust/template/convention/knockout.engine'
        ],
        /**
        Maps the available templates, to their appropriate module name.

        **precompiled is a special case, and those methods are expected to be code built functions.

        @property types
        @readOnly
        @type {Object}
        **/
        types: {
            'doT': 'doT',
            'precompiled': true
        },
        /**
        Maps the template evaluators, so that when creating a template for knockout, it knows how to properly output the information.

        @property evaluators
        @readOnly
        @type {Object}
        **/
        evaluators: {
            'doT': { left: '{{= ', right: '}}' }
        },
        /**
        The default template type, used when extension isn't given.

        @property defaultType
        @readOnly
        @type {String}
        @default 'doT'
        **/
        defaultType: 'doT',
        /**
        The base location, relative to the application path for template location.
        If template paths are given relative to application path, this can be left empty.

        @property baseUrl
        @readOnly
        @type {String}
        @default ''
        **/
        baseUrl: '',
        /**
        Defines the extension used for templates stored on the server.

        @property extension
        @readOnly
        @type {String}
        @default '.tmpl'
        **/
        extension: '.tmpl'
    };
    return config;
});
define('thrust/template/main',[
    'require',
    'thrust/util',
    'thrust/data',
    'thrust/log',
    'thrust/config',
    'domReady',
    'lodash',
    'thrust/facade',
    './config'
],
    function (require, util, tData, log, config, domReady, _, facade, config)
    {
        var LONG        = 'long',
            SHORT       = 'short',
            ID          = 'id',
            templates   = {
                long: {},
                short: {},
                id: {}
            },
            deepCopy    = util.deepCopy,
            format      = util.format,
            each        = util.each,
            bind        = util.bind,
            when        = util.when,
            memoize     = util.memoize,
            getLongName = function (name, type)
            {
                var that = this;
                return (that.shortName(name) + '.' + (type || that.defaultType) + that.extension).toLowerCase();
            },
            getShortName = function (name)
            {
                var that = this;
                return util.reduce(that.templateTypes, function (memo, x) { return memo.replace('.' + x.toLowerCase() + that.extension, ''); }, name.toLowerCase()).toLowerCase();
            },
            getTemplateId = function (name)
            {
                return this.shortName(name).replace(/\//g, '-');
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
        var Template = function (config, data)
        {
            var that           = this;
            config             = config.template;
            that.extension     = config.extension;
            that.templatePaths = config.types;
            that.templateTypes = util.map(config.types, function (x, i) { return i; });
            that.baseUrl       = config.baseUrl;
            that.defaultType   = config.defaultType;
            that.evaluators    = config.evaluators;
            that.templates     = deepCopy({}, templates);
            that.longName      = memoize(bind(getLongName, that));
            that.shortName     = memoize(bind(getShortName, that));
            that.templateId    = memoize(bind(getTemplateId, that));
            that.engines       = {};
            that.data          = data;

            require([(that.templatePaths[config.defaultType] || 'thrust/template/' + config.defaultType)], function (engine)
            {
                that.engines[config.defaultType] = engine;

                domReady(function ()
                {
                    _(document.getElementsByTagName('script'))
                        .filter(function(x) { return !!x.getAttribute('data-template'); })
                        .forEach(bind(that.createFromDomNode, that));
                });
            });
        };

        Template.prototype = {
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
            get: function (name)
            {
                var template = null, that = this, templates = that.templates;
                if (template = templates[LONG][that.longName(name)])
                    return template;
                else if (template = templates[SHORT][that.shortName(name)])
                    return template;
                else if (template = templates[ID][that.templateId(name)])
                    return template;
                return false;
            },
            /**
            Sets a template to the cache, with the given information

            @for thrust.template.Template
            @method set
            @param {String} name The template name
            @param {String} type The template engine type
            @param {Function} compiledTemplate The compiled template method
            @param {String} html The template HTML.
            **/
            set: function (name, type, compiledTemplate, html)
            {
                var that = this,
                    shortName = that.shortName(name),
                    templateId = that.templateId(name),
                    longName = that.longName(name, type),
                    templates = that.templates;

                templates[LONG][longName] = templates[SHORT][shortName] = templates[ID][templateId] = {
                    name: name,
                    shortName: name,
                    id: templateId,
                    type: type,
                    html: html,
                    compiled: compiledTemplate
                };
            },
            /**
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
            has: function (name)
            {
                var that = this;
                return !!that.get(name);
            },
            /**
            Creates a new template given the information

            @for thrust.template.Template
            @method newTemplate
            @param {String} name The template name
            @param {String} type The template engine type
            @param {String} html The template HTML.
            @param {String} engine The template engine
            @returns {Object} The new template instance.
            **/
            newTemplate: function (name, type, html, engine)
            {
                var that = this, template = that.get(name);
                if (!template)
                {
                    if (type == 'precompiled')
                    {
                        that.set(name, type, html, html.toString());
                    }
                    else
                    {
                        var templatingMethod;

                        var compiledTemplate = this.compile(html, engine);
                        that.set(name, type, compiledTemplate, html);
                    }
                }
                return that.get(name);
            },
            /**
            Compiles a template given the html and the engine type.

            @for thrust.template.Template
            @method compile
            @param {String} html The html to generate the template from
            @param {String} engine The template engine that is being used.
            @returns {Function} The compiled template method
            **/
            compile: function(html, engine)
            {
                var that = this, templatingMethod;
                if (!engine)
                    engine = that.engines[that.defaultType];

                if (typeof engine === 'function')
                    templatingMethod = engine;
                else if (typeof engine.template === 'function')
                    templatingMethod = engine.template;

                return templatingMethod(html);
            },
            /**
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
            fetch: function (name, type)
            {
                var that = this,
                    type = type || that.defaultType,
                    shortName = that.shortName(name),
                    longName = that.longName(name, type),
                    template;

                var defer = when.defer();

                if (template = that.get(name))
                {
                    defer.resolve(template);
                    return defer.promise;
                }

                that.data.get(that.baseUrl + longName, { contentType: 'text/plain', dataType: 'text', silent: true }).then(when.apply(function (data)
                {
                    if (type == 'precompiled')
                    {
                        var template = that.newTemplate(name, type, data);
                        defer.resolve(template);
                    }
                    else
                    {
                        if (that.engines[type])
                        {
                            var template = that.newTemplate(name, type, data, that.engines[type]);
                            defer.resolve(template);
                        }
                        else
                        {
                            require([(that.templatePaths[type] || 'thrust/template/' + type)], function (engine)
                            {
                                that.engines[type] = engine;
                                var template = that.newTemplate(name, type, data, engine);
                                defer.resolve(template);
                            });
                        }
                    }
                }), defer.reject);

                return defer.promise;
            },
            /**
            Creates a new template from the given DOM Node

            @for thrust.template.Template
            @method createFromDomNode
            @protected
            @param {Node} element THe dome element.
            **/
            createFromDomNode:  function (element)
            {
                var that = this;
                that.newTemplate(
                    element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text
                );
            }
        };

        /**

        @for thrust.template
        @class thrust.template.TemplateFacade
        @constructor
        @param {thrust.Module} module The module to create the facade for
        @param {thrust.template.Template} parent The template instance to create the facade for.
        **/
        var TemplateFacade = facade.createFacade(function (module, parent)
        {
            this.name = module.name + '-template';
            this.module = module;
            this.parent = parent;
            this.__conventions = parent.__conventions;

            util.extend(this, {
                fetch: bind(parent.fetch, parent),
                get: bind(parent.get, parent),
                has: bind(parent.has, parent)
            });
        });

        /**

        @for thrust.template.Template
        @method createFacade
        @param {thrust.Thrust} thrust The thrust instance
        @param {thrust.Module} module The module to create the facade for
        @param {Object} facades The facades already added for this module.
        **/
        Template.prototype.createFacade = function (thrust, module, facades)
        {
            var templateInstance = thrust.template;

            facades.template = new TemplateFacade(module, this);
            module.templates = {
                fetch: bind(templateInstance.fetch, templateInstance),
                get: bind(templateInstance.get, templateInstance),
                has: bind(templateInstance.has, templateInstance)
            };
        };

        Template.config = config;

        return Template;
    });
define('thrust/template', ['thrust/template/main'], function (main) { return main; });

define('thrust/template/convention/template',['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    var TEMPLATES = 'templates',
        when = util.when,
        each = util.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = util.find;

    /**
    @module thrust.template
    @submodule thrust.template.convention
    **/

    /**
    * # __thrust/template__ Convention - Templates
    *
    * The `templates` convention takes a list of template paths, that need to be fetched for this module.
    * When the module starts, the templates will be fetched automatically by the modules code, in addition
    * the template ready method will be held until all the templates have returned with a value.
    *
    *
    * When the templates have been resolved, your module will have an object on it with the values of the templates location.
    * In addition the templates object will have a get, fetch and has method, to get different templates if required further
    * down the line.
    *
    * @for thrust.template.convention
    * @property templates
    **/
    return new Convention({
        properties: [TEMPLATES],
        init: function(facade, module)
        {
            var defer = when.defer();

            var templates = module.convention(TEMPLATES),
                invertedTemplates = util.invert(templates),
                moduleInstance = module.instance;

            if (templates)
            {
                facade.defers = [];
                each(templates, function(template)
                {
                    if (typeof template === 'string')
                    {
                        facade.defers.push(facade.fetch(template));
                    }
                });
                facade.defers = when.all(facade.defers).then(function (loadedTemplates)
                {
                    /*jshint loopfunc:true */
                    for (var i in invertedTemplates)
                    {
                        if (hasOwn.call(invertedTemplates, i))
                        {
                            var template = find(loadedTemplates, function (x) { return x.shortName === i || x.name === i; });
                            moduleInstance.templates[i] = template.compiled;
                        }
                    }
                });
            }
        },
        ready: function (facade)
        {
            return [facade.defers] || undefined;
        }
    });
});
define('thrust/template/convention/knockout.engine',['thrust/convention', 'thrust/util', 'knockout'],
function (Convention, util, ko)
{
    var when = util.when,
        each = util.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = util.find,
        knockoutTemplates = {};

    var initKnockoutIntegration = function (templateManager)
    {
        var ThrustTemplateSource = ko.templateSources.thrustTemplate = function (template)
        {
            this.template = template;
        };

        ThrustTemplateSource.prototype = {
            text: function ()
            {
                var that = this;
                if (arguments.length === 0)
                {
                    return that.template.html;
                }
                else
                {
                    that.template.html = arguments[0];
                    //throw new Error('Thrust Template does not support rewriting...');
                }
            },
            data: function (key)
            {
                var that = this;
                if (!that.template.data) that.template.data = {};
                if (arguments.length === 1)
                {
                    return that.template.data[key];
                }
                else
                {
                    that.template.data[key] = arguments[1];
                }
            }
        };

        // Begin integration of template plugin, with Knockout.
        var oldEngine = ko.nativeTemplateEngine.instance;

        var conventionTemplateEngine = ko.conventionTemplateEngine = function () { };
        conventionTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(),
        {
            renderTemplateSource: function (templateSource, bindingContext, options)
            {
                if (templateSource.template)
                {
                    var evaluators = this.evaluators;
                    if (!evaluators)
                    {
                        this.evaluators = evaluators = templateManager.evaluators[templateManager.defaultType];
                    }

                    var precompiled = templateSource['data']('precompiled');
                    if (!precompiled)
                    {
                        precompiled = templateManager.compile('{{ with($data) { }} ' + templateSource.text() + " {{ } }}");
                        templateSource['data']('precompiled', precompiled);
                    }

                    // Run the template and parse its output into an array of DOM elements
                    var renderedMarkup = templateSource.template.compiled(bindingContext).replace(/\s+/g, " ");
                    return ko.utils.parseHtmlFragment(renderedMarkup);
                }

                return oldEngine.renderTemplateSource.apply(oldEngine, arguments);
            },
            createJavaScriptEvaluatorBlock: function (script)
            {
                if (!this.evaluatorCache)
                {
                    var evaluators = templateManager.evaluators[templateManager.defaultType];
                    this.evaluatorCache = evaluators.left + script + evaluators.right;
                }
                return this.evaluatorCache;
            },
            makeTemplateSource: function (template, templateDocument)
            {
                // Named template
                if (typeof template == "string")
                {
                    var definition = templateManager.get(template);
                    if (definition)
                        return new ThrustTemplateSource(definition);
                }

                return oldEngine.makeTemplateSource.apply(oldEngine, arguments);
            }
        });

        ko.setTemplateEngine(new ko.conventionTemplateEngine());
    };

    /**
    @module thrust.template
    @submodule thrust.template.convention
    **/

    /**
    * # __thrust/template__ Convention - Knockout Engine
    *
    * The knockout engine convention is less of a convention and instead introduces a new custom knockout template engine
    * This engine takes the the same template path, that you'd use to fetch a template instead of the dom id, to fetch the template
    * when using knockout templates by name.
    *
    *
    * This allows you to follow the same convention in both your modules, as you would your views and templates.
    *
    * @for thrust.template.convention
    * @property templates
    **/
    return new Convention({
        countdown: function (thrust)
        {
            initKnockoutIntegration(thrust.template);
        }
    });
});