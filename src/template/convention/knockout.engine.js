define(['thrust/convention', 'thrust/util', 'knockout'],
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