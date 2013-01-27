define(["require", "exports", './instance'], function(require, exports, __thrustInstance__) {
    'use strict';
    var thrustInstance = __thrustInstance__;

    exports.throwErrors = true;
    exports.async = true;
    exports.exposeGlobals = true;
    exports.url = {
        path: '/',
        traditionalEncoding: true
    };
    exports.log = {
        level: 4,
        enabled: true
    };
    exports.plugins = [];
    exports.modules = [];
    exports.childInstance = false;
    exports.automaticLifecycle = true;
    exports.autoStart = false;
    exports.conventions = [
        'thrust/convention/container', 
        'thrust/convention/autostart', 
        'thrust/convention/dependent.modules'
    ];
    function load(name, parentRequire, load, config) {
        var parts = name.split(':'), realName = parts[0], pluginName = parts[1] || false;
        var instanceDeferred = thrustInstance.fetchInstance(realName);
        instanceDeferred.promise.then(function (context) {
            var plugin = pluginName && context.cfg[pluginName] || context.config;
            if(!plugin) {
                throw new Error('Plugin "' + pluginName + '" does not exist on thrust instance "' + realName + '".');
            }
            load(plugin);
        });
    }
    exports.load = load;
})
//@ sourceMappingURL=config.js.map
