define(['thrust/convention', 'thrust/util', '../jquery.interface'],
function (Convention, util, jQueryInterface)
{
    var event           = {
            anyContainer: 'thrust-convention-container-any',
            changeContainer: 'thrust-convention-container-change'
        },
        any             = util.any,
        defer           = util.defer,
        bind            = util.bind,
        START           = 'start-status',
        ANIMATE         = 'animate',
        CONTAINER       = 'container',
        CONTEXT         = 'context',
        updatejQueryInternals = jQueryInterface.updatejQueryInternals;

    return new Convention({
        properties: [ANIMATE],
        init: function (facade, module)
        {
            var that = this,
                mediator = module.instance.mediator;
            mediator.subscribe(event.changeContainer, bind(that.change, that, module));
        },
        change: function (module, container)
        {
            if (module.convention(CONTAINER) === container)
            {
                if (module.convention(START))
                {
                    var animate = module.convention(ANIMATE);
                    if (animate)
                    {
                        var contextNode = module.instance.dom();
                        contextNode.removeClass(animate);
                    }
                }
            }
        },
        ready: function (facade, module)
        {
            var that = this,
                animate = module.convention(ANIMATE),
                container = module.convention(CONTAINER),
                context = module.convention(CONTEXT),
                dom = facade;

            if (animate && container)
            {
                var clone = dom.clone().appendTo(dom.parent());
                clone.addClass(animate.replace(/\./g, ' ').trim());
                updatejQueryInternals.call(dom, clone);

                setTimeout(bind(that.cleanup, that, dom.parent(), animate, context), 2000);
            }
        },
        cleanup: function(container, animate, context)
        {
            container.find(context).filter(':not(' + animate + ')').remove();
        }
    });
});