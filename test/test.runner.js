(function ()
{
    var pathName = window.location.pathname
    var testScriptTag = document.createElement('script');
    testScriptTag.type = 'text/javascript';
    testScriptTag.src = '../test/' + pathName.substring(pathName.lastIndexOf('/') + 1).replace('.html', '') + '.js';
    document.head.appendChild(testScriptTag);

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec)
    {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function ()
    {
        if (currentWindowOnload)
        {
            currentWindowOnload();
        }

        if (!window.require)
            jasmineEnv.execute();
    };

})();