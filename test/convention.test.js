/// <reference path="../thrust/convention.ts" />
/// <reference path="../lib/DefinitelyTyped/jasmine/jasmine-1.2.d.ts" />
describe('Convention', function () {
    it('creates', function () {
        var c = new convention.Convention();
        expect(c).toBeDefined();
    });
    it('overloads methods', function () {
        var c = new convention.Convention({
            start: function () {
            },
            deorbit: function () {
            }
        });
        expect(c).toBeDefined();
        expect(c.start).not.toBe(convention.Convention.prototype.start);
        expect(c.deorbit).not.toBe(convention.Convention.prototype.deorbit);
    });
});
//@ sourceMappingURL=convention.test.js.map
