/// <reference path="../../interfaces/dom/convention/context.d.ts" />
/// <reference path="../../interfaces/dom/dom.d.ts" />
/// <reference path="../../interfaces/mediator/mediator.d.ts" />
/// <reference path="../../interfaces/thrust.d.ts" />
/// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import c = module('thrust/convention');
var Convention = c.Convention;

import util = module('thrust/util');
var _ = util._;

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
		CONTEXT = 'context';

	interface IThrustConventionDomAnimateContainer extends IThrustConvention.Properties,
		IThrustConvention.Plugin.Init.Void,
		IThrustConvention.Plugin.Ready.Void {}

	var methods: IThrustConventionDomAnimateContainer = {
		properties: [ANIMATE],
		init: function (mod: IThrustModule, facade: IThrustDomFacade): void
		{
			var that = this,
				mediator = mod.instance.mediator;

			mediator.subscribe(event.changeContainer, bind(that.change, that, mod));
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
		},
		ready: function (mod: IThrustModule, facade: IThrustDomFacade): void
		{
			var that = this,
				animate = mod.convention(ANIMATE),
				container = mod.convention(CONTAINER),
				context = mod.convention(CONTEXT),
				dom = facade;

			if (animate && container)
			{
				var clone = dom.context.clone().appendTo(dom.context.parent());
				clone.addClass(animate.replace(/\./g, ' ').trim());
				mod.instance.dom = mod.instance.$ = clone;	

				setTimeout(bind(that.cleanup, that, dom.context.parent(), animate, context), 2000);
			}
		},
		cleanup: function (container, animate, context)
		{
			container.find(context).filter(':not(' + animate + ')').remove();
		}
	};
	export var animateContainer = new Convention(methods);