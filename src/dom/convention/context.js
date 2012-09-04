define(['thrust/convention', '../jquery.interface'],
function (Convention, jQueryInterface)
{
    var CONTEXT         = 'context',
        updatejQueryInternals = jQueryInterface.updatejQueryInternals;

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Context
    *
    * The context convention allows you to specific a selector for your module.  This selector can be anything that is compatable with jQuerys Sizzle engine.
    *
    * Then the default context of your modules `dom()` / `$()` will be that selector.  In addition any internal find `dom.find` / `dom.$` / `$.find` / `dom.$`,
    * will also have the selector as the root context.
    *
    *
    *     {
    *         context: '#myDiv'
    *     }
    *
    *
    *
    * @for thrust.dom.convention
    * @property context
    **/
    return new Convention({
        properties: [CONTEXT],
        ready: function (facade, module)
        {
            var context = module.convention(CONTEXT),
                dom     = facade;

            if (context)
            {
                updatejQueryInternals.call(dom, context);
            }
        }
    });
});