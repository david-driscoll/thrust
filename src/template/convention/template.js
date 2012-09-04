define(['thrust/convention', 'thrust/util'],
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