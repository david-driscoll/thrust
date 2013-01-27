define(["require", "exports", 'thrust/convention', 'thrust/util', 'thrust/dom/subjquery'], function(require, exports, __c__, __util__, __subjquery__) {
    'use strict';
    var c = __c__;

    var Convention = c.Convention;
    var util = __util__;

    var _ = util._;
    var subjquery = __subjquery__;

    var $ = subjquery.tQuery;
    var parseFullHref = function (href) {
        var baseUrl = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
        if(href.indexOf('/') != -1) {
            href = href.substring(href.lastIndexOf('/'));
        } else {
            href = '/' + href;
        }
        return baseUrl + href;
    };
    var methods = {
        orbit: function (thrust) {
            var config = thrust.config, spa = thrust.spa;
            $.on('click', 'a', function (e) {
                var link = parseFullHref(this.getAttribute('href'));
                if(link.indexOf(config.url.path) === 0) {
                    spa.navigate(link);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            });
        }
    };
    exports.spalink = new Convention(methods);
})
//@ sourceMappingURL=spalink.js.map
