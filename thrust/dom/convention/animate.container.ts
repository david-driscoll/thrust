/// <reference path="../../interfaces/mediator/mediator.facade.d.ts" />
/// <reference path="../../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../interfaces/dom/dom.facade.d.ts" />
/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;

import util = module('thrust/util');
var _ = util._;

import jQueryInterface = module('../jquery.interface');

	var event = {
		anyContainer: 'thrust-convention-container-any',
		changeContainer: 'thrust-convention-container-change'
	},
		any = _.any,
		defer = _.defer,
		bind = _.bind,
		START = 'start-status',
		ANIMATE = 'animate',
		CONTAINER = 'container',
		CONTEXT = 'context',
		updatejQueryInternals = jQueryInterface.updatejQueryInternals;

	interface IThrustConventionDomAnimateContainer extends IThrustConventionProperties,
		IThrustConventionInit,
		IThrustConventionReady {}

	var methods: IThrustConventionDomAnimateContainer = {
		properties: [ANIMATE],
		init: function (facade: IThrustDomFacade, mod: IThrustModule): Promise
		{
			var that = this,
				mediator = mod.instance.mediator;

			mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
			return null;
		},
		change: function (module , container)
		{
			if (module.convention(CONTAINER) === container)
			{
				if (module.convention(START))
				{
					var animate = module.convention(ANIMATE);
					if (animate)
					{
						var contextNode = module.instance.dom();
						contextNode.removeClass(animate);
					}
				}
			}
			return null;
		},
		ready: function (facade: IThrustDomFacade, mod: IThrustModule): Promise
		{
			var that = this,
				animate = mod.convention(ANIMATE),
				container = mod.convention(CONTAINER),
				context = mod.convention(CONTEXT),
				dom = facade;

			if (animate && container)
			{
				var clone = dom.clone().appendTo(dom.parent());
				clone.addClass(animate.replace(/\./g, ' ').trim());
				updatejQueryInternals.call(dom, clone);

				setTimeout(bind(that.cleanup, that, dom.parent(), animate, context), 2000);
			}
			return null;
		},
		cleanup: function (container, animate, context)
		{
			container.find(context).filter(':not(' + animate + ')').remove();
		}
	};
	export var animateContainer = new Convention(methods);