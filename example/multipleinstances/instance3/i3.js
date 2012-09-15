define(['thrust/util'],
function (util)
{
    return {
        init: util.noop,
        start: function ()
        {
        },
        context: '#i3',
        ready: function ()
        {
            var that = this;
            this.$().append('i3 loaded!');

            this.$('#i3active').on('click', '.btn', function ()
            {
                window.instance3.deorbit();
            });
        },
        stop: function ()
        {
            this.$().empty();
        },
        destroy: util.noop
    };
});