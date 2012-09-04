define(function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust.spa
    @submodule thrust.spa.config
    **/
    'use strict';

    var config = {
        /**
        Resolves the given properties when creating an instance of the plugin.

        This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
        to the plugin constructor method.

        @for thrust.spa.config
        @private
        @property resolve
        @readOnly
        @type {Array}
        **/
        resolve: ['cfg', 'name', 'mediator'],
        /**
        The set of conventions to load into thrust/mediator.

        @property conventions
        @readOnly
        @type {Array}
        **/
        conventions: [
            'thrust/spa/convention/start'
        ],
        /**
        The predfined routes to be used by spa.

        @property routes
        @readOnly
        @type {Object}
        **/
        routes: {}
    };

    return config;
});