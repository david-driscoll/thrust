/// <reference path="../../interfaces/template/template.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

    var TEMPLATES = 'templates',
        when = util.when,
        each = _.each,
        hasOwn = Object.prototype.hasOwnProperty,
        find = _.find;

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
    interface IThrustConventionTemplateTemplate extends IThrustConventionProperties, IThrustConvention.Plugin.Init, IThrustConvention.Plugin.Ready {}

    var methods : IThrustConventionTemplateTemplate = {
        properties: [TEMPLATES],
        init: function(mod: IThrustModule, facade : IThrustTemplateFacade) : Promise
        {
            var defer = when.defer();

            var templates = mod.convention(TEMPLATES),
                invertedTemplates = util.invert(templates),
                moduleInstance = mod.instance;

            if (templates)
            {
                var defers = [];
                each(templates, function(template)
                {
                    if (typeof template === 'string')
                    {
                        defers.push(facade.fetch(template));
                    }
                });
                facade.loadingPromise = when.all(defers).then(function (loadedTemplates : IThrustTemplateInstance[])
                {
                    /*jshint loopfunc:true */
                    _.each(invertedTemplates, function(x, i)
                    {
                        var template = _.find(loadedTemplates, function (x) { return x.shortName === i || x.name === i; });
                        moduleInstance.templates[i] = template.compiled;
                    });
                });
            }
            return null;
        },
        ready: function (mod: IThrustModule, facade : IThrustTemplateFacade) : Promise
        {
            return facade.loadingPromise || undefined;
        }
    };
    export var template = new Convention(methods);