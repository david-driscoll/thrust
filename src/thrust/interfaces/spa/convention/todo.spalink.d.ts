///// <reference path="../../interfaces/dom/dom.d.ts" />
///// <reference path="../../interfaces/spa/spa.d.ts" />
///// <reference path="../../interfaces/thrust.d.ts" />
///// <reference path="../../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

//// Disabled until TS supports module per file in some way (ie exports is exports.<export> not  exports.moduleName.<export>)
///*export module instance {*/

//'use strict';
//import c = module('thrust/convention');
//var Convention = c.Convention;
//import util = module('thrust/util');
//var _ = util._;

//import subjquery = module('thrust/dom/subjquery');
//var $ = subjquery.tQuery;

//    var parseFullHref = function (href)
//    {
//        var baseUrl = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

//        if (href.indexOf('/') != -1)
//        {
//            href = href.substring(href.lastIndexOf('/'));
//        }
//        else
//        {
//            href = '/' + href;
//        }

//        return baseUrl + href;
//    };
//    /**
//    @module thrust.dom
//    @submodule thrust.dom.convention
//    **/

//    /**
//    * # __thrust/dom__ Convention - Single Page App Link
//    *
//    * Requires thrust/dom
//    *
//    * @for thrust.dom.convention
//    * @property spa;ink
//    **/
//    var methods : IThrustConvention.Orbit = {
//        orbit: function (thrust : IThrust) : Promise
//        {
//            var config = thrust.config,
//                spa = thrust.spa;

//            $.on('click', 'a', function (e)
//            {
//                var link = parseFullHref(this.getAttribute('href'));
//                if (link.indexOf(config.url.path) === 0)
//                {
//                    spa.navigate(link);

//                    e.preventDefault();
//                    e.stopImmediatePropagation();
//                    return false;
//                }
//            });
//            return null;
//        }
//    };
//    export var spalink = new Convention(methods);