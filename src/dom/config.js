define(function (thrustInstance)
{
    /**
    Provides thrust configuration
    
    @module thrust.dom
    @submodule thrust.dom.config
    **/
    'use strict';

    var config = {
        /**
        Resolves the given properties when creating an instance of the plugin.

        This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
        to the plugin constructor method.

        @for thrust.dom.config
        @private
        @property resolve
        @readOnly
        @type {Array}
        **/
        resolve: ['name', 'mediator'],
        /**
        The set of conventions to load into thrust/dom.

        @property conventions
        @readOnly
        @type {Array}
        **/
        conventions: [
            'thrust/dom/convention/action',
            'thrust/dom/convention/context',
            'thrust/dom/convention/event'
            //'thrust/dom/convention/page.ready'
        ]
    };
    return config;
});