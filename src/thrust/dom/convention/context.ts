/// <reference path="../../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../interfaces/dom/dom.facade.d.ts" />
/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;

import util = module('thrust/util');
var _ = util._;

import jQueryInterface = module('../jquery.interface');

    var CONTEXT         = 'context',
        updatejQueryInternals = jQueryInterface.updatejQueryInternals;

    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Context
    *
    * The context convention allows you to specific a selector for your module.  This selector can be anything that is compatable with jQuerys Sizzle engine.
    *
    * Then the default context of your modules `dom()` / `$()` will be that selector.  In addition any internal find `dom.find` / `dom.$` / `$.find` / `dom.$`,
    * will also have the selector as the root context.
    *
    *
    *     {
    *         context: '#myDiv'
    *     }
    *
    *
    *
    * @for thrust.dom.convention
    * @property context
    **/
    interface IThrustConventionDomContext extends IThrustConventionProperties,
		IThrustConventionReady {}

    var methods: IThrustConventionDomContext = {
        properties: [CONTEXT],
        ready: function (facade: IThrustDomFacade, mod: IThrustModule): Promise
        {
        	var context = mod.convention(CONTEXT);

            if (context)
            {
                updatejQueryInternals.call(facade, context);
            }

            return null;
        }
    };
	export var context = new Convention(methods);