define(['thrust', 'knockout'],
function (thrust, ko)
{
    var Thrust = thrust.Thrust;
    var instanceRunMethod = function (name, method, stop)
    {
        return function ()
        {
            require(['thrust!' + name], function (instance)
            {
                if (stop && instance.started || !stop && !instance.started)
                    instance[method](true);
            });
        };
    };

    var viewModel = {
        global: {
            active: ko.observable(false),
            start: instanceRunMethod('global', 'countdown'),
            stop: instanceRunMethod('global', 'deorbit', true)
        },
        instance2: {
            active: ko.observable(false),
            start: instanceRunMethod('instance2', 'countdown'),
            stop: instanceRunMethod('instance2', 'deorbit', true)
        },
        instance3: {
            active: ko.observable(false),
            start: instanceRunMethod('instance3', 'countdown'),
            stop: instanceRunMethod('instance3', 'deorbit', true)
        }
    };

    viewModel.instance2.enabled = viewModel.instance3.enabled = ko.computed(function ()
    {
        return viewModel.global.active();
    });

    var attachToInstance = function (name)
    {
        if (!name) name = 'global';
        return function (context)
        {
            context.mediator.subscribe('thrust/ready', function ()
            {
                viewModel[name].active(true);
            });

            context.mediator.subscribe('thrust/stop', function ()
            {
                viewModel[name].active(false);
            });

            viewModel[name].active(context.thrust.started);

            return context;
        };
    };

    var instance2 = function ()
    {
        var i2 = Thrust.launch({
            name: 'instance2',
            modules: ['instance2/i2']
        });

        setInterval(function ()
        {
            if (window.instance2.started)
            {
                window.instance2.deorbit();
            }
            else
            {
                window.instance2.countdown();
            }
        }, 5000);
    };

    var instance3 = function ()
    {
        Thrust.launch({
            name: 'instance3',
            modules: ['instance3/i3']
        });
    };

    var start = function ()
    {
        var interval

        Thrust.launch({
            modules: ['global/g1']
        })
        .then(spawnChildren)
        .then(attachToInstance())
        .then(function (context)
        {
            ko.applyBindings(viewModel);
            return context;
        })
        .then(function (context)
        {
            context.mediator.subscribe('thrust/stop', function ()
            {
                clearInterval(interval);
            });

            context.mediator.subscribe('thrust/init', function ()
            {
                interval = setInterval(function ()
                {
                    if (window.instance2.started)
                    {
                        window.instance2.deorbit(true);
                    }
                    else
                    {
                        window.instance2.countdown(true);
                    }
                }, 5000);
            });

            /*interval = setInterval(function ()
            {
                if (window.instance2.started)
                {
                    window.instance2.deorbit(true);
                }
                else
                {
                    window.instance2.countdown(true);
                }
            }, 5000);*/

            return context;
        });
    };

    var spawnChildren = function (context)
    {
        context.thrust.spawn({
            name: 'instance2',
            autoStart: true,
            modules: ['instance2/i2']
        }).then(attachToInstance('instance2'));

        context.thrust.spawn({
            name: 'instance3',
            modules: ['instance3/i3']
        }).then(attachToInstance('instance3'));

        return context;
    };

    start();
});