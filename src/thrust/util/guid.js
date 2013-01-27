define(["require", "exports", 'lodash'], function(require, exports, _____) {
    'use strict';
    var _ = _____;

    
    var S4 = function () {
return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);    }, guidRegex = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, emtptyGuid = '00000000-0000-0000-0000-000000000000';
    function newGuid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    exports.newGuid = newGuid;
    function emptyGuid() {
        return emtptyGuid;
    }
    exports.emptyGuid = emptyGuid;
    function isGuid(guid) {
        return _.isString(guid) ? guidRegex.test(guid) : false;
    }
    exports.isGuid = isGuid;
    function isEmptyGuid(guid) {
        return guid === emtptyGuid;
    }
    exports.isEmptyGuid = isEmptyGuid;
})
//@ sourceMappingURL=guid.js.map
