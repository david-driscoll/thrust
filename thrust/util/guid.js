define(["require", "exports", 'lodash'], function(require, exports, _____) {
    /// <reference path="../../lib/DefinitelyTyped/requirejs/require-2.1.d.ts" />
    // Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
    //export module guid {
    'use strict';
    var _ = _____;

    
    /**
    @module thrust.util
    @submodule thrust.util
    **/
        var S4 = function () {
        /*jshint bitwise:false */
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);    }, guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, emtptyGuid = '00000000-0000-0000-0000-000000000000';
    /**
    Returns a new sudo guid, limiations in JavaScript make must more reliable guids fairly difficult to create.
    
    @for thrust.util
    @method newGuid
    @returns {Guid} The new guid.
    **/
    function newGuid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    exports.newGuid = newGuid;
    /**
    Returns an empty guid.
    
    @method emptyGuid
    @returns {Guid} The emtpty guid.
    **/
    function emptyGuid() {
        return emtptyGuid;
    }
    exports.emptyGuid = emptyGuid;
    /**
    Checks if the given string is a guid.
    
    @method isGuid
    @param {Guid} guid
    @returns {Boolean} If the guid is a guid or not.
    **/
    function isGuid(guid) {
        return _.isString(guid) ? guidRegex.test(guid) : false;
    }
    exports.isGuid = isGuid;
    /**
    Checks if the Guid is an Empty Guid
    
    @method isGuidEmpty
    @param {Guid} guid
    @returns {Boolean} If the guid is a guid or not.
    **/
    function isGuidEmpty(guid) {
        return guid === emtptyGuid;
    }
    exports.isGuidEmpty = isGuidEmpty;
})
//@ sourceMappingURL=guid.js.map
