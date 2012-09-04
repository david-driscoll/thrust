define(['thrust/convention', 'thrust/util'],
function (Convention, util)
{
    var when = util.when;
    var whenQueue = [],
        waitCallback = function (uid)
        {
            var defer = when.defer();
            defer.resolver.uid = uid;

            whenQueue.push({ uid: uid, resolver: defer.resolver });
        },
        stopCallback = function (uid)
        {
            var item = util.find(whenQueue, function (x) { return x.uid === uid; });
            whenQueue = util.without(whenQueue, item);

            item.resolver.resolve();
        };

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
    return new Convention({
        countdown: function(thrust)
        {
            // Subscribe to the wait and stop events
            thrust.data.subscribe('thrust/data/wait', waitCallback);
            thrust.data.subscribe('thrust/data/stop', stopCallback);
        },
        orbit: function (thrust)
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
    });
});