/// <reference path="../../interfaces/spa/spa.d.ts" />
/// <reference path="../../interfaces/template/template.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

    /**
    @module thrust.spa
    @submodule thrust.spa.convention
    **/

    /**
    * # __thrust/spa__ Convention - Start
    *
    * The single page app start convention, does the actual starting of the plugin, in addition it also delays
    * full orbit, until any module it has started has been loaded.
    *
    * @for thrust.spa.convention
    * @property start
    **/
    var methods : IThrustConvention.Orbit.PromiseObject = {
        orbit: function (thrust : IThrust) : Promise
        {
            var router = thrust.spa;
            router.start();

            return thrust.spa.startingModulePromise || null;
        }
    };
    export var start = new Convention(methods);