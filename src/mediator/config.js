define(function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust.mediator
    @submodule thrust.mediator.config
    **/
    'use strict';

    var config = {

        /**
        Resolves the given properties when creating an instance of the plugin.

        This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
        to the plugin constructor method.

        @for thrust.mediator.config
        @private
        @property resolve
        @readOnly
        @type {Array}
        **/
        resolve: ['name', 'cfg'],
        /**
        The set of conventions to load into thrust/mediator.

        @property conventions
        @readOnly
        @type {Array}
        **/
        conventions: [
            'thrust/mediator/convention/container',
            'thrust/mediator/convention/subscription',
            'thrust/mediator/convention/autostart',
            'thrust/mediator/convention/dependant.modules'
        ]
    };

    return config;
});