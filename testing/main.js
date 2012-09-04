require(['require', 'thrust', 'thrust/log', 'thrust/util'], function (require, thrust, log, util)
{
    var instance = thrust.launch({
        modules: [/*'thrust-module', 'thrust-data-module', */'body-module-1']
    });
    
    instance.then(function (context)
    {
        log.info(context);
        window.thrust = context.thrust;

        /*util.delay(function ()
        {
            require(['body-module-2'], function (m)
            {
                window.thrust.createModule('body-module-2', m).start();
            });
        }, 3000);*/
    });
}/*, function (err) {
    //The errback, error callback
    //The error has a list of modules that failed
    var failedId = err.requireModules && err.requireModules[0];
    if (failedId === 'jquery') {
        //undef is function only on the global requirejs object.
        //Use it to clear internal knowledge of jQuery. Any modules
        //that were dependent on jQuery and in the middle of loading
        //will not be loaded yet, they will wait until a valid jQuery
        //does load.
        requirejs.undef(failedId);

        //Set the path to jQuery to local path
        requirejs.config({
            paths: {
                jquery: 'local/jquery'
            }
        });

        //Try again. Note that the above require callback
        //with the "Do something with $ here" comment will
        //be called if this new attempt to load jQuery succeeds.
        require(['jquery'], function () {});
    } else {
        throw new Error();
    }
}*/);