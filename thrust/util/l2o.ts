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
    function noop () {}
    function identity (x) { return x; }
    function defaultComparer (x : any, y : any) : number
	{
		return x > y ? 1 : x < y ? -1 : 0;
	}

    function defaultEqualityComparer (x : any, y : any) : bool
	{
		return x === y;
	}

    function defaultSerializer (x) { return x.toString(); }

    var slice = Array.prototype.slice;
    var seqNoElements = 'Sequence contains no elements.';
    var invalidOperation = 'Invalid operation';

    export interface IEnumerator
    {
    	moveNext() : any;
    	getCurrent(): any;
    	dispose(): void;
    }

    export class Enumerator implements IEnumerator
    {
    	public moveNext : () => any;
    	public getCurrent : () => any;
    	public dispose: () => void;

    	constructor(moveNext : () => any, getCurrent : () => any, dispose: () => void)
    	{
    		this.moveNext = moveNext;
    		this.getCurrent = getCurrent;
    		this.dispose = dispose;
    	}

		public static create(moveNext : () => any, getCurrent : () => any, dispose?: () => void)
		{
			var done = false;
			if (!dispose)
				dispose = noop;

			return new Enumerator(function () {
				if (done) {
					return false;
				}
				var result = moveNext();
				if (!result) {
					done = true;
					dispose();
				}
				return result;
			}, function () { return getCurrent(); }, function () {
				if (!done) {
					dispose();
					done = true;
				}
			});
		}
    }

    function arrayIndexOf(item, comparer? : (v1 : any, v2 : any) => number)
    {
        comparer || (comparer = defaultComparer);
        var idx = this.length;
        while (idx--)
        {
        	if (comparer(this[idx], item))
        	{
        		return idx;
        	}
        }
        return -1;
    }

    function arrayRemove(item, comparer? : (v1 : any, v2 : any) => number)
    {
    	var idx = arrayIndexOf.call(this, item, comparer);
    	if (idx === -1)
    	{
    		return false;
    	}
    	this.splice(idx, 1);
    	return true;
    }

    export class Enumerable
    {
    	public length: number;
    	public getEnumerator: () => Enumerator;
    	constructor(getEnumerator: () => Enumerator)
    	{
    		this.getEnumerator = getEnumerator;
    	}

    	private __aggregate(func: (accumulate: any, currentValue: any) => any, seed: any, resultSelector?: (x: any) => any): any
    	{
    		resultSelector || (resultSelector = identity);
    		var accumulate = seed, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				accumulate = func(accumulate, enumerator.getCurrent());
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return resultSelector ? resultSelector(accumulate) : accumulate;
    	}

    	private __aggregate1(func: (accumulate: any, currentValue: any) => any)
    	{
    		var accumulate, enumerator = this.getEnumerator();
    		try
    		{
    			if (!enumerator.moveNext())
    			{
    				throw new Error(seqNoElements);
    			}
    			accumulate = enumerator.getCurrent();
    			while (enumerator.moveNext())
    			{
    				accumulate = func(accumulate, enumerator.getCurrent());
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return accumulate;
    	}

    	public aggregate(func: (accumulate: any, currentValue: any) => any, seed: number, resultSelector?: (x: any) => any) : any
    	{
			/*jshint unused:false */
    		var f : any = arguments.length === 1 ? this.__aggregate1 : this.__aggregate;
    		return f.apply(this, arguments);
    	}

        public all(predicate: (value: any) => bool): bool
    	{
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				if (!predicate(enumerator.getCurrent()))
    				{
    					return false;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return true;
    	};

        public any(predicate?: (value: any) => bool): bool
    	{
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				if (!predicate || predicate(enumerator.getCurrent()))
    				{
    					return true;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return false;
    	};

		public average(selector?: (value: any, index: number) => any): number;
    	public average(selector?: (value: any) => any): number
    	{
    		if (selector)
    		{
    			return this.select(selector).average();
    		}
    		var enumerator = this.getEnumerator(), count = 0, sum = 0;
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				count++;
    				sum += enumerator.getCurrent();
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		if (count === 0)
    		{
    			throw new Error(seqNoElements);
    		}
    		return sum / count;
    	};

        public concat(...args: any[]) : any[]
    	{
    		var args = slice.call(arguments, 0);
    		args.unshift(this);
    		return Enumerable.concat.apply(null, args);
    	};

        public contains(value, comparer? : (v1 : any, v2 : any) => bool)
    	{
    		comparer || (comparer = defaultEqualityComparer);
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				if (comparer(value, enumerator.getCurrent()))
    				{
    					return true;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return false;
    	};

        public count(predicate?: (value: any) => bool): number
    	{
    		var c = 0, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				if (!predicate || predicate(enumerator.getCurrent()))
    				{
    					c++;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return c;
    	};

        public defaultIfEmpty(defaultValue : any)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, hasValue = false, enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	if (!enumerator.moveNext())
                    	{
                    		return false;
                    	}
                    	hasValue = true;
                    	current = enumerator.getCurrent();
                    	return true;
                    },
                    function ()
                    {
                    	if (!hasValue)
                    	{
                    		return defaultValue;
                    	}
                    	return current;
                    },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

    	public distinct(comparer? : (v1 : any, v2 : any) => bool)
    	{
    		comparer || (comparer = defaultEqualityComparer);
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, map = [], enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	while (true)
                    	{
                    		if (!enumerator.moveNext())
                    		{
                    			return false;
                    		}
                    		current = enumerator.getCurrent();
                    		if (arrayIndexOf.call(map, current, comparer) === -1)
                    		{
                    			map.push(current);
                    			return true;
                    		}
                    	}
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

        public elementAt(index : number) : any
    	{
    		return this.skip(index).first();
    	};

        public elementAtOrDefault(index : number) : any
    	{
    		return this.skip(index).firstOrDefault();
    	};

        public except(second, comparer? : (v1 : any, v2 : any) => bool) : Enumerable
    	{
    		comparer || (comparer = defaultEqualityComparer);
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, map = [], firstEnumerator = parent.getEnumerator(), secondEnumerator;
    			while (firstEnumerator.moveNext())
    			{
    				map.push(firstEnumerator.getCurrent());
    			}
    			return Enumerator.create(
                    function ()
                    {
                    	secondEnumerator || (secondEnumerator = second.getEnumerator());
                    	while (true)
                    	{
                    		if (!secondEnumerator.moveNext())
                    		{
                    			return false;
                    		}
                    		current = secondEnumerator.getCurrent();
                    		if (this.arrayIndexOf.call(map, current, comparer) === -1)
                    		{
                    			map.push(current);
                    			return true;
                    		}
                    	}
                    },
                    function () { return current; },
                    function () { /*enumerator.dispose();*/ }
                );
    		});
    	};

        public first(predicate?: (value: any) => bool): any
    	{
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var current = enumerator.getCurrent();
    				if (!predicate || predicate(current))
    					return current;
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		throw new Error(seqNoElements);
    	};

        public firstOrDefault(predicate?: (value: any) => bool): any
    	{
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var current = enumerator.getCurrent();
    				if (!predicate || predicate(current))
    				{
    					return current;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return null;
    	};

		public forEach(action: (value: any) => void );
        public forEach(action: (value : any, index : number) => void)
    	{
    		var e = this.getEnumerator(),
                i = 0;
    		try
    		{
    			while (e.moveNext())
    			{
    				action(e.getCurrent(), i++);
    			}
    		} finally
    		{
    			e.dispose();
    		}
    	};

        public groupBy(keySelector, elementSelector, resultSelector, keySerializer)
    	{
    		elementSelector || (elementSelector = identity);
    		keySerializer || (keySerializer = defaultSerializer);
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var map = {}, keys = [], index = 0, value, key,
                    parentEnumerator = parent.getEnumerator(),
                    parentCurrent,
                    parentKey,
                    parentSerialized,
                    parentElement;
    			while (parentEnumerator.moveNext())
    			{
    				parentCurrent = parentEnumerator.getCurrent();
    				parentKey = keySelector(parentCurrent);
    				parentSerialized = keySerializer(parentKey);
    				if (!map[parentSerialized])
    				{
    					map[parentSerialized] = [];
    					keys.push(parentSerialized);
    				}
    				parentElement = elementSelector(parentCurrent);
    				map[parentSerialized].push(parentElement);
    			}
    			return Enumerator.create(
                    function ()
                    {
                    	var values;
                    	if (index < keys.length)
                    	{
                    		key = keys[index++];
                    		values = Enumerable.fromArray(map[key]);
                    		if (!resultSelector)
                    		{
                    			values.key = key;
                    			value = values;
                    		} else
                    		{
                    			value = resultSelector(key, values);
                    		}
                    		return true;
                    	}
                    	return false;
                    },
                    function () { return value; }
                );
    		});
    	};

        public intersect(second, comparer? : (v1 : any, v2 : any) => bool)
    	{
    		comparer || (comparer = defaultEqualityComparer);
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, map = [], firstEnumerator = parent.getEnumerator(), secondEnumerator;
    			while (firstEnumerator.moveNext())
    			{
    				map.push(firstEnumerator.getCurrent());
    			}
    			return Enumerator.create(
                    function ()
                    {
                    	secondEnumerator || (secondEnumerator = second.getEnumerator());
                    	while (true)
                    	{
                    		if (!secondEnumerator.moveNext())
                    		{
                    			return false;
                    		}
                    		current = secondEnumerator.getCurrent();
                    		if (arrayRemove.call(map, current, comparer))
                    		{
                    			return true;
                    		}
                    	}
                    },
                    function ()
                    {
                    	return current;
                    },
                    function ()
                    {
                    	/*enumerator.dispose();*/
                    }
                );
    		});
    	};

        public last(predicate?: (value: any) => bool): any
    	{
    		var hasValue = false, value, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var current = enumerator.getCurrent();
    				if (!predicate || predicate(current))
    				{
    					hasValue = true;
    					value = current;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		if (hasValue)
    		{
    			return value;
    		}
    		throw new Error(seqNoElements);
    	};

        public lastOrDefault(predicate?: (value: any) => bool): any
    	{
    		var hasValue = false, value, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var current = enumerator.getCurrent();
    				if (!predicate || predicate(current))
    				{
    					hasValue = true;
    					value = current;
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}

    		return hasValue ? value : null;
    	};

		public max(selector?: (value: any, index: number) => any): any;
		public max(selector?: (value: any) => any): any
    	{
    		if (selector)
    		{
    			return this.select(selector).max();
    		}
    		var m, hasElement = false, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var x = enumerator.getCurrent();
    				if (!hasElement)
    				{
    					m = x;
    					hasElement = true;
    				} else
    				{
    					if (x > m)
    					{
    						m = x;
    					}
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		if (!hasElement)
    		{
    			throw new Error(seqNoElements);
    		}
    		return m;
    	};

		public min(selector?: (value: any, index: number) => any): any;
		public min(selector?: (value: any) => any): any
    	{
    		if (selector)
    		{
    			return this.select(selector).min();
    		}
    		var m, hasElement = false, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var x = enumerator.getCurrent();
    				if (!hasElement)
    				{
    					m = x;
    					hasElement = true;
    				} else
    				{
    					if (x < m)
    					{
    						m = x;
    					}
    				}
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		if (!hasElement)
    		{
    			throw new Error(seqNoElements);
    		}
    		return m;
    	};

        public orderBy(keySelector, comparer? : (v1 : any, v2 : any) => number)
    	{
    		return new OrderedEnumerable(this, keySelector, comparer, false);
    	};

        public orderByDescending(keySelector, comparer? : (v1 : any, v2 : any) => number)
    	{
    		return new OrderedEnumerable(this, keySelector, comparer, true);
    	};

        public reverse()
    	{
    		var arr = [], enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				arr.unshift(enumerator.getCurrent());
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return Enumerable.fromArray(arr);
    	};

		public select(selector: (value: any) => any) : Enumerable;
		public select(selector: (value: any, index: number) => any) : Enumerable
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, index = 0, enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	if (!enumerator.moveNext())
                    	{
                    		return false;
                    	}
                    	current = selector(enumerator.getCurrent(), index++);
                    	return true;
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

			public selectMany(collectionSelector: (x: any) => Enumerable, resultSelector?: (value: any, current: any) => any);
        public selectMany(collectionSelector : (x : any) => Enumerable, resultSelector? : (value : any, current : any) => any)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, index = 0, outerEnumerator, innerEnumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	outerEnumerator || (outerEnumerator = parent.getEnumerator());
                    	while (true)
                    	{
                    		if (!innerEnumerator)
                    		{
                    			if (!outerEnumerator.moveNext())
                    			{
                    				return false;
                    			}

                    			innerEnumerator = collectionSelector(outerEnumerator.getCurrent()).getEnumerator();
                    		}
                    		if (innerEnumerator.moveNext())
                    		{
                    			current = innerEnumerator.getCurrent();

                    			if (resultSelector)
                    			{
                    				var o = outerEnumerator.getCurrent();
                    				current = resultSelector(o, current);
                    			}

                    			return true;
                    		} else
                    		{
                    			innerEnumerator.dispose();
                    			innerEnumerator = null;
                    		}
                    	}
                    },
                    function () { return current; },
                    function ()
                    {
                    	if (innerEnumerator)
                    	{
                    		innerEnumerator.dispose();
                    	}
                    	outerEnumerator.dispose();
                    }
                );
    		});
    	};

        public sequenceEqual(second, comparer? : (v1 : any, v2 : any) => bool)
    	{
    		comparer || (comparer = defaultEqualityComparer);
    		var e1 = this.getEnumerator(), e2 = second.getEnumerator();
    		try
    		{
    			while (e1.moveNext())
    			{
    				if (!e2.moveNext() || !comparer(e1.getCurrent(), e2.getCurrent()))
    				{
    					return false;
    				}
    			}
    			if (e2.moveNext())
    			{
    				return false;
    			}
    			return true;
    		}
            finally
    		{
    			e1.dispose();
    			e2.dispose();
    		}
    	};

		public single(predicate?: (value: any) => bool): any;
        public single(predicate?: (value: any, index : number) => bool): any
    	{
    		if (predicate)
    		{
    			return this.where(predicate).single();
    		}
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var current = enumerator.getCurrent();
    				if (enumerator.moveNext())
    				{
    					throw new Error(invalidOperation);
    				}
    				return current;
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		throw new Error(seqNoElements);
    	};

		public singleOrDefault(predicate?: (value: any) => bool): any;
        public singleOrDefault(predicate?: (value: any, index : number) => bool): any
    	{
    		if (predicate)
    		{
    			return this.where(predicate).singleOrDefault();
    		}
    		var enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				var current = enumerator.getCurrent();
    				if (enumerator.moveNext())
    				{
    					throw new Error(invalidOperation);
    				}
    				return current;
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return null;
    	};

        public skip(count : number)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, skipped = false, enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	if (!skipped)
                    	{
                    		for (var i = 0; i < count; i++)
                    		{
                    			if (!enumerator.moveNext())
                    			{
                    				return false;
                    			}
                    		}
                    		skipped = true;
                    	}
                    	if (!enumerator.moveNext())
                    	{
                    		return false;
                    	}
                    	current = enumerator.getCurrent();
                    	return true;
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

        public skipWhile(selector: (value : any) => bool)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, skipped = false, enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	if (!skipped)
                    	{
                    		while (true)
                    		{
                    			if (!enumerator.moveNext())
                    			{
                    				return false;
                    			}
                    			if (!selector(enumerator.getCurrent()))
                    			{
                    				current = enumerator.getCurrent();
                    				return true;
                    			}
                    		}
                    		skipped = true;
                    	}
                    	if (!enumerator.moveNext())
                    	{
                    		return false;
                    	}
                    	current = enumerator.getCurrent();
                    	return true;
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

		public sum(selector?: (value: any, index: number) => any): number;
		public sum(selector?: (value: any) => any) : number
    	{
    		if (selector)
    		{
    			return this.select(selector).sum();
    		}
    		var s = 0, enumerator = this.getEnumerator();
    		try
    		{
    			while (enumerator.moveNext())
    			{
    				s += enumerator.getCurrent();
    			}
    		} finally
    		{
    			enumerator.dispose();
    		}
    		return s;
    	};

        public take(count)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, enumerator, myCount = count;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	if (myCount === 0)
                    	{
                    		return false;
                    	}
                    	if (!enumerator.moveNext())
                    	{
                    		myCount = 0;
                    		return false;
                    	}
                    	myCount--;
                    	current = enumerator.getCurrent();
                    	return true;
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

        public takeWhile(selector)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, index = 0, enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	if (!enumerator.moveNext())
                    	{
                    		return false;
                    	}
                    	current = enumerator.getCurrent();
                    	if (!selector(current, index++))
                    	{
                    		return false;
                    	}
                    	return true;
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

        public toArray()
    	{
    		var results = [],
                e = this.getEnumerator();
    		try
    		{
    			while (e.moveNext())
    			{
    				results.push(e.getCurrent());
    			}
    			return results;
    		} finally
    		{
    			e.dispose();
    		}
    	};

        public where(selector: (value : any, index : number) => bool)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var current, index = 0, enumerator;
    			return Enumerator.create(
                    function ()
                    {
                    	enumerator || (enumerator = parent.getEnumerator());
                    	while (true)
                    	{
                    		if (!enumerator.moveNext())
                    		{
                    			return false;
                    		}
                    		current = enumerator.getCurrent();
                    		if (selector(current, index++))
                    		{
                    			return true;
                    		}
                    	}
                    },
                    function () { return current; },
                    function () { enumerator.dispose(); }
                );
    		});
    	};

        public union(second, comparer? : (v1 : any, v2 : any) => bool)
    	{
    		comparer || (comparer = defaultEqualityComparer);
    		var parent = this;
    		return Enumerable.create(function ()
    		{
    			var current, enumerator, map = [], firstDone = false, secondDone = false;
    			return Enumerator.create(
                    function ()
                    {
                    	while (true)
                    	{
                    		if (!enumerator)
                    		{
                    			if (secondDone)
                    			{
                    				return false;
                    			}
                    			if (!firstDone)
                    			{
                    				enumerator = parent.getEnumerator();
                    				firstDone = true;
                    			} else
                    			{
                    				enumerator = second.getEnumerator();
                    				secondDone = true;
                    			}
                    		}
                    		if (enumerator.moveNext())
                    		{
                    			current = enumerator.getCurrent();
                    			if (this.arrayIndexOf.call(map, current, comparer) === -1)
                    			{
                    				map.push(current);
                    				return true;
                    			}
                    		} else
                    		{
                    			enumerator.dispose();
                    			enumerator = null;
                    		}
                    	}
                    },
                    function () { return current; },
                    function ()
                    {
                    	if (enumerator)
                    	{
                    		enumerator.dispose();
                    	}
                    }
                );
    		});
    	};

        public zip(right, selector)
    	{
    		var parent = this;
    		return new Enumerable(function ()
    		{
    			var e1, e2, current;
    			return Enumerator.create(
                    function ()
                    {
                    	if (!e1 && !e2)
                    	{
                    		e1 = parent.getEnumerator();
                    		e2 = right.getEnumerator();
                    	}

                    	if (e1.moveNext() && e2.moveNext())
                    	{
                    		current = selector(e1.getCurrent(), e2.getCurrent());
                    		return true;
                    	}
                    	return false;
                    },
                    function ()
                    {
                    	return current;
                    },
                    function ()
                    {
                    	e1.dispose();
                    	e2.dispose();
                    }
                );
    		});
    	};

		public static concat(...args : any[])
		{
			return Enumerable.fromArray(args).selectMany(identity);
    	}

    	public static create(getEnumerator)
    	{
    		return new Enumerable(getEnumerator);
    	}

    	public static empty()
    	{
    		return new Enumerable(function ()
    		{
    			return Enumerator.create(
					function () { return false; },
					function () { throw new Error(seqNoElements); }
				);
    		});
    	}
		public static fromArray(array)
		{
			return new Enumerable(function () {
				var index = 0, value;
				return Enumerator.create(
					function () {
						if (index < array.length) {
							value = array[index++];
							return true;
						}
						return false;
					},
					function () {
						return value;
					}
				);
			});
		}

		public static returnValue(value) {
			return new Enumerable(function () {
				var done = false;
				return Enumerator.create(
					function () {
						if (done) {
							return false;
						}
						done = true;
						return true;
					},
					function () {
						return value;
					}
				);
			});
		}

		public static range(start, count) {
			return new Enumerable(function () {
				var current = start - 1, end = start + count - 1;
				return Enumerator.create(
					function () {
						if (current < end) {
							current++;
							return true;
						} else {
							return false;
						}
					},
					function () { return current; }
				);
			});
		}

		public static repeat(value, count) {
			return new Enumerable(function () {
				var myCount = count;
				if (myCount === undefined) {
					myCount = -1;
				}
				return Enumerator.create(
					function () {
						if (myCount !== 0) {
							myCount--;
							return true;
						} else {
							return false;
						}
					},
					function () { return value; }
				);
			});
		} 
    }

    function swap (arr, idx1, idx2) {
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    function quickSort(array, start, end) {
        if (start === undefined && end === undefined) {
            start = 0;
            end = array.length - 1;
        }
        var i = start, k = end;
        if (end - start >= 1) {
            var pivot = array[start];
            while (k > i) {
                while (this.compareKeys(array[i], pivot) <= 0 && i <= end && k > i) {
                    i++;
                }
                while (this.compareKeys(array[k], pivot) > 0 && k >= start && k >= i) {
                    k--;
                }
                if (k > i) {
                    swap(array, i, k);
                }
            }
            swap(array, start, k);
            quickSort.call(this, array, start, k - 1);
            quickSort.call(this, array, k + 1, end);
        }
    }  

    export class EnumerableSorter
    {
    	public keySelector: (x: any) => any;
    	public comparer: (v1: any, v2: any) => number;
    	public descending: bool;
    	public next : EnumerableSorter;
    	public keys: any[];
		constructor(keySelector, comparer : (v1 : any, v2 : any) => number, descending : bool, next : EnumerableSorter)
		{
			this.keySelector = keySelector;
			this.comparer = comparer;
			this.descending = descending;
			this.next = next;
		}

        public computeKeys(elements, count) {
            this.keys = new Array(count);
            for (var i = 0; i < count; i++) {
                this.keys[i] = this.keySelector(elements[i]);
            }
            if (this.next) {
                this.next.computeKeys(elements, count);
            }
        };

        public compareKeys(idx1, idx2) {
            var n = this.comparer(this.keys[idx1], this.keys[idx2]);
            if (n === 0) { 
                return !this.next ? idx1 - idx2 : this.next.compareKeys(idx1, idx2);
            }
            return this.descending ? -n : n;
        };

        public sort(elements, count) {
            this.computeKeys(elements, count);
            var map = new Array(count);
            for (var i = 0; i < count; i++) {
                map[i] = i;
            }
            quickSort.call(this, map, 0, count - 1);
            return map;
        }
    }

    export class OrderedEnumerable extends Enumerable
    {
    	public source : Enumerable;
    	public keySelector: (x: any) => any;
    	public comparer: (v1: any, v2: any) => number;
    	public descending: bool;
    	public parent: OrderedEnumerable;

    	constructor(source : Enumerable, keySelector?: (x: any) => any, comparer?: (v1: any, v2: any) => number, descending?: bool)
    	{
    		super(() => source.getEnumerator());
    		this.getEnumerator = this.__getEnumerator;

    		this.source = source;
    		this.keySelector = keySelector || identity;
    		this.comparer = comparer || defaultComparer;
    		this.descending = descending;
    	}

    	public getEnumerableSorter(next? : EnumerableSorter)
    	{
    		var next1 = new EnumerableSorter(this.keySelector, this.comparer, this.descending, next);
    		if (this.parent)
    		{
    			next1 = this.parent.getEnumerableSorter(next1);
    		}
    		return next1;
    	}

        public createOrderedEnumerable(keySelector, comparer, descending)
    	{
    		var e = new OrderedEnumerable(this.source, keySelector, comparer, descending);
    		e.parent = this;
    		return e;
    	}

        public __getEnumerator() : Enumerator
    	{
    		var buffer = this.source.toArray(),
                length = buffer.length,
                sorter = this.getEnumerableSorter(),
                map = sorter.sort(buffer, length),
                index = 0,
                current;

    		return Enumerator.create(function ()
    		{
    			if (index < length)
    			{
    				current = buffer[map[index++]];
    				return true;
    			}
    			return false;
    		}, function ()
    		{
    			return current;
    		});
    	};

        public thenBy(keySelector, comparer)
    	{
    		return new OrderedEnumerable(this, keySelector, comparer, false);
    	};

        public thenByDescending(keySelector, comparer)
    	{
    		return new OrderedEnumerable(this, keySelector, comparer, true);
    	};
    }