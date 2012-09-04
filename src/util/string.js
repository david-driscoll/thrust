define(function ()
{
    var objectCurlyRegex = /\{\{|\}\}|\{(.*?)\}/g,
        numberCurlyRegex = /\{\{|\}\}|\{(\d+)\}/g,
        slice            = Array.prototype.slice,
        format           = function (str)
        {
            var args = slice.call(arguments, 1);
            if (typeof args[0] === 'object')
            {
                var a = args[0];
                return str.replace(objectCurlyRegex, function (m, n)
                {
                    if (m == '{{') { return '{'; }
                    if (m == '}}') { return '}'; }
                    return a && a[n] || '';
                });
            }
            return str.replace(numberCurlyRegex, function (m, n)
            {
                if (m == '{{') { return '{'; }
                if (m == '}}') { return '}'; }
                return args[n] || '';
            });
        };

    String.prototype.format = function () { return format.apply(null, [this].concat(slice.call(arguments))); };

    return {
        /**
        C# style string format.

        @for thrust.util
        @method format
        **/
        format: format,
        getModuleNameForPath: function (name) { return (name.lastIndexOf('/') > -1 ? name.substring(name.lastIndexOf('/') + 1) : name).replace(/\./g, '-'); }
    };
});