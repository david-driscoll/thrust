define(['thrust/convention', 'thrust/util'],
function (Convention, util)
{
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
    return new Convention({
        orbit: function (thrust)
        {
            var router = thrust.spa;
            router.start();

            return thrust.spa.startingModulePromise || undefined;
        }
    });
});