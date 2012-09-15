define(['thrust/util'],
function(util) {
    return {
        init: util.noop,
        start: function ()
        {
        },
        context: '#g1',
        ready: function ()
        {
            this.$().append('g1 loaded!');
        },
        stop: function ()
        {
        },
        destroy: util.noop
    };
});