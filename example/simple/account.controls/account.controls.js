define(['thrust/define!global["thrust/dom, thrust/data"]', 'knockout', 'thrust/util', 'knockout.mapping'],
function(tDefine, ko, util, koMapping)
{
    var accountDataPromise,
        when = util.when;

    return tDefine(function ($, request)
    {
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
                accountDataPromise = request.get('account.controls/account.controls.json')
                    .then(when.apply(this.buildModel.bind(this)));
            },
            buildModel: function (data)
            {
                this.viewModel = koMapping.fromJS(data);
            },
            destroy: util.noop,
            start: function ()
            {
            },
            ready: function ()
            {
                $.addClass('btn-group pull-right');
                $.html(this.templates['account.controls/account.controls']());
                // Hold ready until our data comes back.
                return accountDataPromise.then(this.applyBindings.bind(this));
            },
            applyBindings: function ()
            {
                ko.applyBindings(this.viewModel, $[0]);
            },
            stop: function ()
            {
            }
        };
    });
});