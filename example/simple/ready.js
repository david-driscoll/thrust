define(['thrust/util'],
function (util)
{
    return {
        subscriptions: {
            'thrust/ready': function ()
            {
                var that = this;
                that.$().removeClass('loading');
            },
        },
        context: 'body',
        init: function () { },
        destroy: function () { },
        autoStart: true
    };
});