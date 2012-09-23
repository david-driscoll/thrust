/// <reference path="side.js" />
define(['knockout', 'thrust/util', 'knockout.mapping'],
function (ko, util, koMapping)
{
    var menuDataPromise,
        menuReadyPromise,
        when = util.when;

    return {
        templates: [
            'actionlink',
            'menu/side',
            'menu/side.header'
        ],
        context: '#side-menu',
        autoStart: true,
        init: function ()
        {
            // Get our data from the server or service.
            menuDataPromise = this.data.get('menu/side.json')
                .then(when.apply(this.buildModel.bind(this)));
        },
        buildModel: function (data)
        {
            this.viewModel = koMapping.fromJS(data);
        },
        destroy: util.noop,
        start: function ()
        {
            menuReadyPromise = when.defer();
        },
        ready: function ()
        {
            this.$().addClass('nav-collapse');
            this.$().html(this.templates['menu/side']());
            // Hold ready until our data comes back.
            return menuDataPromise.then(this.applyBindings.bind(this));
        },
        applyBindings: function ()
        {
            ko.applyBindings(this.viewModel, this.$()[0]);

            menuReadyPromise.resolve();
        },
        stop: function ()
        {
        }
    };
});