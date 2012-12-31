/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';

export import c = module('thrust/convention');
var Convention = c.Convention;

    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    /**
    * # __thrust/mediator__ Convention - Auto Start
    *
    * The auto start property allows for a module, to be automatically started once it is
    * included into a thrust instnace, without having to explicity call start on the module.
    *
    *
    * This is useful for certian types of modules, usually persistant ones that always need to load regardless.
    * For example a navigation module, or user settings module.
    *
    * @for thrust.mediator.convention
    * @property autoStart
    **/
	var methods : IThrustConventionProperties =  {
		properties: ['autoStart']
	};
    export var autostart = new Convention(methods);
