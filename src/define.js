define(['thrust/util', 'thrust/module'],
function (util, Module)
{
    var regex = /[\[\]\'\"\s]/g,
        each = util.each;

    var thrustCache = Module.thrustCache;
    return {
        dynamic: true,
        // thrust/define!{instance}[{plugins}]
        load: function (resourceId, require, load, config)
        {
            var instanceName = resourceId.substring(0, resourceId.indexOf('[')),
                pluginString = resourceId.substring(instanceName.length).replace(regex, ''),
                plugins = pluginString.split(',');

            require(['thrust!' + instanceName], function (thrust)
            {
                var method = function (definition)
                {
                    // Maybe overlay params on the function itself.
                    return function (name)
                    {
                        var thrustModuleCacheItem = thrustCache[thrust.name + ':' + name] = { facades: {}, instance: {} },
                            args = [];

                        each(plugins, function (x)
                        {
                            var pluginName = x.substring(x.lastIndexOf('/') + 1 || 0),
                                plugin = thrust[pluginName];

                            var facade = plugin.createFacade(thrust, thrustModuleCacheItem.instance, thrustModuleCacheItem.facades);

                            args.push(facade);
                        });

                        return definition.apply(definition, args);
                    };
                };

                load(method);
            });
        }
    };
});