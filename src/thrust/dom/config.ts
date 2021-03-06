/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

    'use strict';

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
        export var resolve = ['name', 'mediator'];
        /**
        The set of conventions to load into thrust/dom.

        @property conventions
        @readOnly
        @type {Array}
        **/
        export var conventions = [
            'thrust/dom/convention/action',
            'thrust/dom/convention/context',
            'thrust/dom/convention/event'
        ];
