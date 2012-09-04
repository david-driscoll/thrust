define(['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    var event     = {
            anyContainer: 'thrust/mediator/convention/container/any',
            changeContainer: 'thrust/mediator/convention/container/change'
        },
        any       = util.any,
        bind      = util.bind,
        CONTAINER = 'container',
        START     = 'start-status',
        defer     = util.defer,
        bind      = util.bind;

    /**
    * # __thrust/mediator__ Convention - Container
    *
    * The `container` convention allows you to define a virtual `container`, for your modules to go in.
    * Conceptually only one module can be in the box at once, so when one module starts, if the `container`
    * already has a module in it, that module will be shutdown and replaced by this module.
    *
    *
    * This convention lets you not worry about cleaning up your mess, you can just focus on what modules
    * need to start, and if you have any common modules, like a main module area, it will swap automatically.
    *
    *
    *     container: 'main',
    *
    *
    * Any other module that also loads with container `main` will then get loaded into the container, and the
    * currently active module will be stopped.
    *
    * @for thrust.mediator.convention
    * @property container
    **/
    return new Convention({
        properties: [CONTAINER],
        change: function (module, container)
        {
            var containerValue = module.convention(CONTAINER);
            if (containerValue && container && containerValue === container)
            {
                if (module.convention(START))
                    defer(bind(module.stop, module));
            }
        },
        start: function (facade, module)
        {
            var that = this,
                containerValue = module.convention(CONTAINER);
            if (containerValue)
            {
                facade.fire(event.changeContainer, containerValue);
                // Facade subscriptions get unsubscribed when stopping a module, so we need to resubscribe every time here.
                // This is probably better, as the events will be less chatty.
                facade.subscribe(event.changeContainer, bind(that.change, that, module));
            }
        },
        stop: function (facade)
        {
        }
    });
});