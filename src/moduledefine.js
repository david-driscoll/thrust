//(function (define, require, undefined)
//{
//    "use strict";
//    var win = window,
//        slice = Array.prototype.slice,
//        hashCode = function(str)
//        {
//            var hash = 0, i, char;

//            if (str.length == 0)
//                return hash;

//            for (i = 0; i < str.length; i++)
//            {
//                char = str.charCodeAt(i);
//                hash = ((hash<<5)-hash)+char;
//                hash = hash & hash; // Convert to 32bit integer
//            }
//            return hash;
//        };

//    var module = win.module = {
//        'for': function(name)
//        {
//            return {
//                define: function ()
//                {
//                    moduledefine.apply(win, [name].concat(slice.call(arguments)));
//                }
//            };
//        }
//    };

//    /**
//    @global
//    @method moduledefine
//    @param {String} instanceName The thrust instnace name
//    @param {String} [name] The module name
//    @param {Array} [deps] The required dependancies
//    @param {Function|Object} callback The callback function or module definition object.
//    **/
//    var moduledefine = win.moduledefine = function (instanceName, name, deps, callback)
//    {
//        if (typeof name.some !== 'undefined')
//        {
//            callback = deps;
//            deps = name;
//            name = undefined;
//        }
//        if (typeof deps.some === 'undefined')
//        {
//            callback = deps;
//            deps = [];
//        }

//        var hashString = typeof callback === 'function' ? callback.toString() : JSON.stringify(callback),
//            autoRequire = false,
//            hash = hashCode(hashString);

//        for (var i = 0, iLen = deps.length; i < iLen; i++)
//        {
//            deps[i] = 'thrust/facade!' + instanceName + ':' + deps[i] + ':' + hash;
//        }

//        define(name, deps, function ()
//        {
//            var moduleObject = typeof callback === 'function' ? callback.apply(this, args) : callback;
//            moduleObject.hash = hash;

//            return moduleObject;
//        });
//    };
//})(define, require);
