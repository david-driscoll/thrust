/// <reference path="../../interfaces/data/data.config.d.ts" />
/// <reference path="../../interfaces/data/data.d.ts" />
/// <reference path="../../interfaces/convention.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />

// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
/*export module instance {*/

'use strict';
export import c = module('thrust/convention');
var Convention = c.Convention;
import util = module('thrust/util');
var _ = util._;

    var when = util.when;
    var whenQueue = [];

    function waitCallback(uid)
    {
        var d = when.defer();
        d.resolver['uid'] = uid;

        whenQueue.push({ uid: uid, resolver: d.resolver });
    }

    function stopCallback(uid)
    {
        var item = _.find(whenQueue, function (x) { return x.uid === uid; });
        whenQueue = _.without(whenQueue, item);

        item.resolver.resolve();
    }

    /**
    * @module thrust.data
    * @submodule thrust.data.convention
    **/

    /**
    *
    * # __thrust/data__ Convention - Start
    *
    * The data start convention, delays thrusts ready (orbit) event, until a timeout, or all the calls return, which ever happens first.
    *
    * This convention allows your applicfation to delay it's loading, until all the data that is required to be preloaded has ben loaded.
    *
    *## Why is this useful?
    *
    * Take an example you have a complex application, that needs data from several different API's. Perhaps you're loading tweets from twitter,
    * user profile information from your server, and the pages main content.
    *
    *
    * The typical page will load and do all it's operations on DOM Ready, and fire off it's data requests.  You then perhaps have a loader up
    * on the tweet box, and the users profile picture.
    *
    *
    * A Thrust base page, will have an overall loader up.  As it starts up the modules, any module that fires off a data request will have that
    * request captured.  Once all requests have been completed, thrust completes loading, and any modules that were expecting data, will have it
    * immediately with their ready call.
    *
    *
    *##That's cool, but what if I need a long running call?
    *
    *
    * That's a good point sometimes your application does not need to be blocked, maybe you expect that call to be long running, or you don't
    * really know if it'll be long running or not.  Using data plugin API you can pass the following option, and the queue will be bypassed.
    *
    *
    *    { silent: true }
    *
    *
    * @for thrust.data.convention
    * @property start
    **/
    interface IThrustConventionDataStart extends IThrustConventionCountdown, IThrustConventionOrbit {}

    var methods : IThrustConventionDataStart = {
    	countdown: function (thrust: IThrust): Promise
        {
            // Subscribe to the wait and stop events
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
			return null;
        },
        orbit: function (thrust: IThrust): Promise
        {
            // Unsubscribe from the wait and stop events
            thrust.data.unsubscribe('thrust/data/wait', waitCallback);
            thrust.data.unsubscribe('thrust/data/stop', stopCallback);

            // defer until any of the events that were captured are resolved, or the delay passes.
            var defer = when.defer();

            if (thrust.cfg.data.finishTimeout === 0)
            {
                return when.all(whenQueue);
            }
            return when.any([when.all(whenQueue), when.delay(thrust.cfg.data.finishTimeout)], defer.resolve, defer.reject);
        }
    };
    export var subscription = new Convention(methods);