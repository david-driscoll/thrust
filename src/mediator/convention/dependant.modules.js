define(['require', 'thrust/convention', 'thrust/util', 'thrust'],
function (require, Convention, util, thrust)
{
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    var any      = util.any,
        map      = util.map,
        DMODULES = 'dependantModules',
        CMODULES = 'childModules',
        START    = 'start-status',
        defer    = util.defer,
        bind     = util.bind;

    var invokeDependantModules = function (module, method)
    {
        var requiredModules = module.convention(DMODULES);
        if (requiredModules)
        {
            return module.thrust[method](requiredModules);
        }
    };

    var invokeChildModules = function (module, method)
    {
        var requiredModules = module.convention(CMODULES);
        if (requiredModules)
        {
            return module.thrust[method](requiredModules);
        }
    };

    /**
    * # __thrust/mediator__ Convention - Dependant Modules
    *
    * The dependant module convention introduces two properties to a module.
    *
    * `dependantModules` {Array}<br />
    * These are modules that must be started along side your module, but aren't required to be stopped with your module.
    * As an example you have an alerts module, this gives you alerts at the top of your page.  Your account settings module
    * may be dependant on alerts, so it can fire events into the module, but alerts is not bound to the life cycle of your settings module.
    *
    *
    * `childModules` {Array}<br />
    * These are modules that must be started and stopped along side your module.  An example of this would be a context module
    * that perhaps gives changes state to an object that is clicked in your module.
    *
    * @for thrust.mediator.convention
    * @property modules
    **/
    return new Convention({
        properties: [DMODULES, CMODULES],
        init: function (facade, module)
        {
        },
        start: function (facade, module)
        {
            return util.when.all(util.flattenToPromises([invokeDependantModules(module, 'start'), invokeChildModules(module, 'start')]));
        },
        ready: function (facade, module)
        {
            if (!module.thrust.started)
                return util.when.all(util.flattenToPromises([invokeDependantModules(module, 'ready'), invokeChildModules(module, 'ready')]));
        },
        stop: function (facade, module)
        {
            return invokeChildModules(module, 'stop');
        },
        destroy: function (facade, module)
        {
            return invokeChildModules(module, 'destroy');
        }
    });
});