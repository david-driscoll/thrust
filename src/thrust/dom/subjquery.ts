/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
import jQuery = module('jquery');
import util = module('thrust/util');
var _ = util._;
import log = module('thrust/log');
import has = module('has');

var format = util.format,
	each = _.each,
	extend = _.extend,
	isObject = _.isObject,
	isFunction = _.isFunction,
	slice = Array.prototype.slice,
	GLOBAL = '.global';

var jQueryFnMethodBlackList = ['ready', 'extend', 'queue', 'dequeue', 'clearQueue', 'promise', 'bind', 'unbind', 'live', 'die', 'delegate', 'undelegate', 'blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'error', 'serialize', 'serializeArray', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend', '_toggle', 'fadeTo', 'stop', 'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle'/*, 'on', 'off', 'one'*/];

function normalizeEvents(events, namespace)
{
	if (!namespace)
		return events;

	if (isObject(events))
	{
		// Create new object, so that original object will not be modified when binding.
		events = extend({}, events);
		for (var key in events)
		{
			if (key.indexOf('.') === -1)
			{
				events[key + namespace] = events[key];
				delete events[key];
			}
		}
		return events;
	}
	else
	{
		if (!events)
			return namespace;

		events = events.split(' ');
		for (var i = 0, iLen = events.length; i < iLen; i++)
		{
			var evt = events[i];
			if (evt.indexOf('.') === -1)
				events[i] = evt + namespace;
		}
		return events.join(' ');
	}
}

/*
	Clone jquery
	Remove all excess methods we don't want to expose natively.
	overrload any methods we want to change behavior of (noteably on, one, and off)

	Instead of duplicating the jquery behavior we instead realign it to our own.
*/

// jQuery sub
function subJQuery(): any
{
	var tQuery = function (selector, context, namespace)
	{
		return new tQuery.prototype.init(selector, context, namespace || (this && this.namespace));
	}
	_.merge(tQuery, jQuery);

	// Do not like
	// probably needed in some special unique cases
	tQuery.jQuery = jQuery;
	// expose events for doing special events as required.
	tQuery.event = (<any> jQuery).event;

	tQuery.fn = tQuery.prototype = extend({}, jQuery.fn);
	tQuery.fn.constructor = tQuery;

	tQuery.fn.init = function init(selector, context, namespace)
	{
		var ioDom = context instanceof tQuery;
		if (context && context instanceof jQuery && !(ioDom))
		{
			context = tQuery(context);
		}

		var result = jQuery.fn.init.call(this, selector, context, tQueryRoot);
		if (namespace)
			result.namespace = namespace;
		else if (ioDom)
			result.namespace = context.namespace;

		return result;
	};

	tQuery.fn.init.prototype = tQuery.fn;
	var tQueryRoot = tQuery(document);

	// remove all not applicable methods off of fn.
	each(jQueryFnMethodBlackList, function (x)
	{
		if (tQuery.fn[x])
		{
			tQuery.fn[x] = null;
			delete tQuery.fn[x];
		}
	});

	_.each(['on', 'one', 'off'], (x) =>
	{
		tQuery.fn[x] = _.wrap(tQuery.fn[x], function (f, ...args: any[])
		{
			has('DEBUG') && log.debug(format('tQuery[{0}]: Binding ' + x + ' events...', this.namespace));
			args[0] = normalizeEvents(args[0], this.namespace);
			return f.apply(this, args);
		});
	});

	tQuery.fn.query = tQuery.fn.$ = tQuery.fn.find;

	return tQuery;
}

export var tQuery = subJQuery();