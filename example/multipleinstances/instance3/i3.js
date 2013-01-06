define(['thrust/util'],
function (util)
{
    return {
        init: util.noop,
        start: function ()
        {
        },
        context: '#i3active',
        ready: function ()
        {
            var that = this;
            this.$.show().on('click', '.btn', function ()
            {
                window.instance3.deorbit(true);
            });
        },
        stop: function ()
        {
            this.$.hide();
        },
        destroy: util.noop
    };
});