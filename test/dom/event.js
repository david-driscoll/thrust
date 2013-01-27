/// <reference path="../../src/thrust/interfaces/dom/dom.d.ts" />
/// <reference path="../../src/jasmine.async.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../lib/DefinitelyTyped/requirejs/require.d.ts" />
/*global jasmine:true, AsyncSpec:true, describe:true, it:true, expect:true, beforeEach:true, afterEach:true, spyOn:true, runs:true, waits:true, waitsFor:true */
(function () {
    var tQuery = /* : TQueryStatic*/ require('thrust/dom/subjquery').tQuery;
    describe('Thrust.Dom', function () {
        describe("tQuery - .on and .off", function () {
            var counter, mixfn;
            var $onandoff = tQuery("<div id=\"onandoff\"><p>on<b>and</b>off</p><div>worked<em>or</em>borked?</div></div>").appendTo("body");
            it('whippted it good', function () {
                var eventRun = false;
                // Simple case
                tQuery("#onandoff").on("whip", function () {
                    eventRun = true;
                }).trigger("whip").off();
                expect(eventRun).toBe(true);
            });
            it('Direct events only - direct event bindings with data', function () {
                // Direct events only
                counter = 0;
                tQuery("#onandoff b").on("click", 5, function (e, trig) {
                    counter += e.data + (trig || 9)// twice, 5+9+5+17=36
                    ;
                }).one("click", 7, function (e, trig) {
                    counter += e.data + (trig || 11)// once, 7+11=18
                    ;
                }).trigger('click').trigger("click", 17).off("click");
                expect(counter).toBe(54);
            });
            it('Delegated events only - delegated event bindings with data', function () {
                // Delegated events only
                counter = 0;
                tQuery("#onandoff").on("click", "em", 5, function (e, trig) {
                    counter += e.data + (trig || 9)// twice, 5+9+5+17=36
                    ;
                }).one("click", "em", 7, function (e, trig) {
                    counter += e.data + (trig || 11)// once, 7+11=18
                    ;
                }).find("em").trigger('click').trigger("click", 17).end().off("click", "em");
                expect(counter).toBe(54);
            });
            it('Mixed event bindings and types', function () {
                // Mixed event bindings and types
                counter = 0;
                mixfn = function (e, trig) {
                    counter += (e.data || 0) + (trig || 1);
                };
                tQuery("#onandoff").on(" click  clack cluck ", "em", 2, mixfn).on("cluck", "b", 7, mixfn).on("cluck", mixfn).trigger("what!").each(function () {
                    expect(counter).toBe(0);
                }).find("em").one("cluck", 3, mixfn).trigger("cluck", 8).off().trigger(// 3+8 2+8 + 0+8 = 29
                "cluck", 9).end().each(// 2+9 + 0+9 = 20
                function () {
                    expect(counter).toBe(49);
                }).off("cluck", function () {
                }).trigger(// shouldn't remove anything
                "cluck", 2).each(// 0+2 = 2
                function () {
                    expect(counter).toBe(51);
                }).find("b").on("click", 95, mixfn).on("clack", "p", 97, mixfn).one("cluck", 3, mixfn).trigger("quack", 19).off(// 0
                "click clack cluck").end().each(function () {
                    expect(counter).toBe(51);
                }).trigger("cluck", 3).off(// 0+3 = 3
                "clack", "em", mixfn).find("em").trigger("clack").end().each(// 0
                function () {
                    expect(counter).toBe(54);
                }).off("click cluck");
                $onandoff.remove();
            });
            xit("special bind/delegate name mapping", function () {
                var spy1 = jasmine.createSpy('spy1');
                tQuery.event.special["slap"] = {
                    bindType: "click",
                    delegateType: "swing",
                    handle: spy1
                };
                var comeback = jasmine.createSpy('comeback');
                tQuery("<div><button id=\"mammy\">Are We Not Men?</button></div>").on("slap", "button", tQuery.noop).on("swing", "button", comeback).find("button").on("slap", tQuery.noop).on("click", comeback).trigger("click").off(// bindType-slap and click
                "slap").trigger("click").off(// click
                "click").trigger("swing").end().off(// delegateType-slap and swing
                "slap swing", "button").find("button").trigger(// everything should be gone
                "slap").trigger("click").trigger("swing").end().remove();
                delete tQuery.event.special["slap"];
                expect(spy1).toHaveBeenCalled();
                expect(spy1.callCount).toBe(3);
                expect(comeback).toHaveBeenCalled();
                expect(comeback.callCount).toBe(3);
                var spy2 = jasmine.createSpy('spy2');
                tQuery.event.special["gutfeeling"] = {
                    bindType: "click",
                    delegateType: "click",
                    handle: function (event) {
                        spy2.apply(this, arguments);
                        // Need to call the handler since .one() uses it to unbind
                        return event.handleObj.handler.call(this, event);
                    }
                };
                // Ensure a special event isn't removed by its mapped type
                tQuery("<p>Gut Feeling</p>").on("click", tQuery.noop).on("gutfeeling", tQuery.noop).off("click").trigger("gutfeeling").remove();
                // Ensure special events are removed when only a namespace is provided
                tQuery("<p>Gut Feeling</p>").on("gutfeeling.Devo", tQuery.noop).off(".Devo").trigger("gutfeeling").remove();
                // Ensure .one() events are removed after their maiden voyage
                tQuery("<p>Gut Feeling</p>").one("gutfeeling", tQuery.noop).trigger("gutfeeling").trigger(// This one should
                "gutfeeling").remove();
                // This one should not
                expect(spy2).toHaveBeenCalled();
                expect(spy2.callCount).toBe(2);
                delete tQuery.event.special["gutfeeling"];
            });
            it(".on and .off, selective mixed removal (#10705)", function () {
                var clockout = 0, timingx = jasmine.createSpy('timingx');
                tQuery("<p>Strange Pursuit</p>").on("click", timingx).on("click.duty", timingx).on("click.now", timingx).on("devo", timingx).on("future", timingx).trigger("click").trigger(// 3
                "devo").off(// 1
                ".duty devo ").trigger(// trailing space
                "future").trigger(// 1
                "click").off(// 2
                "future click").trigger("click")// 0
                ;
                expect(timingx.callCount).toBe(7);
            });
            it(".on( event-map, null-selector, data ) #11130", function () {
                var $p = tQuery("<p>Strange Pursuit</p>"), data = "bar", map = {
                    "foo": jasmine.createSpy('map.foo')
                };
                $p.on(map, null, data).trigger("foo");
                expect(map['foo']).toHaveBeenCalled();
                expect(map['foo'].callCount).toBe(1);
                $p.remove();
            });
        });
    });
})();
//@ sourceMappingURL=event.js.map
