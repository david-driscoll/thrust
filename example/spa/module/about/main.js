define(['thrust/util'],
function (util)
{
    var dataPromise,
        wapply = util.when.apply;

    return {
        dependantModules: ['module/alert'],
        container: 'main',
        context: '#main-content',
        templates: ['module/about/content'],
        init: function ()
        {
            dataPromise = this.data.get('module/about/alert.json');
        },
        destroy: util.noop,
        ready: function()
        {
            var that = this;

            this.$().html(this.templates['module/about/content']());

            return dataPromise.then(wapply(function (data)
            {
                that.mediator.fire('module/alert/content', data.text);
            }));
        }
    };
});