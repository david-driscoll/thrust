define(["require", "exports"], function(require, exports) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    /*export module instance {*/
    'use strict';
    /**
    Provides thrust configuration
    
    @module thrust.template
    @submodule thrust.template.config
    **/
    /**
    Resolves the given properties when creating an instance of the plugin.
    
    This is for internal thrust use.  Thrust uses this array to generate the properties that need to be handed
    to the plugin constructor method.
    
    @for thrust.template.config
    @private
    @property resolve
    @readOnly
    @type {Array}
    **/
    exports.resolve = [
        'cfg', 
        'data'
    ];
    /**
    The set of conventions to load into thrust/template.
    
    @property conventions
    @readOnly
    @type {Array}
    **/
    exports.conventions = [
        'thrust/template/convention/template', 
        'thrust/template/convention/knockout.engine'
    ];
    /**
    Maps the available templates, to their appropriate module name.
    
    **precompiled is a special case, and those methods are expected to be code built functions.
    
    @property types
    @readOnly
    @type {Object}
    **/
    exports.types = {
        'doT': 'doT',
        'precompiled': true
    };
    /**
    Maps the template evaluators, so that when creating a template for knockout, it knows how to properly output the information.
    
    @property evaluators
    @readOnly
    @type {Object}
    **/
    exports.evaluators = {
        'doT': {
            left: '{{= ',
            right: '}}'
        }
    };
    /**
    The default template type, used when extension isn't given.
    
    @property defaultType
    @readOnly
    @type {String}
    @default 'doT'
    **/
    exports.defaultType = 'doT';
    /**
    The base location, relative to the application path for template location.
    If template paths are given relative to application path, this can be left empty.
    
    @property baseUrl
    @readOnly
    @type {String}
    @default ''
    **/
    exports.baseUrl = '';
    /**
    Defines the extension used for templates stored on the server.
    
    @property extension
    @readOnly
    @type {String}
    @default '.tmpl'
    **/
    exports.extension = '.tmpl';
    /**
    Defines the AMD paths to find the given template type
    
    @property templatePaths
    @readOnly
    @type {String}
    @default {}
    **/
    exports.templatePaths = {
        'doT': 'doT'
    };
})
//@ sourceMappingURL=config.js.map
