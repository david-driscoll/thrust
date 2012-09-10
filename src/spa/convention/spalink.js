define(['thrust/convention'],
function (Convention)
{
    var parseFullHref = function (href)
    {
        var baseUrl = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

        if (href.indexOf('/') != -1)
        {
            href = href.substring(href.lastIndexOf('/'));
        }
        else
        {
            href = '/' + href;
        }

        return baseUrl + href;
    };
    /**
    @module thrust.dom
    @submodule thrust.dom.convention
    **/

    /**
    * # __thrust/dom__ Convention - Single Page App Link
    *
    * Requires thrust/dom
    *
    * @for thrust.dom.convention
    * @property spa;ink
    **/
    return new Convention({
        orbit: function (thrust)
        {
            var config = thrust.config,
                spa = thrust.spa,
                $ = thrust.dom.$;

            $().on('click', 'a', function (e)
            {
                var link = parseFullHref(this.getAttribute('href'));
                if (link.indexOf(config.url.path) === 0)
                {
                    spa.navigate(link);

                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            });
        }
    });
});