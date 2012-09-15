define(['thrust'],
function(Thrust)
{
    var instance2 = function ()
    {
        var i2 = Thrust.launch({
            name: 'instance2',
            modules: ['instance2/i2']
        });

        setInterval(function ()
        {
            if (window.instance2.started)
            {
                window.instance2.deorbit();
            }
            else
            {
                window.instance2.countdown();
            }
        }, 5000);
    };

    var instance3 = function ()
    {
        Thrust.launch({
            name: 'instance3',
            modules: ['instance3/i3']
        });
    };

    var start = function ()
    {
        Thrust.launch({
            modules: ['global/g1']
        }).then(instance2)
            .then(instance3);
    };


    start();
});