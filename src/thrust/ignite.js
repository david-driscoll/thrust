define(["require", "exports", 'module', 'thrust/util', './config', './capsule', './instance'], function(require, exports, __requireModule__, __util__, __config__, __tm__, __instance__) {
    'use strict';
    var requireModule = __requireModule__;

    var util = __util__;

    var _ = util._;
    
    var config = __config__;

    var tm = __tm__;

    var instance = __instance__;

    var slice = Array.prototype.slice, isArray = _.isArray, toArray = _.toArray, isFunction = _.isFunction, each = _.each, map = _.map, any = _.any, all = _.all, when = util.when, extend = _.extend, flatten = _.flatten, pluck = _.pluck, isObject = _.isObject, keys = _.keys, union = _.union;
    function mergeSettings(settings) {
        if((settings).__settingsMerged) {
            return settings;
        }
        var requireConfig = requireModule.config(), plugins = [
'thrust/mediator'        ].concat(settings.plugins || requireConfig.plugins || config.plugins || []), conventions = [].concat(settings.conventions || requireModule.config().conventions || config.plugins || []);
        settings = _.merge({
        }, config, requireModule.config(), settings, {
            __settingsMerged: true,
            plugins: plugins,
            conventions: conventions
        });
        settings.plugins = plugins;
        settings.conventions = conventions;
        return settings;
    }
    exports.mergeSettings = mergeSettings;
    function fuse(settings) {
        var pipe = [];
        settings = mergeSettings(settings);
        if(!instance.instances[settings.name]) {
            pipe.push(stageOne);
        }
        pipe.push(stageTwo);
        if(settings.modules && settings.modules.length) {
            pipe.push(stageThree);
        }
        var promise = when.pipeline(pipe, settings);
        return promise;
    }
    exports.fuse = fuse;
    function stageOne(settings) {
        var plugins = settings.plugins, requireConfig = requireModule.config(), defer = when.defer();
        settings.plugins = plugins;
        require(plugins.map(function (x) {
            return x;
        }), function () {
            var args = arguments;
            plugins.forEach(function (plugin, i) {
                var name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginSettings = settings[name] || {
                }, pluginRequireConfig = requireConfig[name] || {
                }, pluginClass = args[i][args[i].className];
                if(!config[name]) {
                    config[name] = _.merge(pluginClass.config, pluginRequireConfig || {
                    });
                }
                var conventions = [].concat(pluginSettings.conventions || pluginRequireConfig.conventions || config[name].conventions || []);
                settings[name] = _.merge({
                }, config[name], pluginSettings || {
                }, {
                    conventions: conventions
                });
                settings[name].conventions = conventions;
            });
            defer.resolve(settings);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageOne = stageOne;
    function stageTwo(settings) {
        var localConfig = settings, defer = when.defer();
        var plugins = localConfig.plugins, modulesToLoad = [], thrustConventions = settings.conventions || [], modulesConfigurations = {
thrust: 'thrust'        };
        for(var i = 0, iLen = plugins.length; i < iLen; i++) {
            var plugin = plugins[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = localConfig[name];
            modulesToLoad.push(plugin);
            modulesToLoad.push(pluginConfig && pluginConfig.conventions || []);
            modulesConfigurations[plugin] = pluginConfig;
        }
        var orderedPlugins = [
'name', 
'cfg'        ], reloop = true, iLen = modulesToLoad.length, i = 0;
        while(i < iLen) {
            var plugin = modulesToLoad[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), pluginConfig = localConfig[name];
            if(pluginConfig && pluginConfig.resolve && pluginConfig.resolve.length > 0 && !all(pluginConfig.resolve, function (x) {
                return any(orderedPlugins, function (z) {
                    return x === z || x === z;
                });
            })) {
                modulesToLoad.push.apply(modulesToLoad, modulesToLoad.splice(i, 2));
            } else {
                i += 2;
                orderedPlugins.push(name);
            }
        }
        var modules = localConfig.modules || [];
        modulesToLoad.push.apply(modulesToLoad, [
            'thrust', 
            settings.conventions || []
        ]);
        modulesToLoad = flatten(modulesToLoad);
        var spec = {
            name: localConfig.name || 'global',
            cfg: localConfig
        };
        require(modulesToLoad, function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var currentPlugin = null, allConventions = [];
            for(var i = 0, iLen = modulesToLoad.length; i < iLen - thrustConventions.length; i++) {
                var plugin = modulesToLoad[i], mConfig = modulesConfigurations[plugin];
                if(mConfig) {
                    var pluginObject = args[i], name = plugin.substring(plugin.lastIndexOf('/') + 1), resolveItems = map(mConfig.resolve, function (x) {
return spec[x];                    });
                    var pluginClass = pluginObject[pluginObject.className];
                    currentPlugin = spec[name] = util.instantiate(pluginClass, resolveItems);
                    currentPlugin.__conventions = [];
                } else {
                    if(currentPlugin) {
                        _.forOwn(args[i], function (x) {
                            return currentPlugin.__conventions.push(x);
                        });
                        _.forOwn(args[i], function (x) {
                            return allConventions.push(x);
                        });
                    }
                }
            }
            currentPlugin.__conventions = allConventions;
            var thrustConventionDefinitions = args.slice(modulesToLoad.length - thrustConventions.length);
            thrustConventionDefinitions = flatten(map(thrustConventionDefinitions, function (x) {
                return map(x, function (z) {
                    return z;
                });
            }));
            currentPlugin.__thrustConventions = thrustConventionDefinitions;
            allConventions.push.apply(allConventions, thrustConventionDefinitions);
            extend(currentPlugin, spec);
            defer.resolve(spec);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageTwo = stageTwo;
    function stageThree(context) {
        var thrust = context.thrust, defer = when.defer(), modules = context.cfg.modules;
        modules = _.filter(modules, function (x) {
            return !thrust.modules[x];
        });
        require(modules, function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var Module = tm.Module;
            var moduleDefinitions = args;
            for(var i = 0, iLen = modules.length; i < iLen; i++) {
                var mod = modules[i], definition = moduleDefinitions[i];
                var moduleInstance = new Module(thrust, definition, mod);
                moduleInstance.thrustCreate(thrust);
            }
            defer.resolve(context);
        }, defer.reject);
        return defer.promise;
    }
    exports.stageThree = stageThree;
})
//@ sourceMappingURL=ignite.js.map
