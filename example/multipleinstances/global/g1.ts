/// <reference path="../../../src/thrust/interfaces/convention/dependent.modules.d.ts" />
/// <reference path="../../../src/thrust/interfaces/convention/container.d.ts" />
/// <reference path="../../../src/thrust/interfaces/mediator/convention/subscription.d.ts" />
/// <reference path="../../../src/thrust/interfaces/mediator/mediator.d.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/dom.d.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/convention/event.d.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/convention/context.d.ts" />
/// <reference path="../../../src/thrust/interfaces/dom/convention/action.d.ts" />
/// <reference path="../../../src/thrust/interfaces/data/data.d.ts" />
/// <reference path="../../../src/thrust/interfaces/thrust.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />
define(['thrust/util'],
function(util) {
    var mod : IThrustModuleInstance = {
        config: {
            dom: {
                context: '#g1',
            }
        },
        init: util.noop,
        start: function ()
        {
        },
        ready: function ()
        {
            this.$.append('g1 loaded!');
        },
        stop: function ()
        {
        },
        destroy: util.noop
    };

    return mod;
});