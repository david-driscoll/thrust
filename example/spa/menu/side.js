/// <reference path="side.js" />
define(['kob-model', 'thrust/util'],
function (KnockoutBackbone, util)
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
            this.model = new KnockoutBackbone.SimpleKnockoutModel(data);
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
            this.model.getViewModel().applyBindings(this.$()[0]);

            menuReadyPromise.resolve();
        },
        stop: function ()
        {
        }
    };
});