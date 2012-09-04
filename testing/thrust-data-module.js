define(['thrust/util'],
function (util)
{
    return {
        init: function ()
        {
            this.data.get(window.location.href, { contentType: 'text/plain', dataType: 'text' });
        },
        destroy: util.noop,
        autoStart: true
    };
});
