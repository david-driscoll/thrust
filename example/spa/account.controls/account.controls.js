define(['kob-model', 'thrust/util'],
function(KnockoutBackbone, util)
{
    var accountDataPromise,
        when = util.when;

    return {
        templates: [
            'actionlink',
            'account.controls/account.controls'
        ],
        context: '#user-controls',
        autoStart: true,
        init: function ()
        {
            // Get our data from the server or service.
            accountDataPromise = this.data.get('account.controls/account.controls.json')
                .then(when.apply(this.buildModel.bind(this)));
        },
        buildModel: function(data)
        {
            this.model = new KnockoutBackbone.SimpleKnockoutModel(data);
        },
        destroy: util.noop,
        start: function ()
        {
        },
        ready: function ()
        {
            this.$().addClass('btn-group pull-right');
            this.$().html(this.templates['account.controls/account.controls']());
            // Hold ready until our data comes back.
            return accountDataPromise.then(this.applyBindings.bind(this));
        },
        applyBindings: function ()
        {
            this.model.getViewModel().applyBindings(this.$()[0]);
        },
        stop: function ()
        {
        }
    };
});