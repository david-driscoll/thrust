/// <reference path="../../interfaces/dom/convention/context.d.ts" />
/// <reference path="../../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../interfaces/dom/dom.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import c = module('thrust/convention');
var Convention = c.Convention;

import util = module('thrust/util');
var _ = util._;

import subjquery = module('../subjquery');
var tQuery = subjquery.tQuery;

var CONTEXT = 'config.dom.context';

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
*     config: {
*         dom: {
*             context: '#myDiv'
*         }
*     }
*
*
*
* @for thrust.dom.convention
* @property context
**/
interface IThrustConventionDomContext extends IThrustConvention.Properties,
    IThrustConvention.Plugin.Ready.Void {}

var methods: IThrustConventionDomContext = {
    properties: [CONTEXT],
    ready: function (mod: IThrustModule, facade: IThrustDomFacade): void {
        var context = mod.convention(CONTEXT);

        if (context) {
            mod.instance.dom = mod.instance.$ = tQuery(context, facade.context);
        }
    }
};
export var context = new Convention(methods);