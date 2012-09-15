define(['thrust/util', 'knockout'],
function (util, ko)
{
    var dataPromise,
        readyPromise,
        when = util.when;

    return {
        container: 'alert',
        context: '#alert-block',
        subscriptions: {
            'module/alert/content': 'setContent',
            'module/alert/content/show': 'showContent',
            'module/alert/content/hide': 'hideContent'
        },
        setContent: function (text)
        {
            this.viewModel.text(text);
            this.viewModel.visible(true);
        },
        hideContent: function ()
        {
            this.viewModel.visible(false);
        },
        showContent: function ()
        {
            this.viewModel.visible(true);
        },
        init: util.noop,
        ready: function ()
        {
            var that = this,
                viewModel = that.viewModel = {
                visible: ko.observable(true),
                text: ko.observable('')
            };
            viewModel.shown = ko.computed(function () { return viewModel.visible() && !!viewModel.text(); });

            this.$().attr('data-bind', 'visible: shown, html: text');
            ko.applyBindings(this.viewModel, this.$()[0]);
        },
        stop: function ()
        {
        },
        destroy: util.noop
    };
});