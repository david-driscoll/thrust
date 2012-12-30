define(['thrust/util'],
function (util)
{
    var dataPromise,
        wapply = util.when.apply;

    return {
        dependentModules: ['module/alert'],
        container: 'main',
        context: '#main-content',
        templates: ['module/contact/content'],
        init: function ()
        {
            dataPromise = this.data.get('module/contact/alert.json');
        },
        destroy: util.noop,
        ready: function()
        {
            var that = this;

            this.$().html(this.templates['module/contact/content']());

            return dataPromise.then(wapply(function (data)
            {
                that.mediator.fire('module/alert/content', data.text);
            }));
        }
    };
});