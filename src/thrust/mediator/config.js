define(["require", "exports"], function(require, exports) {
    /// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    /**
    Provides thrust configuration
    
    @module thrust.mediator
    @submodule thrust.mediator.config
    **/
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
    exports.resolve = [
        'name', 
        'cfg'
    ];
    /**
    The set of conventions to load into thrust/mediator.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/mediator/convention/container', 
        'thrust/mediator/convention/subscription', 
        'thrust/mediator/convention/autostart', 
        'thrust/mediator/convention/dependent.modules'
    ];
})
//@ sourceMappingURL=config.js.map
