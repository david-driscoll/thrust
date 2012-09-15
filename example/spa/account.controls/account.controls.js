define(['knockout', 'thrust/util', 'knockout.mapping'],
function(ko, util, koMapping)
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
            this.viewModel = koMapping.fromJS(data);
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
            ko.applyBindings(this.viewModel, this.$()[0]);
        },
        stop: function ()
        {
        }
    };
});