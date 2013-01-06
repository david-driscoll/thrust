(function (require)
{
    'use strict';
    //#region default settings
    function getSettings(mode, settings)
    {
        var allSettings = {"debug":{"baseUrl":".","paths":{"require":"../../lib/requirejs/require","lodash":"../../lib/lodash/lodash","text":"../../lib/requirejs-text/text","i18n":"../../lib/requirejs-i18n/i18n","domReady":"../../lib/requirejs-domready/domReady","doT":"../../lib/doT/doT","jquery":"../../lib/jquery/jquery","flatiron/director":"../../lib/director/build/director","has":"../../lib/has/has","backbone":"../../lib/backbone/backbone","knockout":"../../lib/knockout/build/output/knockout-latest.debug"},"packages":[{"name":"when","main":"when","location":"../../lib/when"},{"name":"thrust/util","location":"../../src/thrust/util"},{"name":"thrust","location":"../../src/thrust"},{"name":"thrust/mediator","location":"../../src/thrust/mediator"},{"name":"thrust/data","location":"../../src/thrust/data"},{"name":"thrust/dom","location":"../../src/thrust/dom"},{"name":"thrust/template","location":"../../src/thrust/template"},{"name":"thrust/spa","location":"../../src/thrust/spa"}],"shim":{"flatiron/director":{"exports":"Router"}}},"release":{"baseUrl":".","paths":{"require":"../../lib/requirejs/require","lodash":"../../lib/lodash/lodash","text":"../../lib/requirejs-text/text","i18n":"../../lib/requirejs-i18n/i18n","domReady":"../../lib/requirejs-domready/domReady","doT":"../../lib/doT/doT","jquery":"../../lib/jquery/jquery","flatiron/director":"../../lib/director/build/director","has":"../../lib/has/has","backbone":"../../lib/backbone/backbone","knockout":"../../lib/knockout/build/output/knockout-latest.debug","thrust":"../../dist/thrust","thrust/util":"../../dist/thrust.util","thrust/mediator":"../../dist/thrust.mediator","thrust/data":"../../dist/thrust.data","thrust/dom":"../../dist/thrust.dom","thrust/template":"../../dist/thrust.template","thrust/spa":"../../dist/thrust.spa"},"packages":[{"name":"when","main":"when","location":"../../lib/when"}],"shim":{"flatiron/director":{"exports":"Router"}}},"releaseMin":{"baseUrl":".","paths":{"require":"../../lib/requirejs/require","lodash":"../../lib/lodash/lodash","text":"../../lib/requirejs-text/text","i18n":"../../lib/requirejs-i18n/i18n","domReady":"../../lib/requirejs-domready/domReady","doT":"../../lib/doT/doT","jquery":"../../lib/jquery/jquery","flatiron/director":"../../lib/director/build/director","has":"../../lib/has/has","backbone":"../../lib/backbone/backbone","knockout":"../../lib/knockout/build/output/knockout-latest.debug","thrust":"../../dist/thrust.min","thrust/util":"../../dist/thrust.util.min","thrust/mediator":"../../dist/thrust.mediator.min","thrust/data":"../../dist/thrust.data.min","thrust/dom":"../../dist/thrust.dom.min","thrust/template":"../../dist/thrust.template.min","thrust/spa":"../../dist/thrust.spa.min"},"packages":[{"name":"when","main":"when","location":"../../lib/when"}],"shim":{"flatiron/director":{"exports":"Router"}}},"integrated":{"baseUrl":".","paths":{"thrust":"../../dist/thrust.all.libraries..0.1.5.min","thrust/util":"../../dist/thrust.all.libraries..0.1.5.min","thrust/mediator":"../../dist/thrust.all.libraries..0.1.5.min","thrust/data":"../../dist/thrust.all.libraries..0.1.5.min","thrust/dom":"../../dist/thrust.all.libraries..0.1.5.min","thrust/template":"../../dist/thrust.all.libraries..0.1.5.min","thrust/spa":"../../dist/thrust.all.libraries..0.1.5.min","jquery":"../../lib/jquery/jquery"},"packages":[],"shim":{"flatiron/director":{"exports":"Router"}}}};

        // debug / release, releaseMin, integrated
        var defaults = allSettings[mode];

        if (!settings.paths)
            settings.paths = {};
        for (var i in defaults.paths)
            if (!settings.paths[i])
                settings.paths[i] = defaults.paths[i];

        if (!settings.packages)
            settings.packages = defaults.packages;
        else
            settings.packages = settings.packages.concat(defaults.packages);

        for (var i in defaults.shim)
            if (!settings.shim[i])
                settings.shim[i] = defaults.shim[i];

        return settings;
    }
    //#endregion

    // debug / release, releaseMin, integrated
    require.config(getSettings('debug', {
        paths: {
            'backbone': '../../lib/backbone/backbone',
            'knockout': '../../lib/knockout/build/output/knockout-latest.debug',
        },
        packages: [],
        shim: {
            'showdown': {
                exports: 'Showdown'
            },
            'backbone': {
                deps: ['lodash', 'jquery'],
                exports: 'Backbone'
            }
        },
        has: {
            DEBUG: true
        },
        config: {
            'thrust/ignite': {
                url: {
                    path: '/example/multipleinstances'
                },
                plugins: [
                    'thrust/dom'
                ],
                data: {
                    startTimeout: 0
                },
                modules: []
            }
        }
    }));

    require(['has'], function (has)
    {
        has.add('DEBUG', true);

        require(['main']);
    });
})(require);
