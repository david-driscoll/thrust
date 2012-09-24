define([],
function()
{
    return {
        init: function ()
        {
            console.log('sample.module init');
        },
        start: function()
        {
            console.log('sample.module start');
        },
        ready: function()
        {
            console.log('sample.module ready');
        },
        stop: function()
        {
            console.log('sample.module stop');
        },
        destroy: function ()
        {
            console.log('sample.module destroy');
        }
    };
});