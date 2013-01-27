define(["require", "exports", 'lodash', '../type', 'module'], function(require, exports, _____, __uType__, __m__) {
    'use strict';
    var _ = _____;

    var uType = __uType__;

    var m = __m__;

    var r20 = /%20/g, rbracket = /\[\]$/;
    function param(a, traditional) {
        var prefix, s = [], add = function (key, value) {
value = _.isFunction(value) ? value() : (value == null ? "" : value);s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);        };
        if(traditional === undefined) {
            traditional = !!m.config().traditionalEncoding;
        }
        if(uType.isArrayOrArrayLike(a)) {
            _.each(a, function (x) {
                add(x.name, x.value);
            });
        } else {
            for(prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&").replace(r20, "+");
    }
    exports.param = param;
    function buildParams(prefix, obj, traditional, add) {
        if(_.isArray(obj)) {
            _.each(obj, function (i, v) {
                if(traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" || _.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
        } else {
            if(!traditional && obj != null && typeof obj === "object") {
                for(var name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            } else {
                add(prefix, obj);
            }
        }
    }
})
//@ sourceMappingURL=param.js.map
