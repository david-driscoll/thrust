﻿define(['thrust/util'],
function (util)
{
    return {
        init: util.noop,
        start: function ()
        {
        },
        config: {
            dom: {
                context: '#i2',
            }
        },
        ready: function ()
        {
            this.$.show();
        },
        stop: function ()
        {
            this.$.hide();
        },
        destroy: util.noop
    };
});