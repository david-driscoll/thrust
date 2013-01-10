/// <reference path="../interfaces/data/data.d.ts" />
/// <reference path="../interfaces/template/template.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

    'use strict';
    import util = module('thrust/util');
    var _ = util._;
    //import tData = module('thrust/data');
    import log = module('thrust/log');
    import tConfig = module('thrust/config');
    import domReady = module('domReady');
    import facade = module('thrust/facade');
    export import config = module('./config');
	export var className = 'Template';
	config;

        var LONG        = 'long',
            SHORT       = 'short',
            ID          = 'id',
            deepCopy    = _.merge,
            format      = util.format,
            each        = _.each,
            bind        = _.bind,
            when        = util.when,
            reduce      = _.reduce,
            memoize     = _.memoize,
            map         = _.map,
            extend      = _.extend,
            getLongName = function (name : string, type? : string) : string
            {
                var that = <Template> this,
					result = (that.shortName(name) + '.' + (type || that.config.defaultType) + that.config.extension).toLowerCase();
                return result;
            },
            getShortName = function (name : string) : string
            {
                var that = <Template> this,
					result = reduce(that.templateTypes, function (memo, x) { return memo.replace('.' + x.toLowerCase() + that.config.extension, ''); }, name.toLowerCase()).toLowerCase();
                return result;
            },
            getTemplateId = function (name : string) : string
            {
				var that = this,
					result = that.shortName(name).replace(/\//g, '-');
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
        export class Template implements IThrustTemplate
        {
        	public name: string;
        	public templateTypes: any;
        	public longName: (name: string, type?: string) => string;
        	public shortName: (name: string) => string;
        	public templateId: (name: string) => string;
        	public engines: any;
        	public data: IThrustData;
        	public config: IThrustTemplateConfig;
        	public templates: IThrustTemmplateContainer;

        	constructor(config: IThrustConfig, data: IThrustData)
        	{
        		var that = this,
					templateConfig = this.config = config.template;

        		that.templateTypes = map(templateConfig.types, function (x, i) { return i; });
        		that.templates = {
        			long: <IThrustTemplateDictionary> { },
        			short: <IThrustTemplateDictionary> { },
        			id: <IThrustTemplateDictionary> { },
        		};

				that.longName      = <any> memoize(bind(getLongName, that));
				that.shortName     = <any> memoize(bind(getShortName, that));
				that.templateId    = <any> memoize(bind(getTemplateId, that));
				that.engines       = {};
				that.data          = data;

				require([(templateConfig.templatePaths[templateConfig.defaultType] || 'thrust/template/' + templateConfig.defaultType)], function (engine)
				{
					that.engines[templateConfig.defaultType] = engine;

					domReady(function ()
					{
						(<any> _(document.getElementsByTagName('script')))
							.filter(function(x) { return !!x.getAttribute('data-template'); })
							.each(bind(that.createFromDomNode, that));
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
            public get(name : string) : IThrustTemplateInstance
            {
                var template = null, that = this, templates = that.templates;

                if (template = templates.long[that.longName(name)])
                    return template;
                else if (template = templates.short[that.shortName(name)])
                    return template;
                else if (template = templates.id[that.templateId(name)])
                    return template;
                return null;
            }
            /**
            Sets a template to the cache, with the given information

            @for thrust.template.Template
            @method set
            @param {String} name The template name
            @param {String} type The template engine type
            @param {Function} compiledTemplate The compiled template method
            @param {String} html The template HTML.
            **/
            public set(name: string, type: string, compiledTemplate: (x : any) => string, html: string): void
            {
                var that = this,
                    shortName = that.shortName(name),
                    templateId = that.templateId(name),
                    longName = that.longName(name, type),
                    templates = that.templates;

                templates.long[longName] = templates.short[shortName] = templates.id[templateId] = {
                    name: name,
                    shortName: name,
                    id: templateId,
                    type: type,
                    html: html,
                    compiled: compiledTemplate
                };
            }
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
            public has(name: string): bool
            {
                var that = this;
                return !!that.get(name);
            }
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
            public newTemplate(name : string, type : string, html : any, engine?): IThrustTemplateInstance
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
            }
            /**
            Compiles a template given the html and the engine type.

            @for thrust.template.Template
            @method compile
            @param {String} html The html to generate the template from
            @param {String} engine The template engine that is being used.
            @returns {Function} The compiled template method
            **/
            public compile(html : string, engine?) : (x : any) => string
            {
                var that = this, templatingMethod;
                if (!engine)
                    engine = that.engines[that.config.defaultType];

                if (typeof engine === 'function')
                    templatingMethod = engine;
                else if (typeof engine.template === 'function')
                    templatingMethod = engine.template;

                return templatingMethod(html);
            }
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
            public fetch(name: string, type?: string): Promise
            {
                var that = this,
                    type = type || that.config.defaultType,
                    shortName = that.shortName(name),
                    longName = that.longName(name, type),
                    template;

                var defer = when.defer();

                if (template = that.get(name))
                {
                    defer.resolve(template);
                    return defer.promise;
                }

                that.data.get(that.config.baseUrl + longName, { contentType: 'text/plain', dataType: 'text', silent: true }).then(when.apply(function (data)
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
                            require([(that.config.templatePaths[type] || 'thrust/template/' + type)], function (engine)
                            {
                                that.engines[type] = engine;
                                var template = that.newTemplate(name, type, data, engine);
                                defer.resolve(template);
                            });
                        }
                    }
                }), defer.reject);

                return defer.promise;
            }
            /**
            Creates a new template from the given DOM Node

            @for thrust.template.Template
            @method createFromDomNode
            @protected
            @param {Node} element THe dome element.
            **/
            public createFromDomNode(element: HTMLScriptElement) : void
            {
                var that = this;
                that.newTemplate(
                    element.getAttribute('data-template'),
                    element.getAttribute('data-type'),
                    element.text
                );
            }
			
			/**

			@for thrust.template.Template
			@method createFacade
			@param {thrust.Thrust} thrust The thrust instance
			@param {thrust.Module} module The module to create the facade for
			@param {Object} facades The facades already added for this module.
			**/
			public createFacade(thrust: IThrust, mod: IThrustModuleInstance, facades: IThrustModuleFacades): IThrustFacade
			{
				var templateInstance = thrust.template;

				var facade = facades.template = new TemplateFacade(mod, this);
				mod.templates = <IThrustTemplateMethods> {
					fetch: bind(templateInstance.fetch, templateInstance),
					get: bind(templateInstance.get, templateInstance),
					has: bind(templateInstance.has, templateInstance)
				};

				return facade;
			}
				
			public static config = config;
        }

    /**

    @for thrust.template
    @class thrust.template.TemplateFacade
    @constructor
    @param {thrust.Module} module The module to create the facade for
    @param {thrust.template.Template} parent The template instance to create the facade for.
    **/
	var TemplateFacade: IThrustTemplateFacade = (() =>
	{    
		var templateFacade: any = facade.createFacade(function (module, parent)
		{
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

/**
AMD API
load

Handles fetching of a thrust/template by path.
Requires the instance, that the template is expected to come from.
thrustInstance[:engineName]:templatePath

Prefix with <engineName>: to select a specific template engine.
thrust/template!global:templates/myTemplate.tmpl = Specific template
thrust/template!instance2:templates/myTemplate = Uses default extension from config
thrust/template!instance2:kendo:templates/myTemplate.tmpl = Uses the kendo template engine.
thrust/template!instance3:kendo:templates/myTemplate.tmpl = Uses the kendo template engine with the default extension


@method load
@static
@param {String} name The name of the template that is being fetched
@param {Function} parentRequire the require method to be loaded
@param {Function} load Allows the load to inform that AMD for the value to hand off
@param {Object} config The custom configuration.
**/
// Not completed yet
// Should behave similarly to text!
//export function load(name: string, parentRequire, load, config)
//{
//    var templatePath = name,
//        templateEngine,
//        colon = templatePath.indexOf(':');

//	var parts = name.split(':'),
//        instanceName = parts[0],
//		templateEngine = parts[1],
//		templatePath = parts[2] || templateEngine;
//    if (parts.length === 2)
//        templateEngine = null;

//	//var instancePromise = Thrust.__fetchInstance(realName);
//    // Get the data plugin.
//    parentRequire(['thrust!data:' + instanceName], (dataPlugin) =>
//    {
//        var dataPlugin = dataPlugin
//    });
//}
