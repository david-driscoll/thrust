define(['thrust/convention'],
function (Convention)
{
    /**
    @module thrust.mediator
    @submodule thrust.mediator.convention
    **/

    /**
    * # __thrust/mediator__ Convention - Auto Start
    *
    * The auto start property allows for a module, to be automatically started once it is
    * included into a thrust instnace, without having to explicity call start on the module.
    *
    *
    * This is useful for certian types of modules, usually persistant ones that always need to load regardless.
    * For example a navigation module, or user settings module.
    *
    * @for thrust.mediator.convention
    * @property autoStart
    **/
    return new Convention({
        properties: ['autoStart']
    });
});