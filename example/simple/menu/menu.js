define(['knockout', 'thrust/util', 'knockout.mapping'],
function (ko, util, koMapping)
{
    var menuDataPromise,
        menuReadyPromise,
        when = util.when;

    return {
        templates: [
            'actionlink',
            'menu/menu'
        ],
        context: '#main-menu',
        autoStart: true,
        subscriptions: {
            'thrust/spa/route/run': function (path)
            {
                var that = this;
                menuReadyPromise.then(function ()
                {
                    that.$().$('ul')
                        .children()
                            .removeClass('active')
                        .find('[href$="' + (path || 'index') + '"]')
                        .parent().addClass('active');
                });
            }
        },
        init: function ()
        {
            // Get our data from the server or service.
            menuDataPromise = this.data.get('menu/menu.json')
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
            this.$().html(this.templates['menu/menu']());
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