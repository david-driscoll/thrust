var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    /*
    
    Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
    Microsoft Open Technologies would like to thank its contributors, a list
    of whom are at http://aspnetwebstack.codeplex.com/wikipage?title=Contributors.
    
    Licensed under the Apache License, Version 2.0 (the "License"); you
    may not use this file except in compliance with the License. You may
    obtain a copy of the License at
    
    http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
    implied. See the License for the specific language governing permissions
    and limitations under the License.
    */
    function noop() {
    }
    function identity(x) {
        return x;
    }
    function defaultComparer(x, y) {
        return x > y ? 1 : x < y ? -1 : 0;
    }
    function defaultEqualityComparer(x, y) {
        return x === y;
    }
    function defaultSerializer(x) {
        return x.toString();
    }
    var slice = Array.prototype.slice;
    var seqNoElements = 'Sequence contains no elements.';
    var invalidOperation = 'Invalid operation';
    var Enumerator = (function () {
        function Enumerator(moveNext, getCurrent, dispose) {
            this.moveNext = moveNext;
            this.getCurrent = getCurrent;
            this.dispose = dispose;
        }
        Enumerator.create = function create(moveNext, getCurrent, dispose) {
            var done = false;
            if(!dispose) {
                dispose = noop;
            }
            return new Enumerator(function () {
                if(done) {
                    return false;
                }
                var result = moveNext();
                if(!result) {
                    done = true;
                    dispose();
                }
                return result;
            }, function () {
                return getCurrent();
            }, function () {
                if(!done) {
                    dispose();
                    done = true;
                }
            });
        }
        return Enumerator;
    })();
    exports.Enumerator = Enumerator;    
    function arrayIndexOf(item, comparer) {
        comparer || (comparer = defaultComparer);
        var idx = this.length;
        while(idx--) {
            if(comparer(this[idx], item)) {
                return idx;
            }
        }
        return -1;
    }
    function arrayRemove(item, comparer) {
        var idx = arrayIndexOf.call(this, item, comparer);
        if(idx === -1) {
            return false;
        }
        this.splice(idx, 1);
        return true;
    }
    var Enumerable = (function () {
        function Enumerable(getEnumerator) {
            this.getEnumerator = getEnumerator;
        }
        Enumerable.prototype.__aggregate = function (func, seed, resultSelector) {
            resultSelector || (resultSelector = identity);
            var accumulate = seed, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    accumulate = func(accumulate, enumerator.getCurrent());
                }
            }finally {
                enumerator.dispose();
            }
            return resultSelector ? resultSelector(accumulate) : accumulate;
        };
        Enumerable.prototype.__aggregate1 = function (func) {
            var accumulate, enumerator = this.getEnumerator();
            try  {
                if(!enumerator.moveNext()) {
                    throw new Error(seqNoElements);
                }
                accumulate = enumerator.getCurrent();
                while(enumerator.moveNext()) {
                    accumulate = func(accumulate, enumerator.getCurrent());
                }
            }finally {
                enumerator.dispose();
            }
            return accumulate;
        };
        Enumerable.prototype.aggregate = function (func, seed, resultSelector) {
            /*jshint unused:false */
            var f = arguments.length === 1 ? this.__aggregate1 : this.__aggregate;
            return f.apply(this, arguments);
        };
        Enumerable.prototype.all = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(!predicate(enumerator.getCurrent())) {
                        return false;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return true;
        };
        Enumerable.prototype.any = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(!predicate || predicate(enumerator.getCurrent())) {
                        return true;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return false;
        };
        Enumerable.prototype.average = function (selector) {
            if(selector) {
                return this.select(selector).average();
            }
            var enumerator = this.getEnumerator(), count = 0, sum = 0;
            try  {
                while(enumerator.moveNext()) {
                    count++;
                    sum += enumerator.getCurrent();
                }
            }finally {
                enumerator.dispose();
            }
            if(count === 0) {
                throw new Error(seqNoElements);
            }
            return sum / count;
        };
        Enumerable.prototype.concat = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var args = slice.call(arguments, 0);
            args.unshift(this);
            return Enumerable.concat.apply(null, args);
        };
        Enumerable.prototype.contains = function (value, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(comparer(value, enumerator.getCurrent())) {
                        return true;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return false;
        };
        Enumerable.prototype.count = function (predicate) {
            var c = 0, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    if(!predicate || predicate(enumerator.getCurrent())) {
                        c++;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return c;
        };
        Enumerable.prototype.defaultIfEmpty = function (defaultValue) {
            var parent = this;
            return new Enumerable(function () {
                var current, hasValue = false, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    hasValue = true;
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    if(!hasValue) {
                        return defaultValue;
                    }
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.distinct = function (comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    while(true) {
                        if(!enumerator.moveNext()) {
                            return false;
                        }
                        current = enumerator.getCurrent();
                        if(arrayIndexOf.call(map, current, comparer) === -1) {
                            map.push(current);
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.elementAt = function (index) {
            return this.skip(index).first();
        };
        Enumerable.prototype.elementAtOrDefault = function (index) {
            return this.skip(index).firstOrDefault();
        };
        Enumerable.prototype.except = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], firstEnumerator = parent.getEnumerator(), secondEnumerator;
                while(firstEnumerator.moveNext()) {
                    map.push(firstEnumerator.getCurrent());
                }
                return Enumerator.create(function () {
                    secondEnumerator || (secondEnumerator = second.getEnumerator());
                    while(true) {
                        if(!secondEnumerator.moveNext()) {
                            return false;
                        }
                        current = secondEnumerator.getCurrent();
                        if(this.arrayIndexOf.call(map, current, comparer) === -1) {
                            map.push(current);
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    /*enumerator.dispose();*/                 });
            });
        };
        Enumerable.prototype.first = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        return current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            throw new Error(seqNoElements);
        };
        Enumerable.prototype.firstOrDefault = function (predicate) {
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        return current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return null;
        };
        Enumerable.prototype.forEach = function (action) {
            var e = this.getEnumerator(), i = 0;
            try  {
                while(e.moveNext()) {
                    action(e.getCurrent(), i++);
                }
            }finally {
                e.dispose();
            }
        };
        Enumerable.prototype.groupBy = function (keySelector, elementSelector, resultSelector, keySerializer) {
            elementSelector || (elementSelector = identity);
            keySerializer || (keySerializer = defaultSerializer);
            var parent = this;
            return new Enumerable(function () {
                var map = {
                }, keys = [], index = 0, value, key, parentEnumerator = parent.getEnumerator(), parentCurrent, parentKey, parentSerialized, parentElement;
                while(parentEnumerator.moveNext()) {
                    parentCurrent = parentEnumerator.getCurrent();
                    parentKey = keySelector(parentCurrent);
                    parentSerialized = keySerializer(parentKey);
                    if(!map[parentSerialized]) {
                        map[parentSerialized] = [];
                        keys.push(parentSerialized);
                    }
                    parentElement = elementSelector(parentCurrent);
                    map[parentSerialized].push(parentElement);
                }
                return Enumerator.create(function () {
                    var values;
                    if(index < keys.length) {
                        key = keys[index++];
                        values = Enumerable.fromArray(map[key]);
                        if(!resultSelector) {
                            values.key = key;
                            value = values;
                        } else {
                            value = resultSelector(key, values);
                        }
                        return true;
                    }
                    return false;
                }, function () {
                    return value;
                });
            });
        };
        Enumerable.prototype.intersect = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], firstEnumerator = parent.getEnumerator(), secondEnumerator;
                while(firstEnumerator.moveNext()) {
                    map.push(firstEnumerator.getCurrent());
                }
                return Enumerator.create(function () {
                    secondEnumerator || (secondEnumerator = second.getEnumerator());
                    while(true) {
                        if(!secondEnumerator.moveNext()) {
                            return false;
                        }
                        current = secondEnumerator.getCurrent();
                        if(arrayRemove.call(map, current, comparer)) {
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    /*enumerator.dispose();*/
                                    });
            });
        };
        Enumerable.prototype.last = function (predicate) {
            var hasValue = false, value, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        hasValue = true;
                        value = current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            if(hasValue) {
                return value;
            }
            throw new Error(seqNoElements);
        };
        Enumerable.prototype.lastOrDefault = function (predicate) {
            var hasValue = false, value, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(!predicate || predicate(current)) {
                        hasValue = true;
                        value = current;
                    }
                }
            }finally {
                enumerator.dispose();
            }
            return hasValue ? value : null;
        };
        Enumerable.prototype.max = function (selector) {
            if(selector) {
                return this.select(selector).max();
            }
            var m, hasElement = false, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var x = enumerator.getCurrent();
                    if(!hasElement) {
                        m = x;
                        hasElement = true;
                    } else {
                        if(x > m) {
                            m = x;
                        }
                    }
                }
            }finally {
                enumerator.dispose();
            }
            if(!hasElement) {
                throw new Error(seqNoElements);
            }
            return m;
        };
        Enumerable.prototype.min = function (selector) {
            if(selector) {
                return this.select(selector).min();
            }
            var m, hasElement = false, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var x = enumerator.getCurrent();
                    if(!hasElement) {
                        m = x;
                        hasElement = true;
                    } else {
                        if(x < m) {
                            m = x;
                        }
                    }
                }
            }finally {
                enumerator.dispose();
            }
            if(!hasElement) {
                throw new Error(seqNoElements);
            }
            return m;
        };
        Enumerable.prototype.orderBy = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, false);
        };
        Enumerable.prototype.orderByDescending = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, true);
        };
        Enumerable.prototype.reverse = function () {
            var arr = [], enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    arr.unshift(enumerator.getCurrent());
                }
            }finally {
                enumerator.dispose();
            }
            return Enumerable.fromArray(arr);
        };
        Enumerable.prototype.select = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = selector(enumerator.getCurrent(), index++);
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, outerEnumerator, innerEnumerator;
                return Enumerator.create(function () {
                    outerEnumerator || (outerEnumerator = parent.getEnumerator());
                    while(true) {
                        if(!innerEnumerator) {
                            if(!outerEnumerator.moveNext()) {
                                return false;
                            }
                            innerEnumerator = collectionSelector(outerEnumerator.getCurrent()).getEnumerator();
                        }
                        if(innerEnumerator.moveNext()) {
                            current = innerEnumerator.getCurrent();
                            if(resultSelector) {
                                var o = outerEnumerator.getCurrent();
                                current = resultSelector(o, current);
                            }
                            return true;
                        } else {
                            innerEnumerator.dispose();
                            innerEnumerator = null;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    if(innerEnumerator) {
                        innerEnumerator.dispose();
                    }
                    outerEnumerator.dispose();
                });
            });
        };
        Enumerable.prototype.sequenceEqual = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var e1 = this.getEnumerator(), e2 = second.getEnumerator();
            try  {
                while(e1.moveNext()) {
                    if(!e2.moveNext() || !comparer(e1.getCurrent(), e2.getCurrent())) {
                        return false;
                    }
                }
                if(e2.moveNext()) {
                    return false;
                }
                return true;
            }finally {
                e1.dispose();
                e2.dispose();
            }
        };
        Enumerable.prototype.single = function (predicate) {
            if(predicate) {
                return this.where(predicate).single();
            }
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(enumerator.moveNext()) {
                        throw new Error(invalidOperation);
                    }
                    return current;
                }
            }finally {
                enumerator.dispose();
            }
            throw new Error(seqNoElements);
        };
        Enumerable.prototype.singleOrDefault = function (predicate) {
            if(predicate) {
                return this.where(predicate).singleOrDefault();
            }
            var enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    var current = enumerator.getCurrent();
                    if(enumerator.moveNext()) {
                        throw new Error(invalidOperation);
                    }
                    return current;
                }
            }finally {
                enumerator.dispose();
            }
            return null;
        };
        Enumerable.prototype.skip = function (count) {
            var parent = this;
            return new Enumerable(function () {
                var current, skipped = false, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!skipped) {
                        for(var i = 0; i < count; i++) {
                            if(!enumerator.moveNext()) {
                                return false;
                            }
                        }
                        skipped = true;
                    }
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.skipWhile = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, skipped = false, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!skipped) {
                        while(true) {
                            if(!enumerator.moveNext()) {
                                return false;
                            }
                            if(!selector(enumerator.getCurrent())) {
                                current = enumerator.getCurrent();
                                return true;
                            }
                        }
                        skipped = true;
                    }
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.sum = function (selector) {
            if(selector) {
                return this.select(selector).sum();
            }
            var s = 0, enumerator = this.getEnumerator();
            try  {
                while(enumerator.moveNext()) {
                    s += enumerator.getCurrent();
                }
            }finally {
                enumerator.dispose();
            }
            return s;
        };
        Enumerable.prototype.take = function (count) {
            var parent = this;
            return new Enumerable(function () {
                var current, enumerator, myCount = count;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(myCount === 0) {
                        return false;
                    }
                    if(!enumerator.moveNext()) {
                        myCount = 0;
                        return false;
                    }
                    myCount--;
                    current = enumerator.getCurrent();
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.takeWhile = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    if(!enumerator.moveNext()) {
                        return false;
                    }
                    current = enumerator.getCurrent();
                    if(!selector(current, index++)) {
                        return false;
                    }
                    return true;
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.toArray = function () {
            var results = [], e = this.getEnumerator();
            try  {
                while(e.moveNext()) {
                    results.push(e.getCurrent());
                }
                return results;
            }finally {
                e.dispose();
            }
        };
        Enumerable.prototype.where = function (selector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, enumerator;
                return Enumerator.create(function () {
                    enumerator || (enumerator = parent.getEnumerator());
                    while(true) {
                        if(!enumerator.moveNext()) {
                            return false;
                        }
                        current = enumerator.getCurrent();
                        if(selector(current, index++)) {
                            return true;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    enumerator.dispose();
                });
            });
        };
        Enumerable.prototype.union = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return Enumerable.create(function () {
                var current, enumerator, map = [], firstDone = false, secondDone = false;
                return Enumerator.create(function () {
                    while(true) {
                        if(!enumerator) {
                            if(secondDone) {
                                return false;
                            }
                            if(!firstDone) {
                                enumerator = parent.getEnumerator();
                                firstDone = true;
                            } else {
                                enumerator = second.getEnumerator();
                                secondDone = true;
                            }
                        }
                        if(enumerator.moveNext()) {
                            current = enumerator.getCurrent();
                            if(this.arrayIndexOf.call(map, current, comparer) === -1) {
                                map.push(current);
                                return true;
                            }
                        } else {
                            enumerator.dispose();
                            enumerator = null;
                        }
                    }
                }, function () {
                    return current;
                }, function () {
                    if(enumerator) {
                        enumerator.dispose();
                    }
                });
            });
        };
        Enumerable.prototype.zip = function (right, selector) {
            var parent = this;
            return new Enumerable(function () {
                var e1, e2, current;
                return Enumerator.create(function () {
                    if(!e1 && !e2) {
                        e1 = parent.getEnumerator();
                        e2 = right.getEnumerator();
                    }
                    if(e1.moveNext() && e2.moveNext()) {
                        current = selector(e1.getCurrent(), e2.getCurrent());
                        return true;
                    }
                    return false;
                }, function () {
                    return current;
                }, function () {
                    e1.dispose();
                    e2.dispose();
                });
            });
        };
        Enumerable.concat = function concat() {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Enumerable.fromArray(args).selectMany(identity);
        }
        Enumerable.create = function create(getEnumerator) {
            return new Enumerable(getEnumerator);
        }
        Enumerable.empty = function empty() {
            return new Enumerable(function () {
                return Enumerator.create(function () {
                    return false;
                }, function () {
                    throw new Error(seqNoElements);
                });
            });
        }
        Enumerable.fromArray = function fromArray(array) {
            return new Enumerable(function () {
                var index = 0, value;
                return Enumerator.create(function () {
                    if(index < array.length) {
                        value = array[index++];
                        return true;
                    }
                    return false;
                }, function () {
                    return value;
                });
            });
        }
        Enumerable.returnValue = function returnValue(value) {
            return new Enumerable(function () {
                var done = false;
                return Enumerator.create(function () {
                    if(done) {
                        return false;
                    }
                    done = true;
                    return true;
                }, function () {
                    return value;
                });
            });
        }
        Enumerable.range = function range(start, count) {
            return new Enumerable(function () {
                var current = start - 1, end = start + count - 1;
                return Enumerator.create(function () {
                    if(current < end) {
                        current++;
                        return true;
                    } else {
                        return false;
                    }
                }, function () {
                    return current;
                });
            });
        }
        Enumerable.repeat = function repeat(value, count) {
            return new Enumerable(function () {
                var myCount = count;
                if(myCount === undefined) {
                    myCount = -1;
                }
                return Enumerator.create(function () {
                    if(myCount !== 0) {
                        myCount--;
                        return true;
                    } else {
                        return false;
                    }
                }, function () {
                    return value;
                });
            });
        }
        return Enumerable;
    })();
    exports.Enumerable = Enumerable;    
    function swap(arr, idx1, idx2) {
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
    function quickSort(array, start, end) {
        if(start === undefined && end === undefined) {
            start = 0;
            end = array.length - 1;
        }
        var i = start, k = end;
        if(end - start >= 1) {
            var pivot = array[start];
            while(k > i) {
                while(this.compareKeys(array[i], pivot) <= 0 && i <= end && k > i) {
                    i++;
                }
                while(this.compareKeys(array[k], pivot) > 0 && k >= start && k >= i) {
                    k--;
                }
                if(k > i) {
                    swap(array, i, k);
                }
            }
            swap(array, start, k);
            quickSort.call(this, array, start, k - 1);
            quickSort.call(this, array, k + 1, end);
        }
    }
    var EnumerableSorter = (function () {
        function EnumerableSorter(keySelector, comparer, descending, next) {
            this.keySelector = keySelector;
            this.comparer = comparer;
            this.descending = descending;
            this.next = next;
        }
        EnumerableSorter.prototype.computeKeys = function (elements, count) {
            this.keys = new Array(count);
            for(var i = 0; i < count; i++) {
                this.keys[i] = this.keySelector(elements[i]);
            }
            if(this.next) {
                this.next.computeKeys(elements, count);
            }
        };
        EnumerableSorter.prototype.compareKeys = function (idx1, idx2) {
            var n = this.comparer(this.keys[idx1], this.keys[idx2]);
            if(n === 0) {
                return !this.next ? idx1 - idx2 : this.next.compareKeys(idx1, idx2);
            }
            return this.descending ? -n : n;
        };
        EnumerableSorter.prototype.sort = function (elements, count) {
            this.computeKeys(elements, count);
            var map = new Array(count);
            for(var i = 0; i < count; i++) {
                map[i] = i;
            }
            quickSort.call(this, map, 0, count - 1);
            return map;
        };
        return EnumerableSorter;
    })();
    exports.EnumerableSorter = EnumerableSorter;    
    var OrderedEnumerable = (function (_super) {
        __extends(OrderedEnumerable, _super);
        function OrderedEnumerable(source, keySelector, comparer, descending) {
                _super.call(this, function () {
        return source.getEnumerator();
    });
            this.getEnumerator = this.__getEnumerator;
            this.source = source;
            this.keySelector = keySelector || identity;
            this.comparer = comparer || defaultComparer;
            this.descending = descending;
        }
        OrderedEnumerable.prototype.getEnumerableSorter = function (next) {
            var next1 = new EnumerableSorter(this.keySelector, this.comparer, this.descending, next);
            if(this.parent) {
                next1 = this.parent.getEnumerableSorter(next1);
            }
            return next1;
        };
        OrderedEnumerable.prototype.createOrderedEnumerable = function (keySelector, comparer, descending) {
            var e = new OrderedEnumerable(this.source, keySelector, comparer, descending);
            e.parent = this;
            return e;
        };
        OrderedEnumerable.prototype.__getEnumerator = function () {
            var buffer = this.source.toArray(), length = buffer.length, sorter = this.getEnumerableSorter(), map = sorter.sort(buffer, length), index = 0, current;
            return Enumerator.create(function () {
                if(index < length) {
                    current = buffer[map[index++]];
                    return true;
                }
                return false;
            }, function () {
                return current;
            });
        };
        OrderedEnumerable.prototype.thenBy = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, false);
        };
        OrderedEnumerable.prototype.thenByDescending = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, true);
        };
        return OrderedEnumerable;
    })(Enumerable);
    exports.OrderedEnumerable = OrderedEnumerable;    
})
//@ sourceMappingURL=l2o.js.map
