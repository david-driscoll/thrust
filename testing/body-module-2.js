define(['thrust/util'],
function (util)
{
    return {
        init: util.noop,
        context: 'body',
        container: 'body',
        ready: function ()
        {
            if (!this.$('.body').length)
                this.$().append('<div class="body"></div>');

            this.$('.body').text('BODY MODULE 2!');
        },
        destroy: util.noop,
        autoStart: true
    };
});
