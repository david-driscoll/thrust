/// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

    'use strict';
    /**
    Provides thrust configuration
    
    @module thrust.spa
    @submodule thrust.spa.config
    **/

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
        export var resolve = ['cfg', 'name', 'mediator'];
        /**
        The set of conventions to load into thrust/mediator.

        @property conventions
        @readOnly
        @type {Array}
        **/
        export var conventions = [
            'thrust/spa/convention/start',
            'thrust/spa/convention/spalink'
        ];
        /**
        Defines the value of custom parameters.
        You can also define custom parameters to be a regular expression, and then use them in your routes

        @property params
        @readOnly
        @type {Object}
        **/
        export var params = {};
        /**
        The predfined routes to be used by spa.

        @property routes
        @readOnly
        @type {Object}
        **/
        export var routes = {};
        /**
        The file exstenion that should be removed when resolving routes and starting modules.

        @property fileExtension
        @readOnly
        @type {String}
        **/
        export var fileExtension = '.html';
