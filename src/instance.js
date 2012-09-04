define(['thrust/util'],
function(util)
{
    /**
    Gets the thrust instances.

    @module thrust
    **/
    var when = util.when;
    return {
        /**
        The available thrust instances
        index by name

        @for thrust.instance
        @property instances
        @private
        **/
        instances: {},
        /**
        The loading thurst instances.
        index by name

        @property loadingInstances
        @private
        **/
        loadingInstances: {},
        /**
        Gets a named thrust stance if it exists.
    
        @method getInstance
        @static
        @param {String} name The instance name
        @returns {Thrust} The thrust instance
        **/
        getInstance: function (name)
        {
            return this.instances[name] || false;
        },
        /**
        Fetchs a named thrust stance if it exists.
        This loads asyncronously, as the instance may not be loaded
    
        @method __fetchInstance
        @static
        @private
        @param {String} name The instance name
        @returns {Promise} To a thrust instance spec
        **/
        fetchInstance: function (name)
        {
            return this.loadingInstances[name] || (this.loadingInstances[name] = when.defer());
        }
    };
});