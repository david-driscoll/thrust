define(['thrust/util'],
function (util)
{
    return {
        init: util.noop,
        destroy: util.noop,
        autoStart: true,
        subscriptions: {
            'test-sub': util.noop
        },
        events: {
            'click': util.noop
        },
        context: '#context',
        actions: {
            click: {
                'doNoop': util.noop
            }
        }
    };
});
