/// <reference path="../../src/thrust/interfaces/dom/dom.d.ts" />
/// <reference path="../helpers/thrust.ts" />
/// <reference path="../../src/jasmine.async.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />

/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(() =>
{
    var tQuery : TQueryStatic = require('thrust/dom/subjquery').tQuery;

    describe('tQuery', function ()
    {
        var namespace = 'namespace',
            childNamespace = 'childNamespace';

        var $divs : TQuery, parentContext : TQuery;
        beforeEach(() =>
        {
            $divs = tQuery('<div><div></div><div></div></div><div></div><div></div><div></div><div><div></div><div></div></div>').appendTo(document.body);
            parentContext = tQuery(document.body, null, namespace);
        });

        afterEach(() =>
        {
            $divs.remove();
        });

        it('propogates namespaces', () =>
        {
            expect(parentContext.namespace).toBe(namespace);

            var childOfParentContext = parentContext.find('div');
            expect(childOfParentContext.namespace).toBe(namespace);

            var customContext = tQuery('div', document.body, namespace);
            expect(childOfParentContext.namespace).toBe(namespace);

            var childOfCustomContext = customContext.children();
            expect(childOfCustomContext.namespace).toBe(namespace);
        });

        it('changes namespaces', () =>
        {
            expect(parentContext.namespace).toBe(namespace);

            var childOfParentContext = parentContext.find('div');
            expect(childOfParentContext.namespace).toBe(namespace);

            var customContext = tQuery(childOfParentContext, undefined, childNamespace);
            expect(customContext.namespace).toBe(childNamespace);

            var childOfCustomContext = customContext.children();
            expect(childOfCustomContext.namespace).toBe(childNamespace);
        });
    })
})();