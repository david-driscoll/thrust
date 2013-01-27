//     underscore-1.4.2.d.ts
//     (c) 2012 Josh Baldwin
//     underscore.d.ts may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/jbaldwin/underscore.d.ts

//interface Lodash {
declare module 'lodash' {

	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	export function each(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	export function each(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function each(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	export function each(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	export function each(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function each(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	export function each(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	export function each(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	export function each(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	export function each(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	export function each(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	export function each(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	export function each(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	export function each(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	export function each(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	export function forEach(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	export function forEach(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function forEach(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	export function forEach(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	export function forEach(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function forEach(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	export function forEach(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	export function forEach(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	export function forEach(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	export function forEach(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	export function forEach(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	export function forEach(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	export function forEach(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	export function forEach(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	export function forEach(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;
		
	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	export function forIn(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	export function forIn(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function forIn(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	export function forIn(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	export function forIn(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function forIn(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	export function forIn(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	export function forIn(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	export function forIn(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	export function forIn(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	export function forIn(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	export function forIn(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	export function forIn(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	export function forIn(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	export function forIn(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	export function forOwn(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	export function forOwn(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function forOwn(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	export function forOwn(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	export function forOwn(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function forOwn(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	export function forOwn(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	export function forOwn(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	export function forOwn(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	export function forOwn(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	export function forOwn(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	export function forOwn(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	export function forOwn(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	export function forOwn(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	export function forOwn(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;

	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	export function map(
		list: string,
		callback: (element: string) => string,
		context?: any): string[];
	export function map(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): string[];
	export function map(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): string[];
	export function map(
		list: string[],
		callback: (element: string) => string,
		context?: any): string[];
	export function map(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): string[];
	export function map(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): string[];
	export function map(
		list: number[],
		callback: (element: number) => number,
		context?: any): number[];
	export function map(
		list: number[],
		callback: (element: number, index: number) => number,
		context?: any): number[];
	export function map(
		list: number[],
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	export function map(
		list: any[],
		callback: (element: any) => any,
		context?: any): any[];
	export function map(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): any[];
	export function map(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): any[];
	export function map(
		obj: Object,
		callback: (value: any) => any,
		context?: any): any[];
	export function map(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): any[];
	export function map(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): any[];

	/**
	* Alias for 'map'.
	**/
	export function collect(
		list: string,
		callback: (element: string) => string,
		context?: any): string[];
	export function collect(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): string[];
	export function collect(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): string[];
	export function collect(
		list: string[],
		callback: (element: string) => string,
		context?: any): string[];
	export function collect(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): string[];
	export function collect(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): string[];
	export function collect(
		list: number[],
		callback: (element: number) => number,
		context?: any): number[];
	export function collect(
		list: number[],
		callback: (element: number, index: number) => number,
		context?: any): number[];
	export function collect(
		list: number[],
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	export function collect(
		list: any[],
		callback: (element: any) => any,
		context?: any): any[];
	export function collect(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): any[];
	export function collect(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): any[];
	export function collect(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	export function collect(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	export function collect(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by callback. The callback is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	**/
	export function reduce(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function reduce(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function reduce(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	export function reduce(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function reduce(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function reduce(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	export function reduce(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	export function reduce(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	export function reduce(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	export function reduce(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	export function reduce(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	export function reduce(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduce'.
	**/
	export function inject(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function inject(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function inject(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	export function inject(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function inject(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function inject(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	export function inject(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	export function inject(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	export function inject(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	export function inject(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	export function inject(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	export function inject(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduce'.
	**/
	export function foldl(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function foldl(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function foldl(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	export function foldl(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function foldl(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function foldl(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	export function foldl(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	export function foldl(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	export function foldl(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	export function foldl(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	export function foldl(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	export function foldl(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	**/
	export function reduceRight(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function reduceRight(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function reduceRight(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	export function reduceRight(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function reduceRight(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function reduceRight(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	export function reduceRight(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	export function reduceRight(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	export function reduceRight(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	export function reduceRight(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	export function reduceRight(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	export function reduceRight(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduceRight'.
	**/
	export function foldr(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function foldr(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function foldr(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	export function foldr(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	export function foldr(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	export function foldr(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	export function foldr(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	export function foldr(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	export function foldr(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	export function foldr(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	export function foldr(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	export function foldr(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (callback). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	**/
	export function find(
		list: string,
		callback: (element: string) => bool,
		context?: any): string;
	export function find(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string;
	export function find(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string;
	export function find(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string;
	export function find(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string;
	export function find(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string;
	export function find(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number;
	export function find(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number;
	export function find(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number;
	export function find(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any;
	export function find(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any;
	export function find(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any;

	/**
	* Alias for 'find'.
	**/
	export function detect(
		list: string,
		callback: (element: string) => bool,
		context?: any): string;
	export function detect(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string;
	export function detect(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string;
	export function detect(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string;
	export function detect(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string;
	export function detect(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string;
	export function detect(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number;
	export function detect(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number;
	export function detect(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number;
	export function detect(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any;
	export function detect(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any;
	export function detect(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any;


	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (callback). Delegates to the native filter method, if it exists.
	**/
	export function filter(
		list: string,
		callback: (element: string) => bool,
		context?: any): string[];
	export function filter(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	export function filter(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];
	export function filter(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string[];
	export function filter(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	export function filter(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];
	export function filter(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number[];
	export function filter(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	export function filter(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];
	export function filter(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any[];
	export function filter(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	export function filter(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Alias for 'filter'.
	**/
	export function select(
		list: string,
		callback: (element: string) => bool,
		context?: any): string[];
	export function select(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	export function select(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];
	export function select(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string[];
	export function select(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	export function select(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];
	export function select(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number[];
	export function select(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	export function select(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];
	export function select(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any[];
	export function select(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	export function select(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Looks through each value in the list, returning an array of all the values that contain all
	* of the key-value pairs listed in properties.
	**/
	export function where(list: any[], properties: any): any[];

	/**
	* Returns the values in list without the elements that the truth test (callback) passes.
	* The opposite of filter.
	**/
	export function reject(
		list: string,
		callback: (element: string) => bool,
		context?: any): string[];
	export function reject(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	export function reject(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];
	export function reject(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string[];
	export function reject(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	export function reject(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];
	export function reject(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number[];
	export function reject(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	export function reject(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];
	export function reject(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any[];
	export function reject(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	export function reject(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Returns true if all of the values in the list pass the callback truth test. Delegates to the
	* native method every, if present.
	**/
	export function all(
		list: string,
		callback: (element: string) => bool,
		context?: any): bool;
	export function all(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	export function all(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	export function all(
		list: string[],
		callback: (element: string) => bool,
		context?: any): bool;
	export function all(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	export function all(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	export function all(
		list: number[],
		callback: (element: number) => bool,
		context?: any): bool;
	export function all(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	export function all(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): bool;
	export function all(
		list: any[],
		callback: (element: any) => bool,
		context?: any): bool;
	export function all(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	export function all(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'all'.
	**/
	export function every(
		list: string,
		callback: (element: string) => bool,
		context?: any): bool;
	export function every(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	export function every(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	export function every(
		list: string[],
		callback: (element: string) => bool,
		context?: any): bool;
	export function every(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	export function every(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	export function every(
		list: number[],
		callback: (element: number) => bool,
		context?: any): bool;
	export function every(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	export function every(
		list: number[],
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;
	export function every(
		list: any[],
		callback: (element: any) => bool,
		context?: any): bool;
	export function every(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	export function every(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Returns true if any of the values in the list pass the callback truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	**/
	export function any(
		list: string,
		callback?: (element: string) => bool,
		context?: any): bool;
	export function any(
		list: string,
		callback?: (element: string, index: number) => bool,
		context?: any): bool;
	export function any(
		list: string,
		callback?: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	export function any(
		list: string[],
		callback?: (element: string) => bool,
		context?: any): bool;
	export function any(
		list: string[],
		callback?: (element: string, index: number) => bool,
		context?: any): bool;
	export function any(
		list: string[],
		callback?: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	export function any(
		list: number[],
		callback?: (element: number) => bool,
		context?: any): bool;
	export function any(
		list: number[],
		callback?: (element: number, index: number) => bool,
		context?: any): bool;
	export function any(
		list: number[],
		callback?: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;
	export function any(
		list: any[],
		callback?: (element: any) => bool,
		context?: any): bool;
	export function any(
		list: any[],
		callback?: (element: any, index: number) => bool,
		context?: any): bool;
	export function any(
		list: any[],
		callback?: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'any'.
	**/
	export function some(
		list: string,
		callback: (element: string) => bool,
		context?: any): bool;
	export function some(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	export function some(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	export function some(
		list: string[],
		callback: (element: string) => bool,
		context?: any): bool;
	export function some(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	export function some(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	export function some(
		list: number[],
		callback: (element: number) => bool,
		context?: any): bool;
	export function some(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	export function some(
		list: number[],
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;
	export function some(
		list: any[],
		callback: (element: any) => bool,
		context?: any): bool;
	export function some(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	export function some(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	**/
	export function contains(list: string, value: string, fromIndex?: number): bool;
	export function contains(list: string[], value: string, fromIndex?: number): bool;
	export function contains(list: number[], value: number, fromIndex?: number): bool;
	export function contains(list: any[], value: any, fromIndex?: number): bool;

	/**
	* Alias for 'contains'.
	**/
	export function include(list: string, value: string, fromIndex?: number): bool;
	export function include(list: string[], value: string, fromIndex?: number): bool;
	export function include(list: number[], value: number, fromIndex?: number): bool;
	export function include(list: any[], value: any, fromIndex?: number): bool;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	**/
	export function invoke(list: string, methodName: string, ...arguments: any[]): void;
	export function invoke(list: string[], methodName: string, ...arguments: any[]): void;
	export function invoke(list: number[], methodName: string, ...arguments: any[]): void;
	export function invoke(list: any[], methodName: string, ...arguments: any[]): void;

	/**
	* A convenient version of what is perhaps the most common use-case for map: extracting a list of
	* property values.
	**/
	export function pluck(list: any[], propertyName: string): any[];

	/**
	* Returns the maximum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	export function max(list: number[]): number;
	export function max(
		list: string,
		callback: (element: string) => number,
		context?: any): string;
	export function max(
		list: string,
		callback: (element: string, index: number) => number,
		context?: any): string;
	export function max(
		list: string,
		callback: (element: string, index: number, list: string) => number,
		context?: any): string;
	export function max(
		list: string[],
		callback: (element: string) => number,
		context?: any): string;
	export function max(
		list: string[],
		callback: (element: string, index: number) => number,
		context?: any): string;
	export function max(
		list: string[],
		callback: (element: string, index: number, list: string[]) => number,
		context?: any): string;
	export function max(
		list: any[],
		callback: (element: any) => number,
		context?: any): any;
	export function max(
		list: any[],
		callback: (element: any, index: number) => number,
		context?: any): any;
	export function max(
		list: any[],
		callback: (element: any, index: number, list: any[]) => number,
		context?: any): any;

	/**
	* Returns the minimum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	export function min(list: number[]): number;
	export function min(
		list: string,
		callback: (element: string) => number,
		context?: any): string;
	export function min(
		list: string,
		callback: (element: string, index: number) => number,
		context?: any): string;
	export function min(
		list: string,
		callback: (element: string, index: number, list: string) => number,
		context?: any): string;
	export function min(
		list: string[],
		callback: (element: string) => number,
		context?: any): string;
	export function min(
		list: string[],
		callback: (element: string, index: number) => number,
		context?: any): string;
	export function min(
		list: string[],
		callback: (element: string, index: number, list: any[]) => number,
		context?: any): string;
	export function min(
		list: any[],
		callback: (obj: any) => number,
		context?: any): any;
	export function min(
		list: any[],
		callback: (obj: any, index: number) => number,
		context?: any): any;
	export function min(
		list: any[],
		callback: (obj: any, index: number, list: any[]) => number,
		context?: any): any;

	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through callback. callback may also be the string name of the property to sort by (eg. length).
	**/
	export function sortBy(
		list: string,
		callback: (element: string) => number,
		context?: any): string[];
	export function sortBy(
		list: string,
		callback: (element: string, index: number) => number,
		context?: any): string[];
	export function sortBy(
		list: string,
		callback: (element: string, index: number, list: string) => number,
		context?: any): string[];
	export function sortBy(
		list: string[],
		callback: (element: string) => number,
		context?: any): string[];
	export function sortBy(
		list: string[],
		callback: (element: string, index: number) => number,
		context?: any): string[];
	export function sortBy(
		list: string[],
		callback: (element: string, index: number, list: string[]) => number,
		context?: any): string[];
	export function sortBy(
		list: number[],
		callback: (element: number) => number,
		context?: any): number[];
	export function sortBy(
		list: number[],
		callback: (element: number, index: number) => number,
		context?: any): number[];
	export function sortBy(
		list: number[],
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	export function sortBy(
		list: any[],
		callback: (element: any) => number,
		context?: any): any[];
	export function sortBy(
		list: any[],
		callback: (element: any, index: number) => number,
		context?: any): any[];
	export function sortBy(
		list: any[],
		callback: (element: any, index: number, list: any[]) => number,
		context?: any): any[];
	export function sortBy(
		list: string[],
		callback: string,
		context?: any): string[];
	export function sortBy(
		list: number[],
		callback: string,
		context?: any): number[];
	export function sortBy(
		list: any[],
		callback: string,
		context?: any): any[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through callback.
	* If callback is a string instead of a function, groups by the property named by callback on
	* each of the values.
	**/
	export function groupBy(
		list: string,
		callback: (element: string) => string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: string[],
		callback: (element: string) => string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: number[],
		callback: (element: number) => string,
		context?: any): { [key: string]: number[]; };
	export function groupBy(
		list: number[],
		callback: (element: number, index: number) => string,
		context?: any): { [key: string]: number[]; };
	export function groupBy(
		list: number[],
		callback: (element: number, index: number, list: number[]) => string,
		context?: any): { [key: string]: number[]; };
	export function groupBy(
		list: any[],
		callback: (element: any) => string,
		context?: any): { [key: string]: any[]; };
	export function groupBy(
		list: any[],
		callback: (element: any, index: number) => string,
		context?: any): { [key: string]: any[]; };
	export function groupBy(
		list: any[],
		callback: (element: any, index: number, list: any[]) => string,
		context?: any): { [key: string]: any[]; };
	export function groupBy(
		list: string[],
		callback: string,
		context?: any): { [key: string]: string[]; };
	export function groupBy(
		list: number[],
		callback: string,
		context?: any): { [key: string]: number[]; };
	export function groupBy(
		list: any[],
		callback: string,
		context?: any): { [key: string]: any[]; };

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	**/
	export function countBy(
		list: string,
		callback: (element: string) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: string[],
		callback: (element: string) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: number[],
		callback: (element: number) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: number[],
		callback: (element: number, index: number) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: number[],
		callback: (element: number, index: number, list: number[]) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: any[],
		callback: (element: any) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: any[],
		callback: (element: any, index: number) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: any[],
		callback: (element: any, index: number, list: any[]) => string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: string[],
		callback: string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: number[],
		callback: string,
		context?: any): { [key: string]: number; };
	export function countBy(
		list: any[],
		callback: string,
		context?: any): { [key: string]: number; };

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	**/
	export function shuffle(list: string): string;
	export function shuffle(list: string[]): string[];
	export function shuffle(list: number[]): number[];
	export function shuffle(list: any[]): any[];

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	**/
	export function toArray(list: any): any[];

	/**
	* Return the number of values in the list.
	**/
	export function size(list: any): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	**/
	export function first(array: string): string;
	export function first(array: string, n: number): string;
	export function first(array: string[]): string;
	export function first(array: string[], n: number): string[];
	export function first(array: number[]): number;
	export function first(array: number[], n: number): number[];
	export function first(array: any[]): any;
	export function first(array: any[], n: number): any[];

	/**
	* Alias for 'first'.
	**/
	export function head(array: string): string;
	export function head(array: string, n: number): string;
	export function head(array: string[]): string;
	export function head(array: string[], n: number): string[];
	export function head(array: number[]): number;
	export function head(array: number[], n: number): number[];
	export function head(array: any[]): any;
	export function head(array: any[], n: number): any[];

	/**
	* Alias for 'first'.
	**/
	export function take(array: string): string;
	export function take(array: string, n: number): string;
	export function take(array: string[]): string;
	export function take(array: string[], n: number): string[];
	export function take(array: number[]): number;
	export function take(array: number[], n: number): number[];
	export function take(array: any[]): any;
	export function take(array: any[], n: number): any[];

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	**/
	export function initial(array: string, n?: number): string;
	export function initial(array: string[], n?: number): string[];
	export function initial(array: number[], n?: number): number[];
	export function initial(array: any[], n?: number): any[];

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	**/
	export function last(array: string): string;
	export function last(array: string, n: number): string;
	export function last(array: string[]): string;
	export function last(array: string[], n: number): string[];
	export function last(array: number[]): number;
	export function last(array: number[], n: number): number[];
	export function last(array: any[]): any;
	export function last(array: any[], n: number): any[];

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	**/
	export function rest(array: string, index: number): string;
	export function rest(array: string[], index: number): string[];
	export function rest(array: number[], index: number): number[];
	export function rest(array: any[], index: number): any[];

	/**
	* Alias for 'rest'.
	**/
	export function tail(array: string, index: number): string;
	export function tail(array: string[], index: number): string[];
	export function tail(array: number[], index: number): number[];
	export function tail(array: any[], index: number): any[];

	/**
	* Alias for 'rest'.
	**/
	export function drop(array: string, index: number): string;
	export function drop(array: string[], index: number): string[];
	export function drop(array: number[], index: number): number[];
	export function drop(array: any[], index: number): any[];

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	**/
	export function compact(array: string): string;
	export function compact(array: string[]): string[];
	export function compact(array: number[]): number[];
	export function compact(array: bool[]): bool[];
	export function compact(array: any[]): any[];

	/**
	* Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will
	* only be flattened a single level.
	**/
	export function flatten(array: string[], shallow?: bool): string[];
	export function flatten(array: string[][], shallow?: bool): string[];
	export function flatten(array: number[], shallow?: bool): number[];
	export function flatten(array: number[][], shallow?: bool): number[];
	export function flatten(array: any[], shallow?: bool): any[];
	export function flatten(array: any[][], shallow?: bool): any[];

	/**
	* Returns a copy of the array with all instances of the values removed.
	**/
	export function without(array: string, ...values: string[]): string;
	export function without(array: string[], ...values: string[]): string[];
	export function without(array: number[], ...values: number[]): number[];
	export function without(array: any[], ...values: any[]): any[];

	/**
	* Computes the union of the passed-in arrays: the list of unique items, in order, that are
	* present in one or more of the arrays.
	**/
	export function union(...arrays: string[][]): string[];
	export function union(...arrays: number[][]): number[];
	export function union(...arrays: any[][]): any[];

	/**
	* Computes the list of values that are the intersection of all the arrays. Each value in the result
	* is present in each of the arrays.
	**/
	export function intersection(...arrays: string[][]): string[];
	export function intersection(...arrays: number[][]): number[];
	export function intersection(...arrays: any[][]): any[];

	/**
	* Similar to without, but returns the values from array that are not present in the other arrays.
	**/
	export function difference(array: string, ...others: string[]): string;
	export function difference(array: string[], ...others: string[]): string[];
	export function difference(array: number[], ...others: number[]): number[];
	export function difference(array: any[], ...others: any[]): any[];

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an callback function.
	**/
	export function uniq(array: string, isSorted?: bool, callback?: (element: string) => string): string[];
	export function uniq(array: string, isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	export function uniq(array: string, isSorted?: bool, callback?: (element: string, index: number, list: string) => string): string[];
	export function uniq(array: string[], isSorted?: bool, callback?: (element: string) => string): string[];
	export function uniq(array: string[], isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	export function uniq(array: string[], isSorted?: bool, callback?: (element: string, index: number, list: string[]) => string): string[];
	export function uniq(array: number[], isSorted?: bool, callback?: (element: number) => number): number[];
	export function uniq(array: number[], isSorted?: bool, callback?: (element: number, index: number) => number): number[];
	export function uniq(array: number[], isSorted?: bool, callback?: (element: number, index: number, list: number[]) => number): number[];
	export function uniq(array: any[], isSorted?: bool, callback?: (element: any) => any): any[];
	export function uniq(array: any[], isSorted?: bool, callback?: (element: any, index: number) => any): any[];
	export function uniq(array: any[], isSorted?: bool, callback?: (element: any, index: number, list: any[]) => any): any[];

	/**
	* Alias for 'uniq'.
	**/
	export function unique(array: string, isSorted?: bool, callback?: (element: string) => string): string[];
	export function unique(array: string, isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	export function unique(array: string, isSorted?: bool, callback?: (element: string, index: number, list: string) => string): string[];
	export function unique(array: string[], isSorted?: bool, callback?: (element: string) => string): string[];
	export function unique(array: string[], isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	export function unique(array: string[], isSorted?: bool, callback?: (element: string, index: number, list: string[]) => string): string[];
	export function unique(array: number[], isSorted?: bool, callback?: (element: number) => number): number[];
	export function unique(array: number[], isSorted?: bool, callback?: (element: number, index: number) => number): number[];
	export function unique(array: number[], isSorted?: bool, callback?: (element: number, index: number, list: number[]) => number): number[];
	export function unique(array: any[], isSorted?: bool, callback?: (element: any) => any): any[];
	export function unique(array: any[], isSorted?: bool, callback?: (element: any, index: number) => any): any[];
	export function unique(array: any[], isSorted?: bool, callback?: (element: any, index: number, list: any[]) => any): any[];

	/**
	* Merges together the values of each of the arrays with the values at the corresponding position.
	* Useful when you have separate data sources that are coordinated through matching array indexes.
	* If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
	**/
	export function zip(...arrays: string[][]): string[][];
	export function zip(...arrays: number[][]): number[][];
	export function zip(...arrays: any[][]): any[][];

	/**
	* Converts arrays into objects. Pass either a single list of [key, value] pairs, or a
	* list of keys, and a list of values.
	**/
	export function object(keys: string[], values: any[]): any;
	export function object(...keyValuePairs: any[][]): any;

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	**/
	export function indexOf(array: string, value: string, isSorted?: bool): number;
	export function indexOf(array: string[], value: string, isSorted?: bool): number;
	export function indexOf(array: number[], value: number, isSorted?: bool): number;
	export function indexOf(array: any[], value: any, isSorted?: bool): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	**/
	export function lastIndexOf(array: string, value: string, from?: number): number;
	export function lastIndexOf(array: string[], value: string, from?: number): number;
	export function lastIndexOf(array: number[], value: number, from?: number): number;
	export function lastIndexOf(array: any[], value: any, from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an callback is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	**/
	export function sortedIndex(list: string, value: string, callback?: (element: string) => number): number;
	export function sortedIndex(list: string[], value: string, callback?: (element: string) => number): number;
	export function sortedIndex(list: number[], value: number, callback?: (element: number) => number): number;
	export function sortedIndex(list: any[], value: any, callback?: (element: any) => number): number;

	/**
	* A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted,
	* defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented)
	* by step, exclusive.
	**/
	export function range(start: number, stop: number, step?: number): number[];
	// If start is not specified the implementation will never pull the step (step = arguments[2] || 0)
	export function range(stop: number): number[];

	/************
	* Functions *
	*************/

	/**
	* Bind a function to an object, meaning that whenever the function is called, the value of this will
	* be the object. Optionally, bind arguments to the function to pre-fill them, also known as partial application.
	**/
	export function bind(fn: Function, object: any, ...arguments: any[]): Function;
	
	/**
	* Creates a function that, when called, invokes the method at object[key] and prepends any additional bindKey arguments
	* to those passed to the bound function. This method differs from _.bind by allowing bound functions to reference methods
	* that will be redefined or don't yet exist. See http://michaux.ca/articles/lazy-function-definition-pattern.
	**/
	export function bindKey(object: any, key: string, ...arguments: any[]): Function;

	/**
	* Binds a number of methods on the object, specified by methodNames, to be run in the context of that object
	* whenever they are invoked. Very handy for binding functions that are going to be used as event handlers,
	* which would otherwise be invoked with a fairly useless this. If no methodNames are provided, all of the
	* object's function properties will be bound to it.
	**/
	export function bindAll(object: any, ...methodNames: string[]): void;
	
	/**
	* Creates a function that, when called, invokes func with any additional partial arguments prepended to those passed to the new
	* function. This method is similar to bind, except it does not alter the this binding.
	**/
	export function partial(fn: Function, ...arguments: any[]): Function;

	/**
	* Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations.
	* If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based
	* on the arguments to the original function. The default hashFunction just uses the first argument to the
	* memoized function as the key.
	**/
	export function memoize(fn: Function, hashFn?: (n: any) => string): Function;

	/**
	* Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments,
	* they will be forwarded on to the function when it is invoked.
	**/
	export function delay(fn: Function, waitMS: number, ...arguments: any[]): void;

	/**
	* Defers invoking the function until the current call stack has cleared, similar to using setTimeout
	* with a delay of 0. Useful for performing expensive computations or HTML rendering in chunks without
	* blocking the UI thread from updating. If you pass the optional arguments, they will be forwarded on
	* to the function when it is invoked.
	**/
	export function defer(fn: Function, ...arguments: any[]): void;

	/**
	* Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly,
	* will only actually call the original function at most once per every wait milliseconds. Useful for
	* rate-limiting events that occur faster than you can keep up with.
	**/
	export function throttle(fn: Function, waitMS: number): Function;

	/**
	* Creates and returns a new debounced version of the passed function that will postpone its execution
	* until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing
	* behavior that should only happen after the input has stopped arriving. For example: rendering a preview
	* of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.
	*
	* Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead
	* of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double
	*-clicks on a "submit" button from firing a second time.
	**/
	export function debounce(fn: Function, waitMS: number, immediate?: bool): Function;

	/**
	* Creates a version of the function that can only be called one time. Repeated calls to the modified
	* function will have no effect, returning the value from the original call. Useful for initialization
	* functions, instead of having to set a boolean flag and then check it later.
	**/
	export function once(fn: Function): Function;

	/**
	* Creates a version of the function that will only be run after first being called count times. Useful
	* for grouping asynchronous responses, where you want to be sure that all the async calls have finished,
	* before proceeding.
	**/
	export function after(count: number, fn: Function): Function;

	/**
	* Wraps the first function inside of the wrapper function, passing it as the first argument. This allows
	* the wrapper to execute code before and after the function runs, adjust the arguments, and execute it
	* conditionally.
	**/
	export function wrap(fn: Function, wrapper: (fn: Function) => any): Function;
	export function wrap(fn: Function, wrapper: (fn: Function, ...args: any[]) => any): Function;

	/**
	* Returns the composition of a list of functions, where each function consumes the return value of the
	* function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).
	**/
	export function compose(...functions: Function[]): Function;

	/**********
	* Objects *
	***********/

	/**
	* Retrieve all the names of the object's properties.
	**/
	export function keys(object: any): string[];

	/**
	* Return all of the values of the object's properties.
	**/
	export function values(object: any): any[];

	/**
	* Convert an object into a list of [key, value] pairs.
	**/
	export function pairs(object: any): any[][];

	/**
	* Returns a copy of the object where the keys have become the values and the values the keys.
	* For this to work, all of your object's values should be unique and string serializable.
	**/
	export function invert(object: any): any;

	/**
	* Returns a sorted list of the names of every method in an object — that is to say,
	* the name of every function property of the object.
	**/
	export function functions(object: any): string[];

	/**
	* Copy all of the properties in the source objects over to the destination object, and return
	* the destination object. It's in-order, so the last source will override properties of the
	* same name inv previous arguments.
	**/
	export function extend(destination: any, ...sources: any[]): any;

	/**
	* Merges enumerable properties of the source export function object(s) into the destination object. Subsequent sources
	will overwrite propery assignments of previous sources.
	**/
	export function merge(destination: any, ...sources: any[]): any;

	/**
	* Return a copy of the object, filtered to only have values for the whitelisted keys
	* (or array of valid keys).
	**/
	export function pick(object: any, ...keys: string[]): any;
	export function pick(
		object: any, 
		callback: (element: string) => any,
		context?: any): void;
	export function pick(
		object: any,
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function pick(
		object: any,
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
	**/
	export function omit(object: any, ...keys: string[]): any;
	export function omit(
		object: any, 
		callback: (element: string) => any,
		context?: any): void;
	export function omit(
		object: any,
		callback: (element: string, index: number) => any,
		context?: any): void;
	export function omit(
		object: any,
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Fill in null and undefined properties in object with values from the defaults objects,
	* and return the object. As soon as the property is filled, further defaults will have no effect.
	**/
	export function defaults(object: any, ...defaults: any[]): any;

	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	**/
	export function clone(object: any, deep?: bool): any;
	export function clone(list: string[], deep?: bool): string[];
	export function clone(list: number[], deep?: bool): number[];
	export function clone(list: any[], deep?: bool): any[];
	
	/**
	* Creates a deep clone of value. Functions and DOM nodes are not cloned. The enumerable properties
	* of arguments objects and objects created by constructors other than Object are cloned to plain Object objects.
	**/
	export function cloneDeep(object: any): any;
	export function cloneDeep(list: string[]): string[];
	export function cloneDeep(list: number[]): number[];
	export function cloneDeep(list: any[]): any[];

	/**
	* Invokes interceptor with the object, and then returns object. The primary purpose of this method
	* is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.
	**/
	export function tap(object: any, intercepter: Function): any;

	/**
	* Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe
	* reference to the hasOwnProperty function, in case it's been overridden accidentally.
	**/
	export function has(object: any, key: string): bool;

	/**
	* Performs an optimized deep comparison between the two objects,
	* to determine if they should be considered equal.
	**/
	export function isEqual(object: any, other: any): bool;

	/**
	* Returns true if object contains no values.
	**/
	export function isEmpty(object: any): bool;
	export function isEmpty(list: any[]): bool;

	/**
	* Returns true if object is a DOM element.
	**/
	export function isElement(object: any): bool;

	/**
	* Returns true if object is an Array.
	**/
	export function isArray(object: any): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	export function isObject(object: any): bool;
	
	/**
	* Checks if a given value is an object created by the Object constructor.
	**/
	export function isPlainObject(object: any): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	export function isArguments(object: any): bool;

	/**
	* Returns true if object is a Function.
	**/
	export function isFunction(object: any): bool;

	/**
	* Returns true if object is a String.
	**/
	export function isString(object: any): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	export function isNumber(object: any): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	export function isFinite(object: any): bool;

	/**
	* Returns true if object is either true or false.
	**/
	export function isBoolean(object: any): bool;

	/**
	* Returns true if object is a Date.
	**/
	export function isDate(object: any): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	export function isRegExp(object: any): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	export function isNaN(object: any): bool;

	/**
	* Returns true if the value of object is null.
	**/
	export function isNull(object: any): bool;

	/**
	* Returns true if value is undefined.
	**/
	export function isUndefined(object: any): bool;

	/**********
	* Utility *
	***********/

	/**
	* Give control of the "_" variable back to its previous owner.
	* Returns a reference to the Underscore object.
	**/
	export function noConflict(): ILodash;

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	export function identity(value: string): string;
	export function identity(value: string[]): string[];
	export function identity(value: number): number;
	export function identity(value: number[]): number[];
	export function identity(value: bool): bool;
	export function identity(value: any): any;

	/**
	* Invokes the given callback function n times.
	* Each invocation of callback is called with an index argument.
	* @example
	*
	* _(3).export function times(function(n){ genie.grantWishNumber(n); });
	*
	**/
	export function times(n: number, callback: (n: number) => void , context?: any): void;

	/**
	* Returns a random integer between min and max, inclusive. If you only pass one argument,
	* it will return a number between 0 and that number.
	**/
	export function random(max: number): number;
	export function random(min: number, max: number): number;

	/**
	* Allows you to extend Underscore with your own utility functions. Pass a hash of
	* {name: function} definitions to have your functions added to the Underscore object,
	* as well as the OOP wrapper.
	* @example
	*
	* _.export function mixin({
	*     capitalize : function(string) {
	*         return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	*     }
	* });
	* _("fabio").capitalize();
	* => "Fabio"
	*
	**/
	export function mixin(object: any): void;

	/**
	* Generate a globally-unique id for client-side models or DOM elements that need one.
	* If prefix is passed, the id will be appended to it. Without prefix, returns an integer.
	**/
	export function uniqueId(): number;
	export function uniqueId(prefix: string): string;

	/**
	* Escapes a string for insertion into HTML, replacing &, <, >, ", ', and / characters.
	**/
	export function escape(str: string): string;

	/**
	* If the value of the named property is a function then invoke it; otherwise, return it.
	**/
	export function result(object: any, property: string): any;

	/**
	* Compiles JavaScript templates into functions that can be evaluated for rendering. Useful
	* for rendering complicated bits of HTML from JSON data sources. Template functions can both
	* interpolate variables, using <%= … %>, as well as execute arbitrary JavaScript code, with
	* <% … %>. If you wish to interpolate a value, and have it be HTML-escaped, use <%- … %> When
	* you evaluate a template function, pass in a data object that has properties corresponding to
	* the template's free variables. If you're writing a one-off, you can pass the data object as
	* the second parameter to template in order to render immediately instead of returning a template
	* function. The settings argument should be a hash containing any _.templateSettings that should
	* be overridden.
	**/
	export function template(templateString: string, data?: any, settings?: UnderscoreTemplateSettings): any;

	// By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	export var templateSettings: UnderscoreTemplateSettings;

	/***********
	* Chaining *
	************/

	/**
	* Returns a wrapped object. Calling methods on this object will continue to return wrapped objects
	* until value is used.
	**/
	export function chain(obj: any): any;

	/**
	* Extracts the value of a wrapped object.
	**/
	export function value(s: string): string;
	export function value(n: number): number;
	export function value(s: string[]): string[];
	export function value(n: number[]): number[];
	export function value(obj: any): any;
	export function value(obj: any[]): any[];

	/**************
	* OOP Wrapper *
	**************/
	export function (key: string): UnderscoreStringOOPWrapper;
	export function (list: string[]): UnderscoreStringArrayOOPWrapper;
	export function (n: number): UnderscoreNumberOOPWrapper;
	export function (list: number[]): UnderscoreNumberArrayOOPWrapper;
	export function (obj: any): UnderscoreObjectOOPWrapper;
	export function (list: any[]): UnderscoreObjectArrayOOPWrapper;

    // underscore.string
    export function numberFormat (n : number, decimals? : number, decimalSeparator? : string, orderSeparator? : string) : string;
    export function levenshtein (str1 : string, str2 : string) : number;
    export function capitalize (str : string) : string;
    export function chop (str : string, step : number) : string[];
    export function clean (str : string) : string;
    export function chars (str : string) : string[];
    export function swapCase (str : string) : string;
    export function include (str : string, substr : string) : bool;
    export function count (str : string, substr : string) : number;
    export function escapeHTML (str : string) : string;
    export function unescapeHTML (str : string) : string;
    export function insert (str : string, index : number, substr : string) : string;
    export function isBlank (str : string) : bool;
    export function join (separator : string, ...strs : string[]) : string;
    export function lines (str : string) : string[];
	export function reverse (str : string) : string;
    export function splice (str : string, index : number, howmany : number, substr : string) : string;
    export function startsWith (str : string, starts : string) : bool;
    export function endsWith (str : string, ends : string) : bool;
    export function succ (str : string) : string;
    export function titleize (str : string) : string;
    export function camelize (str : string) : string;
    export function classify (str : string) : string;
    export function underscored (str : string) : string;
    export function dasherize (str : string) : string;
    export function humanize (str : string) : string;
    export function trim (str : string, characters? : string) : string;
    export function strip (str : string, characters? : string) : string;
    export function ltrim (str : string, characters? : string) : string;
    export function lstrip (str : string, characters? : string) : string;
    export function rtrim (str : string, characters? : string) : string;
    export function rstrip (str : string, characters? : string) : string;
    export function truncate (str : string, length : number, truncateString? : string) : string;
    export function prune (str : string, length : number, pruneString? : string) : string;
    export function words (str : string, delimiter : RegExp) : string[];
    export function sprintf (format : string, ...args : any[]) : string;
    export function pad (str : string, length : number, padStr? : string, type? : string) : string;
    export function lpad (str : string, length : number, padStr? : string) : string;
    export function rjust (str : string, length : number, padStr? : string) : string;
    export function rpad (str : string, length : number, padStr? : string) : string;
    export function ljust (str : string, length : number, padStr? : string) : string;
    export function lrpad (str : string, length : number, padStr? : string) : string;
    export function center (str : string, length : number, padStr? : string) : string;
    export function toNumber (str : string, decimals? : number) : string;
    export function strRight (str : string, pattern : string) : string;
    export function strRightBack (str : string, pattern : string) : string;
    export function strLeft (str : string, pattern : string) : string;
    export function strLeftBack (str : string, pattern : string) : string;
    export function stripTags (str : string) : string;
    export function toSentence (array : any[], delimiter? : string, lastDelimiter? : string) : string;
    export function toSentenceSerial (array : any[], delimiter? : string, lastDelimiter? : string) : string;
    export function repeat (str : string, count : number, separator? : string) : string;
    export function surround (str : string, wrap : string) : string;
    export function quote (str : string) : string;
    export function q (str : string) : string;
    export function slugify (str : string) : string;
}

//     underscore-1.4.2.d.ts
//     (c) 2012 Josh Baldwin
//     underscore.d.ts may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/jbaldwin/underscore.d.ts

interface ILodash {

	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	each(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	each(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	each(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	each(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	each(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	each(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	each(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	each(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	each(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	each(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	each(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	each(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	each(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	each(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	each(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	forEach(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	forEach(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	forEach(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	forEach(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	forEach(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	forEach(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	forEach(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	forEach(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	forEach(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	forEach(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	forEach(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	forEach(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	forEach(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	forEach(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	forEach(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;
		
	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	forIn(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	forIn(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	forIn(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	forIn(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	forIn(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	forIn(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	forIn(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	forIn(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	forIn(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	forIn(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	forIn(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	forIn(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	forIn(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	forIn(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	forIn(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	forOwn(
		list: string,
		callback: (element: string) => any,
		context?: any): void;
	forOwn(
		list: string,
		callback: (element: string, index: number) => any,
		context?: any): void;
	forOwn(
		list: string,
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
	forOwn(
		list: string[],
		callback: (element: string) => any,
		context?: any): void;
	forOwn(
		list: string[],
		callback: (element: string, index: number) => any,
		context?: any): void;
	forOwn(
		list: string[],
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
	forOwn(
		list: number[],
		callback: (element: number) => any,
		context?: any): void;
	forOwn(
		list: number[],
		callback: (element: number, index: number) => any,
		context?: any): void;
	forOwn(
		list: number[],
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	forOwn(
		list: any[],
		callback: (element: any) => any,
		context?: any): void;
	forOwn(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): void;
	forOwn(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
	forOwn(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	forOwn(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	forOwn(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;

	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	map(
		list: string,
		callback: (element: string) => string,
		context?: any): string[];
	map(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): string[];
	map(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): string[];
	map(
		list: string[],
		callback: (element: string) => string,
		context?: any): string[];
	map(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): string[];
	map(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): string[];
	map(
		list: number[],
		callback: (element: number) => number,
		context?: any): number[];
	map(
		list: number[],
		callback: (element: number, index: number) => number,
		context?: any): number[];
	map(
		list: number[],
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	map(
		list: any[],
		callback: (element: any) => any,
		context?: any): any[];
	map(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): any[];
	map(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): any[];
	map(
		obj: Object,
		callback: (value: any) => any,
		context?: any): any[];
	map(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): any[];
	map(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): any[];

	/**
	* Alias for 'map'.
	**/
	collect(
		list: string,
		callback: (element: string) => string,
		context?: any): string[];
	collect(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): string[];
	collect(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): string[];
	collect(
		list: string[],
		callback: (element: string) => string,
		context?: any): string[];
	collect(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): string[];
	collect(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): string[];
	collect(
		list: number[],
		callback: (element: number) => number,
		context?: any): number[];
	collect(
		list: number[],
		callback: (element: number, index: number) => number,
		context?: any): number[];
	collect(
		list: number[],
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	collect(
		list: any[],
		callback: (element: any) => any,
		context?: any): any[];
	collect(
		list: any[],
		callback: (element: any, index: number) => any,
		context?: any): any[];
	collect(
		list: any[],
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): any[];
	collect(
		obj: Object,
		callback: (value: any) => any,
		context?: any): void;
	collect(
		obj: Object,
		callback: (value: any, key: string) => any,
		context?: any): void;
	collect(
		obj: Object,
		callback: (value: any, key: string, object: Object) => any,
		context?: any): void;

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by callback. The callback is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	**/
	reduce(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduce(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduce(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	reduce(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduce(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduce(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	reduce(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	reduce(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	reduce(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	reduce(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	reduce(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	reduce(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduce'.
	**/
	inject(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	inject(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	inject(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	inject(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	inject(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	inject(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	inject(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	inject(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	inject(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	inject(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	inject(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	inject(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduce'.
	**/
	foldl(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldl(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldl(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	foldl(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldl(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldl(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	foldl(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	foldl(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	foldl(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	foldl(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	foldl(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	foldl(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	**/
	reduceRight(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	reduceRight(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	reduceRight(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	reduceRight(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	reduceRight(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	reduceRight(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduceRight'.
	**/
	foldr(
		list: string,
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldr(
		list: string,
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldr(
		list: string,
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;
	foldr(
		list: string[],
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldr(
		list: string[],
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldr(
		list: string[],
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;
	foldr(
		list: number[],
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	foldr(
		list: number[],
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	foldr(
		list: number[],
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;
	foldr(
		list: any[],
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	foldr(
		list: any[],
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	foldr(
		list: any[],
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (callback). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	**/
	find(
		list: string,
		callback: (element: string) => bool,
		context?: any): string;
	find(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string;
	find(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string;
	find(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string;
	find(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string;
	find(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string;
	find(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number;
	find(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number;
	find(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number;
	find(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any;
	find(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any;
	find(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any;

	/**
	* Alias for 'find'.
	**/
	detect(
		list: string,
		callback: (element: string) => bool,
		context?: any): string;
	detect(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string;
	detect(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string;
	detect(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string;
	detect(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string;
	detect(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string;
	detect(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number;
	detect(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number;
	detect(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number;
	detect(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any;
	detect(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any;
	detect(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any;


	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (callback). Delegates to the native filter method, if it exists.
	**/
	filter(
		list: string,
		callback: (element: string) => bool,
		context?: any): string[];
	filter(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	filter(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];
	filter(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string[];
	filter(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	filter(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];
	filter(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number[];
	filter(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	filter(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];
	filter(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any[];
	filter(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	filter(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Alias for 'filter'.
	**/
	select(
		list: string,
		callback: (element: string) => bool,
		context?: any): string[];
	select(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	select(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];
	select(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string[];
	select(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	select(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];
	select(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number[];
	select(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	select(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];
	select(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any[];
	select(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	select(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Looks through each value in the list, returning an array of all the values that contain all
	* of the key-value pairs listed in properties.
	**/
	where(list: any[], properties: any): any[];

	/**
	* Returns the values in list without the elements that the truth test (callback) passes.
	* The opposite of filter.
	**/
	reject(
		list: string,
		callback: (element: string) => bool,
		context?: any): string[];
	reject(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	reject(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];
	reject(
		list: string[],
		callback: (element: string) => bool,
		context?: any): string[];
	reject(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	reject(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];
	reject(
		list: number[],
		callback: (element: number) => bool,
		context?: any): number[];
	reject(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	reject(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];
	reject(
		list: any[],
		callback: (element: any) => bool,
		context?: any): any[];
	reject(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	reject(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Returns true if all of the values in the list pass the callback truth test. Delegates to the
	* native method every, if present.
	**/
	all(
		list: string,
		callback: (element: string) => bool,
		context?: any): bool;
	all(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	all(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	all(
		list: string[],
		callback: (element: string) => bool,
		context?: any): bool;
	all(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	all(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	all(
		list: number[],
		callback: (element: number) => bool,
		context?: any): bool;
	all(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	all(
		list: number[],
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): bool;
	all(
		list: any[],
		callback: (element: any) => bool,
		context?: any): bool;
	all(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	all(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'all'.
	**/
	every(
		list: string,
		callback: (element: string) => bool,
		context?: any): bool;
	every(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	every(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	every(
		list: string[],
		callback: (element: string) => bool,
		context?: any): bool;
	every(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	every(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	every(
		list: number[],
		callback: (element: number) => bool,
		context?: any): bool;
	every(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	every(
		list: number[],
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;
	every(
		list: any[],
		callback: (element: any) => bool,
		context?: any): bool;
	every(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	every(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Returns true if any of the values in the list pass the callback truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	**/
	any(
		list: string,
		callback?: (element: string) => bool,
		context?: any): bool;
	any(
		list: string,
		callback?: (element: string, index: number) => bool,
		context?: any): bool;
	any(
		list: string,
		callback?: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	any(
		list: string[],
		callback?: (element: string) => bool,
		context?: any): bool;
	any(
		list: string[],
		callback?: (element: string, index: number) => bool,
		context?: any): bool;
	any(
		list: string[],
		callback?: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	any(
		list: number[],
		callback?: (element: number) => bool,
		context?: any): bool;
	any(
		list: number[],
		callback?: (element: number, index: number) => bool,
		context?: any): bool;
	any(
		list: number[],
		callback?: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;
	any(
		list: any[],
		callback?: (element: any) => bool,
		context?: any): bool;
	any(
		list: any[],
		callback?: (element: any, index: number) => bool,
		context?: any): bool;
	any(
		list: any[],
		callback?: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'any'.
	**/
	some(
		list: string,
		callback: (element: string) => bool,
		context?: any): bool;
	some(
		list: string,
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	some(
		list: string,
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
	some(
		list: string[],
		callback: (element: string) => bool,
		context?: any): bool;
	some(
		list: string[],
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	some(
		list: string[],
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;
	some(
		list: number[],
		callback: (element: number) => bool,
		context?: any): bool;
	some(
		list: number[],
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	some(
		list: number[],
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;
	some(
		list: any[],
		callback: (element: any) => bool,
		context?: any): bool;
	some(
		list: any[],
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	some(
		list: any[],
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	**/
	contains(list: string, value: string, fromIndex?: number): bool;
	contains(list: string[], value: string, fromIndex?: number): bool;
	contains(list: number[], value: number, fromIndex?: number): bool;
	contains(list: any[], value: any, fromIndex?: number): bool;

	/**
	* Alias for 'contains'.
	**/
	include(list: string, value: string, fromIndex?: number): bool;
	include(list: string[], value: string, fromIndex?: number): bool;
	include(list: number[], value: number, fromIndex?: number): bool;
	include(list: any[], value: any, fromIndex?: number): bool;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	**/
	invoke(list: string, methodName: string, ...arguments: any[]): void;
	invoke(list: string[], methodName: string, ...arguments: any[]): void;
	invoke(list: number[], methodName: string, ...arguments: any[]): void;
	invoke(list: any[], methodName: string, ...arguments: any[]): void;

	/**
	* A convenient version of what is perhaps the most common use-case for map: extracting a list of
	* property values.
	**/
	pluck(list: any[], propertyName: string): any[];

	/**
	* Returns the maximum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	max(list: number[]): number;
	max(
		list: string,
		callback: (element: string) => number,
		context?: any): string;
	max(
		list: string,
		callback: (element: string, index: number) => number,
		context?: any): string;
	max(
		list: string,
		callback: (element: string, index: number, list: string) => number,
		context?: any): string;
	max(
		list: string[],
		callback: (element: string) => number,
		context?: any): string;
	max(
		list: string[],
		callback: (element: string, index: number) => number,
		context?: any): string;
	max(
		list: string[],
		callback: (element: string, index: number, list: string[]) => number,
		context?: any): string;
	max(
		list: any[],
		callback: (element: any) => number,
		context?: any): any;
	max(
		list: any[],
		callback: (element: any, index: number) => number,
		context?: any): any;
	max(
		list: any[],
		callback: (element: any, index: number, list: any[]) => number,
		context?: any): any;

	/**
	* Returns the minimum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	min(list: number[]): number;
	min(
		list: string,
		callback: (element: string) => number,
		context?: any): string;
	min(
		list: string,
		callback: (element: string, index: number) => number,
		context?: any): string;
	min(
		list: string,
		callback: (element: string, index: number, list: string) => number,
		context?: any): string;
	min(
		list: string[],
		callback: (element: string) => number,
		context?: any): string;
	min(
		list: string[],
		callback: (element: string, index: number) => number,
		context?: any): string;
	min(
		list: string[],
		callback: (element: string, index: number, list: any[]) => number,
		context?: any): string;
	min(
		list: any[],
		callback: (obj: any) => number,
		context?: any): any;
	min(
		list: any[],
		callback: (obj: any, index: number) => number,
		context?: any): any;
	min(
		list: any[],
		callback: (obj: any, index: number, list: any[]) => number,
		context?: any): any;

	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through callback. callback may also be the string name of the property to sort by (eg. length).
	**/
	sortBy(
		list: string,
		callback: (element: string) => number,
		context?: any): string[];
	sortBy(
		list: string,
		callback: (element: string, index: number) => number,
		context?: any): string[];
	sortBy(
		list: string,
		callback: (element: string, index: number, list: string) => number,
		context?: any): string[];
	sortBy(
		list: string[],
		callback: (element: string) => number,
		context?: any): string[];
	sortBy(
		list: string[],
		callback: (element: string, index: number) => number,
		context?: any): string[];
	sortBy(
		list: string[],
		callback: (element: string, index: number, list: string[]) => number,
		context?: any): string[];
	sortBy(
		list: number[],
		callback: (element: number) => number,
		context?: any): number[];
	sortBy(
		list: number[],
		callback: (element: number, index: number) => number,
		context?: any): number[];
	sortBy(
		list: number[],
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	sortBy(
		list: any[],
		callback: (element: any) => number,
		context?: any): any[];
	sortBy(
		list: any[],
		callback: (element: any, index: number) => number,
		context?: any): any[];
	sortBy(
		list: any[],
		callback: (element: any, index: number, list: any[]) => number,
		context?: any): any[];
	sortBy(
		list: string[],
		callback: string,
		context?: any): string[];
	sortBy(
		list: number[],
		callback: string,
		context?: any): number[];
	sortBy(
		list: any[],
		callback: string,
		context?: any): any[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through callback.
	* If callback is a string instead of a function, groups by the property named by callback on
	* each of the values.
	**/
	groupBy(
		list: string,
		callback: (element: string) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: string[],
		callback: (element: string) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: number[],
		callback: (element: number) => string,
		context?: any): { [key: string]: number[]; };
	groupBy(
		list: number[],
		callback: (element: number, index: number) => string,
		context?: any): { [key: string]: number[]; };
	groupBy(
		list: number[],
		callback: (element: number, index: number, list: number[]) => string,
		context?: any): { [key: string]: number[]; };
	groupBy(
		list: any[],
		callback: (element: any) => string,
		context?: any): { [key: string]: any[]; };
	groupBy(
		list: any[],
		callback: (element: any, index: number) => string,
		context?: any): { [key: string]: any[]; };
	groupBy(
		list: any[],
		callback: (element: any, index: number, list: any[]) => string,
		context?: any): { [key: string]: any[]; };
	groupBy(
		list: string[],
		callback: string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		list: number[],
		callback: string,
		context?: any): { [key: string]: number[]; };
	groupBy(
		list: any[],
		callback: string,
		context?: any): { [key: string]: any[]; };

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	**/
	countBy(
		list: string,
		callback: (element: string) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: string,
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: string,
		callback: (element: string, index: number, list: string) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: string[],
		callback: (element: string) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: string[],
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: string[],
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: number[],
		callback: (element: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: number[],
		callback: (element: number, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: number[],
		callback: (element: number, index: number, list: number[]) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: any[],
		callback: (element: any) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: any[],
		callback: (element: any, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: any[],
		callback: (element: any, index: number, list: any[]) => string,
		context?: any): { [key: string]: number; };
	countBy(
		list: string[],
		callback: string,
		context?: any): { [key: string]: number; };
	countBy(
		list: number[],
		callback: string,
		context?: any): { [key: string]: number; };
	countBy(
		list: any[],
		callback: string,
		context?: any): { [key: string]: number; };

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	**/
	shuffle(list: string): string;
	shuffle(list: string[]): string[];
	shuffle(list: number[]): number[];
	shuffle(list: any[]): any[];

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	**/
	toArray(list: any): any[];

	/**
	* Return the number of values in the list.
	**/
	size(list: any): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	**/
	first(array: string): string;
	first(array: string, n: number): string;
	first(array: string[]): string;
	first(array: string[], n: number): string[];
	first(array: number[]): number;
	first(array: number[], n: number): number[];
	first(array: any[]): any;
	first(array: any[], n: number): any[];

	/**
	* Alias for 'first'.
	**/
	head(array: string): string;
	head(array: string, n: number): string;
	head(array: string[]): string;
	head(array: string[], n: number): string[];
	head(array: number[]): number;
	head(array: number[], n: number): number[];
	head(array: any[]): any;
	head(array: any[], n: number): any[];

	/**
	* Alias for 'first'.
	**/
	take(array: string): string;
	take(array: string, n: number): string;
	take(array: string[]): string;
	take(array: string[], n: number): string[];
	take(array: number[]): number;
	take(array: number[], n: number): number[];
	take(array: any[]): any;
	take(array: any[], n: number): any[];

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	**/
	initial(array: string, n?: number): string;
	initial(array: string[], n?: number): string[];
	initial(array: number[], n?: number): number[];
	initial(array: any[], n?: number): any[];

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	**/
	last(array: string): string;
	last(array: string, n: number): string;
	last(array: string[]): string;
	last(array: string[], n: number): string[];
	last(array: number[]): number;
	last(array: number[], n: number): number[];
	last(array: any[]): any;
	last(array: any[], n: number): any[];

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	**/
	rest(array: string, index: number): string;
	rest(array: string[], index: number): string[];
	rest(array: number[], index: number): number[];
	rest(array: any[], index: number): any[];

	/**
	* Alias for 'rest'.
	**/
	tail(array: string, index: number): string;
	tail(array: string[], index: number): string[];
	tail(array: number[], index: number): number[];
	tail(array: any[], index: number): any[];

	/**
	* Alias for 'rest'.
	**/
	drop(array: string, index: number): string;
	drop(array: string[], index: number): string[];
	drop(array: number[], index: number): number[];
	drop(array: any[], index: number): any[];

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	**/
	compact(array: string): string;
	compact(array: string[]): string[];
	compact(array: number[]): number[];
	compact(array: bool[]): bool[];
	compact(array: any[]): any[];

	/**
	* Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will
	* only be flattened a single level.
	**/
	flatten(array: string[], shallow?: bool): string[];
	flatten(array: string[][], shallow?: bool): string[];
	flatten(array: number[], shallow?: bool): number[];
	flatten(array: number[][], shallow?: bool): number[];
	flatten(array: any[], shallow?: bool): any[];
	flatten(array: any[][], shallow?: bool): any[];

	/**
	* Returns a copy of the array with all instances of the values removed.
	**/
	without(array: string, ...values: string[]): string;
	without(array: string[], ...values: string[]): string[];
	without(array: number[], ...values: number[]): number[];
	without(array: any[], ...values: any[]): any[];

	/**
	* Computes the union of the passed-in arrays: the list of unique items, in order, that are
	* present in one or more of the arrays.
	**/
	union(...arrays: string[][]): string[];
	union(...arrays: number[][]): number[];
	union(...arrays: any[][]): any[];

	/**
	* Computes the list of values that are the intersection of all the arrays. Each value in the result
	* is present in each of the arrays.
	**/
	intersection(...arrays: string[][]): string[];
	intersection(...arrays: number[][]): number[];
	intersection(...arrays: any[][]): any[];

	/**
	* Similar to without, but returns the values from array that are not present in the other arrays.
	**/
	difference(array: string, ...others: string[]): string;
	difference(array: string[], ...others: string[]): string[];
	difference(array: number[], ...others: number[]): number[];
	difference(array: any[], ...others: any[]): any[];

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an callback function.
	**/
	uniq(array: string, isSorted?: bool, callback?: (element: string) => string): string[];
	uniq(array: string, isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	uniq(array: string, isSorted?: bool, callback?: (element: string, index: number, list: string) => string): string[];
	uniq(array: string[], isSorted?: bool, callback?: (element: string) => string): string[];
	uniq(array: string[], isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	uniq(array: string[], isSorted?: bool, callback?: (element: string, index: number, list: string[]) => string): string[];
	uniq(array: number[], isSorted?: bool, callback?: (element: number) => number): number[];
	uniq(array: number[], isSorted?: bool, callback?: (element: number, index: number) => number): number[];
	uniq(array: number[], isSorted?: bool, callback?: (element: number, index: number, list: number[]) => number): number[];
	uniq(array: any[], isSorted?: bool, callback?: (element: any) => any): any[];
	uniq(array: any[], isSorted?: bool, callback?: (element: any, index: number) => any): any[];
	uniq(array: any[], isSorted?: bool, callback?: (element: any, index: number, list: any[]) => any): any[];

	/**
	* Alias for 'uniq'.
	**/
	unique(array: string, isSorted?: bool, callback?: (element: string) => string): string[];
	unique(array: string, isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	unique(array: string, isSorted?: bool, callback?: (element: string, index: number, list: string) => string): string[];
	unique(array: string[], isSorted?: bool, callback?: (element: string) => string): string[];
	unique(array: string[], isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	unique(array: string[], isSorted?: bool, callback?: (element: string, index: number, list: string[]) => string): string[];
	unique(array: number[], isSorted?: bool, callback?: (element: number) => number): number[];
	unique(array: number[], isSorted?: bool, callback?: (element: number, index: number) => number): number[];
	unique(array: number[], isSorted?: bool, callback?: (element: number, index: number, list: number[]) => number): number[];
	unique(array: any[], isSorted?: bool, callback?: (element: any) => any): any[];
	unique(array: any[], isSorted?: bool, callback?: (element: any, index: number) => any): any[];
	unique(array: any[], isSorted?: bool, callback?: (element: any, index: number, list: any[]) => any): any[];

	/**
	* Merges together the values of each of the arrays with the values at the corresponding position.
	* Useful when you have separate data sources that are coordinated through matching array indexes.
	* If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
	**/
	zip(...arrays: string[][]): string[][];
	zip(...arrays: number[][]): number[][];
	zip(...arrays: any[][]): any[][];

	/**
	* Converts arrays into objects. Pass either a single list of [key, value] pairs, or a
	* list of keys, and a list of values.
	**/
	object(keys: string[], values: any[]): any;
	object(...keyValuePairs: any[][]): any;

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	**/
	indexOf(array: string, value: string, isSorted?: bool): number;
	indexOf(array: string[], value: string, isSorted?: bool): number;
	indexOf(array: number[], value: number, isSorted?: bool): number;
	indexOf(array: any[], value: any, isSorted?: bool): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	**/
	lastIndexOf(array: string, value: string, from?: number): number;
	lastIndexOf(array: string[], value: string, from?: number): number;
	lastIndexOf(array: number[], value: number, from?: number): number;
	lastIndexOf(array: any[], value: any, from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an callback is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	**/
	sortedIndex(list: string, value: string, callback?: (element: string) => number): number;
	sortedIndex(list: string[], value: string, callback?: (element: string) => number): number;
	sortedIndex(list: number[], value: number, callback?: (element: number) => number): number;
	sortedIndex(list: any[], value: any, callback?: (element: any) => number): number;

	/**
	* A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted,
	* defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented)
	* by step, exclusive.
	**/
	range(start: number, stop: number, step?: number): number[];
	// If start is not specified the implementation will never pull the step (step = arguments[2] || 0)
	range(stop: number): number[];

	/************
	* Functions *
	*************/

	/**
	* Bind a function to an object, meaning that whenever the function is called, the value of this will
	* be the object. Optionally, bind arguments to the function to pre-fill them, also known as partial application.
	**/
	bind(fn: Function, object: any, ...arguments: any[]): Function;
	
	/**
	* Creates a function that, when called, invokes the method at object[key] and prepends any additional bindKey arguments
	* to those passed to the bound function. This method differs from _.bind by allowing bound functions to reference methods
	* that will be redefined or don't yet exist. See http://michaux.ca/articles/lazy-function-definition-pattern.
	**/
	bindKey(object: any, key: string, ...arguments: any[]): Function;

	/**
	* Binds a number of methods on the object, specified by methodNames, to be run in the context of that object
	* whenever they are invoked. Very handy for binding functions that are going to be used as event handlers,
	* which would otherwise be invoked with a fairly useless this. If no methodNames are provided, all of the
	* object's function properties will be bound to it.
	**/
	bindAll(object: any, ...methodNames: string[]): void;
	
	/**
	* Creates a function that, when called, invokes func with any additional partial arguments prepended to those passed to the new
	* function. This method is similar to bind, except it does not alter the this binding.
	**/
	partial(fn: Function, ...arguments: any[]): Function;

	/**
	* Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations.
	* If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based
	* on the arguments to the original function. The default hashFunction just uses the first argument to the
	* memoized function as the key.
	**/
	memoize(fn: Function, hashFn?: (n: any) => string): Function;

	/**
	* Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments,
	* they will be forwarded on to the function when it is invoked.
	**/
	delay(fn: Function, waitMS: number, ...arguments: any[]): void;

	/**
	* Defers invoking the function until the current call stack has cleared, similar to using setTimeout
	* with a delay of 0. Useful for performing expensive computations or HTML rendering in chunks without
	* blocking the UI thread from updating. If you pass the optional arguments, they will be forwarded on
	* to the function when it is invoked.
	**/
	defer(fn: Function, ...arguments: any[]): void;

	/**
	* Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly,
	* will only actually call the original function at most once per every wait milliseconds. Useful for
	* rate-limiting events that occur faster than you can keep up with.
	**/
	throttle(fn: Function, waitMS: number): Function;

	/**
	* Creates and returns a new debounced version of the passed function that will postpone its execution
	* until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing
	* behavior that should only happen after the input has stopped arriving. For example: rendering a preview
	* of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.
	*
	* Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead
	* of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double
	*-clicks on a "submit" button from firing a second time.
	**/
	debounce(fn: Function, waitMS: number, immediate?: bool): Function;

	/**
	* Creates a version of the function that can only be called one time. Repeated calls to the modified
	* function will have no effect, returning the value from the original call. Useful for initialization
	* functions, instead of having to set a boolean flag and then check it later.
	**/
	once(fn: Function): Function;

	/**
	* Creates a version of the function that will only be run after first being called count times. Useful
	* for grouping asynchronous responses, where you want to be sure that all the async calls have finished,
	* before proceeding.
	**/
	after(count: number, fn: Function): Function;

	/**
	* Wraps the first function inside of the wrapper function, passing it as the first argument. This allows
	* the wrapper to execute code before and after the function runs, adjust the arguments, and execute it
	* conditionally.
	**/
	wrap(fn: Function, wrapper: (fn: Function, ...args: any[]) => any): Function;

	/**
	* Returns the composition of a list of functions, where each function consumes the return value of the
	* function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).
	**/
	compose(...functions: Function[]): Function;

	/**********
	* Objects *
	***********/

	/**
	* Retrieve all the names of the object's properties.
	**/
	keys(object: any): string[];

	/**
	* Return all of the values of the object's properties.
	**/
	values(object: any): any[];

	/**
	* Convert an object into a list of [key, value] pairs.
	**/
	pairs(object: any): any[][];

	/**
	* Returns a copy of the object where the keys have become the values and the values the keys.
	* For this to work, all of your object's values should be unique and string serializable.
	**/
	invert(object: any): any;

	/**
	* Returns a sorted list of the names of every method in an object — that is to say,
	* the name of every function property of the object.
	**/
	functions(object: any): string[];

	/**
	* Copy all of the properties in the source objects over to the destination object, and return
	* the destination object. It's in-order, so the last source will override properties of the
	* same name in previous arguments.
	**/
	extend(destination: any, ...sources: any[]): any;

	/**
	* Merges enumerable properties of the source object(s) into the destination object. Subsequent sources
	will overwrite propery assignments of previous sources.
	**/
	merge(destination: any, ...sources: any[]): any;

	/**
	* Return a copy of the object, filtered to only have values for the whitelisted keys
	* (or array of valid keys).
	**/
	pick(object: any, ...keys: string[]): any;
	pick(
		object: any, 
		callback: (element: string) => any,
		context?: any): void;
	pick(
		object: any,
		callback: (element: string, index: number) => any,
		context?: any): void;
	pick(
		object: any,
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
	**/
	omit(object: any, ...keys: string[]): any;
	omit(
		object: any, 
		callback: (element: string) => any,
		context?: any): void;
	omit(
		object: any,
		callback: (element: string, index: number) => any,
		context?: any): void;
	omit(
		object: any,
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Fill in null and undefined properties in object with values from the defaults objects,
	* and return the object. As soon as the property is filled, further defaults will have no effect.
	**/
	defaults(object: any, ...defaults: any[]): any;

	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	**/
	clone(object: any, deep?: bool): any;
	clone(list: string[], deep?: bool): string[];
	clone(list: number[], deep?: bool): number[];
	clone(list: any[], deep?: bool): any[];
	
	/**
	* Creates a deep clone of value. Functions and DOM nodes are not cloned. The enumerable properties
	* of arguments objects and objects created by constructors other than Object are cloned to plain Object objects.
	**/
	cloneDeep(object: any): any;
	cloneDeep(list: string[]): string[];
	cloneDeep(list: number[]): number[];
	cloneDeep(list: any[]): any[];

	/**
	* Invokes interceptor with the object, and then returns object. The primary purpose of this method
	* is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.
	**/
	tap(object: any, intercepter: Function): any;

	/**
	* Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe
	* reference to the hasOwnProperty function, in case it's been overridden accidentally.
	**/
	has(object: any, key: string): bool;

	/**
	* Performs an optimized deep comparison between the two objects,
	* to determine if they should be considered equal.
	**/
	isEqual(object: any, other: any): bool;

	/**
	* Returns true if object contains no values.
	**/
	isEmpty(object: any): bool;
	isEmpty(list: any[]): bool;

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(object: any): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(object: any): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(object: any): bool;
	
	/**
	* Checks if a given value is an object created by the Object constructor.
	**/
	isPlainObject(object: any): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(object: any): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(object: any): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(object: any): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(object: any): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(object: any): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(object: any): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(object: any): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(object: any): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(object: any): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(object: any): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(object: any): bool;

	/**********
	* Utility *
	***********/

	/**
	* Give control of the "_" variable back to its previous owner.
	* Returns a reference to the Underscore object.
	**/
	noConflict(): ILodash;

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(value: string): string;
	identity(value: string[]): string[];
	identity(value: number): number;
	identity(value: number[]): number[];
	identity(value: bool): bool;
	identity(value: any): any;

	/**
	* Invokes the given callback function n times.
	* Each invocation of callback is called with an index argument.
	* @example
	*
	* _(3).times(function(n){ genie.grantWishNumber(n); });
	*
	**/
	times(n: number, callback: (n: number) => void , context?: any): void;

	/**
	* Returns a random integer between min and max, inclusive. If you only pass one argument,
	* it will return a number between 0 and that number.
	**/
	random(max: number): number;
	random(min: number, max: number): number;

	/**
	* Allows you to extend Underscore with your own utility functions. Pass a hash of
	* {name: function} definitions to have your functions added to the Underscore object,
	* as well as the OOP wrapper.
	* @example
	*
	* _.mixin({
	*     capitalize : function(string) {
	*         return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	*     }
	* });
	* _("fabio").capitalize();
	* => "Fabio"
	*
	**/
	mixin(object: any): void;

	/**
	* Generate a globally-unique id for client-side models or DOM elements that need one.
	* If prefix is passed, the id will be appended to it. Without prefix, returns an integer.
	**/
	uniqueId(): number;
	uniqueId(prefix: string): string;

	/**
	* Escapes a string for insertion into HTML, replacing &, <, >, ", ', and / characters.
	**/
	escape(str: string): string;

	/**
	* If the value of the named property is a function then invoke it; otherwise, return it.
	**/
	result(object: any, property: string): any;

	/**
	* Compiles JavaScript templates into functions that can be evaluated for rendering. Useful
	* for rendering complicated bits of HTML from JSON data sources. Template functions can both
	* interpolate variables, using <%= … %>, as well as execute arbitrary JavaScript code, with
	* <% … %>. If you wish to interpolate a value, and have it be HTML-escaped, use <%- … %> When
	* you evaluate a template function, pass in a data object that has properties corresponding to
	* the template's free variables. If you're writing a one-off, you can pass the data object as
	* the second parameter to template in order to render immediately instead of returning a template
	* function. The settings argument should be a hash containing any _.templateSettings that should
	* be overridden.
	**/
	template(templateString: string, data?: any, settings?: UnderscoreTemplateSettings): any;

	// By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	templateSettings: UnderscoreTemplateSettings;

	/***********
	* Chaining *
	************/

	/**
	* Returns a wrapped object. Calling methods on this object will continue to return wrapped objects
	* until value is used.
	**/
	chain(obj: any): any;

	/**
	* Extracts the value of a wrapped object.
	**/
	value(s: string): string;
	value(n: number): number;
	value(s: string[]): string[];
	value(n: number[]): number[];
	value(obj: any): any;
	value(obj: any[]): any[];

	/**************
	* OOP Wrapper *
	**************/
	(key: string): UnderscoreStringOOPWrapper;
	(list: string[]): UnderscoreStringArrayOOPWrapper;
	(n: number): UnderscoreNumberOOPWrapper;
	(list: number[]): UnderscoreNumberArrayOOPWrapper;
	(obj: any): UnderscoreObjectOOPWrapper;
	(list: any[]): UnderscoreObjectArrayOOPWrapper;
}

/**
* underscore.js template settings, set templateSettings or pass as an argument 
* to 'template()' to overide defaults.
**/
interface UnderscoreTemplateSettings {
	evaluate?: RegExp;
	interpolate?: RegExp;
	escape?: RegExp;
}

/**
* Returned interface when calling the Underscore String OOP Wrapper.  All "string" functions are
* available except the first argument is missing since that is the object being wrapped.
*
* If a function only works on lists then it is not included.
**/
interface UnderscoreStringOOPWrapper {
	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	each(
		callback: (element: string) => any,
		context?: any): void;
	each(
		callback: (element: string, index: number) => any,
		context?: any): void;
	each(
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	forEach(
		callback: (element: string) => any,
		context?: any): void;
	forEach(
		callback: (element: string, index: number) => any,
		context?: any): void;
	forEach(
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;

	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	forIn(
		callback: (element: string) => any,
		context?: any): void;
	forIn(
		callback: (element: string, index: number) => any,
		context?: any): void;
	forIn(
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	forOwn(
		callback: (element: string) => any,
		context?: any): void;
	forOwn(
		callback: (element: string, index: number) => any,
		context?: any): void;
	forOwn(
		callback: (element: string, index: number, list: string) => any,
		context?: any): void;
		
	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	map(
		callback: (element: string) => string,
		context?: any): string[];
	map(
		callback: (element: string, index: number) => string,
		context?: any): string[];
	map(
		callback: (element: string, index: number, list: string) => string,
		context?: any): string[];

	/**
	* Alias for 'map'.
	**/
	collect(
		callback: (element: string) => string,
		context?: any): string[];
	collect(
		callback: (element: string, index: number) => string,
		context?: any): string[];
	collect(
		callback: (element: string, index: number, list: string) => string,
		context?: any): string[];

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by callback. The callback is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	**/
	reduce(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduce(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduce(
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;

	/**
	* Alias for 'reduce'.
	**/
	inject(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	inject(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	inject(
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;

	/**
	* Alias for 'reduce'.
	**/
	foldl(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldl(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldl(
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	**/
	reduceRight(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;

	/**
	* Alias for 'reduceRight'.
	**/
	foldr(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldr(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldr(
		callback: (memo: string, element: string, index: number, list: string) => string,
		memo: string,
		context?: any): string;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (callback). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	**/
	find(
		callback: (element: string) => bool,
		context?: any): string;
	find(
		callback: (element: string, index: number) => bool,
		context?: any): string;
	find(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string;

	/**
	* Alias for 'find'.
	**/
	detect(
		callback: (element: string) => bool,
		context?: any): string;
	detect(
		callback: (element: string, index: number) => bool,
		context?: any): string;
	detect(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string;


	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (callback). Delegates to the native filter method, if it exists.
	**/
	filter(
		callback: (element: string) => bool,
		context?: any): string[];
	filter(
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	filter(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];

	/**
	* Alias for 'filter'.
	**/
	select(
		callback: (element: string) => bool,
		context?: any): string[];
	select(
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	select(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];


	/**
	* Returns the values in list without the elements that the truth test (callback) passes.
	* The opposite of filter.
	**/
	reject(
		callback: (element: string) => bool,
		context?: any): string[];
	reject(
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	reject(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): string[];

	/**
	* Returns true if all of the values in the list pass the callback truth test. Delegates to the
	* native method every, if present.
	**/
	all(
		callback: (element: string) => bool,
		context?: any): bool;
	all(
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	all(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;

	/**
	* Alias for 'all'.
	**/
	every(
		callback: (element: string) => bool,
		context?: any): bool;
	every(
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	every(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;

	/**
	* Returns true if any of the values in the list pass the callback truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	**/
	any(
		callback?: (element: string) => bool,
		context?: any): bool;
	any(
		callback?: (element: string, index: number) => bool,
		context?: any): bool;
	any(
		callback?: (element: string, index: number, list: string) => bool,
		context?: any): bool;

	/**
	* Alias for 'any'.
	**/
	some(
		callback: (element: string) => bool,
		context?: any): bool;
	some(
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	some(
		callback: (element: string, index: number, list: string) => bool,
		context?: any): bool;
		
	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	**/
	contains(value: string, fromIndex?: number): bool;

	/**
	* Alias for 'contains'.
	**/
	include(value: string, fromIndex?: number): bool;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	**/
	invoke(methodName: string, ...arguments: any[]): void;


	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through callback. callback may also be the string name of the property to sort by (eg. length).
	**/
	sortBy(
		callback: (element: string) => number,
		context?: any): string[];
	sortBy(
		callback: (element: string, index: number) => number,
		context?: any): string[];
	sortBy(
		callback: (element: string, index: number, list: string) => number,
		context?: any): string[];
	sortBy(callback: string, context?: any): string[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through callback.
	* If callback is a string instead of a function, groups by the property named by callback on
	* each of the values.
	**/
	groupBy(
		callback: (element: string) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		callback: (element: string, index: number, list: string) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(callback: string, context?: any): { [key: string]: string[]; };

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	**/
	countBy(
		callback: (element: string) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: string, index: number, list: string) => string,
		context?: any): { [key: string]: number; };
	countBy(callback: string, context?: any): { [key: string]: number; };

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	**/
	shuffle(): string;

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	**/
	toArray(): string;

	/**
	* Return the number of values in the list.
	**/
	size(): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	**/
	first(): string;
	first(n: number): string;

	/**
	* Alias for 'first'.
	**/
	head(): string;
	head(n: number): string;

	/**
	* Alias for 'first'.
	**/
	take(): string;
	take(n: number): string;

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	**/
	initial(n?: number): string;

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	**/
	last(): string;
	last(n: number): string;

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	**/
	rest(index: number): string;

	/**
	* Alias for 'rest'.
	**/
	tail(index: number): string;

	/**
	* Alias for 'rest'.
	**/
	drop(index: number): string;

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	**/
	compact(): string;

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an callback function.
	**/
	uniq(isSorted?: bool, callback?: (element: string) => string): string;
	uniq(isSorted?: bool, callback?: (element: string, index: number) => string): string;
	uniq(isSorted?: bool, callback?: (element: string, index: number, list: string) => string): string;

	/**
	* Alias for 'uniq'.
	**/
	unique(isSorted?: bool, callback?: (element: string) => string): string;
	unique(isSorted?: bool, callback?: (element: string, index: number) => string): string;
	unique(isSorted?: bool, callback?: (element: string, index: number, list: string) => string): string;

	/**
	* Converts arrays into objects. Pass either a single list of [key, value] pairs, or a
	* list of keys, and a list of values.
	**/
	object(values: any[]): any;

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	**/
	indexOf(value: string, isSorted?: bool): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	**/
	lastIndexOf(value: string, from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an callback is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	**/
	sortedIndex(value: string, callback?: (element: string) => number): number;

	/**
	* Returns the maximum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	max(
		callback: (element: string) => number,
		context?: any): string;
	max(
		callback: (element: string, index: number) => number,
		context?: any): string;
	max(
		callback: (element: string, index: number, list: string) => number,
		context?: any): string;

	/**
	* Returns the minimum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	min(
		callback: (obj: string) => number,
		context?: any): string;
	min(
		callback: (obj: string, index: number) => number,
		context?: any): string;
	min(
		callback: (obj: string, index: number, list: string) => number,
		context?: any): string;

	/*********
	* Arrays *
	**********/

	// There are no Array OOP wrappers for String

	/************
	* Functions *
	*************/

	// There are no Function OOP wrappers for String

	/**********
	* Objects *
	***********/

	// These don't seem entirely useful since it is known to be a string
	// but I have included them since they are all generic on "objects".

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(): bool;

	/**********
	* Utility *
	***********/

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(): string;


	/**
	* Generate a globally-unique id for client-side models or DOM elements that need one.
	* If prefix is passed, the id will be appended to it. Without prefix, returns an integer.
	**/
	uniqueId(): string;

	/**
	* Escapes a string for insertion into HTML, replacing &, <, >, ", ', and / characters.
	**/
	escape(): string;

	/**
	* Compiles JavaScript templates into functions that can be evaluated for rendering. Useful
	* for rendering complicated bits of HTML from JSON data sources. Template functions can both
	* interpolate variables, using <%= … %>, as well as execute arbitrary JavaScript code, with
	* <% … %>. If you wish to interpolate a value, and have it be HTML-escaped, use <%- … %> When
	* you evaluate a template function, pass in a data object that has properties corresponding to
	* the template's free variables. If you're writing a one-off, you can pass the data object as
	* the second parameter to template in order to render immediately instead of returning a template
	* function. The settings argument should be a hash containing any _.templateSettings that should
	* be overridden.
	**/
	template(data?: any, settings?: UnderscoreTemplateSettings): any;

	/***********
	* Chaining *
	************/

	// There are no Chaining OOP wrappers for String

	/**
	* Extracts the value of a wrapped object.
	**/
	value(): string;

	/**************
	* OOP Wrapper *
	**************/

	// There are no base OOP Wrappers for String
}

interface UnderscoreStringArrayOOPWrapper {
	
	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	each(
		callback: (element: string) => any,
		context?: any): void;
	each(
		callback: (element: string, index: number) => any,
		context?: any): void;
	each(
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	forEach(
		callback: (element: string) => any,
		context?: any): void;
	forEach(
		callback: (element: string, index: number) => any,
		context?: any): void;
	forEach(
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	forIn(
		callback: (element: string) => any,
		context?: any): void;
	forIn(
		callback: (element: string, index: number) => any,
		context?: any): void;
	forIn(
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	forOwn(
		callback: (element: string) => any,
		context?: any): void;
	forOwn(
		callback: (element: string, index: number) => any,
		context?: any): void;
	forOwn(
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;
		
	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	map(
		callback: (element: string) => string,
		context?: any): string[];
	map(
		callback: (element: string, index: number) => string,
		context?: any): string[];
	map(
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): string[];

	/**
	* Alias for 'map'.
	**/
	collect(
		callback: (element: string) => string,
		context?: any): string[];
	collect(
		callback: (element: string, index: number) => string,
		context?: any): string[];
	collect(
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): string[];

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by callback. The callback is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	**/
	reduce(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduce(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduce(
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;

	/**
	* Alias for 'reduce'.
	**/
	inject(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	inject(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	inject(
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;

	/**
	* Alias for 'reduce'.
	**/
	foldl(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldl(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldl(
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	**/
	reduceRight(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	reduceRight(
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;

	/**
	* Alias for 'reduceRight'.
	**/
	foldr(
		callback: (memo: string, element: string) => string,
		memo: string,
		context?: any): string;
	foldr(
		callback: (memo: string, element: string, index: number) => string,
		memo: string,
		context?: any): string;
	foldr(
		callback: (memo: string, element: string, index: number, list: string[]) => string,
		memo: string,
		context?: any): string;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (callback). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	**/
	find(
		callback: (element: string) => bool,
		context?: any): string;
	find(
		callback: (element: string, index: number) => bool,
		context?: any): string;
	find(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string;

	/**
	* Alias for 'find'.
	**/
	detect(
		callback: (element: string) => bool,
		context?: any): string;
	detect(
		callback: (element: string, index: number) => bool,
		context?: any): string;
	detect(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string;


	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (callback). Delegates to the native filter method, if it exists.
	**/
	filter(
		callback: (element: string) => bool,
		context?: any): string[];
	filter(
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	filter(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];

	/**
	* Alias for 'filter'.
	**/
	select(
		callback: (element: string) => bool,
		context?: any): string[];
	select(
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	select(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];


	/**
	* Returns the values in list without the elements that the truth test (callback) passes.
	* The opposite of filter.
	**/
	reject(
		callback: (element: string) => bool,
		context?: any): string[];
	reject(
		callback: (element: string, index: number) => bool,
		context?: any): string[];
	reject(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): string[];

	/**
	* Returns true if all of the values in the list pass the callback truth test. Delegates to the
	* native method every, if present.
	**/
	all(
		callback: (element: string) => bool,
		context?: any): bool;
	all(
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	all(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'all'.
	**/
	every(
		callback: (element: string) => bool,
		context?: any): bool;
	every(
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	every(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Returns true if any of the values in the list pass the callback truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	**/
	any(
		callback?: (element: string) => bool,
		context?: any): bool;
	any(
		callback?: (element: string, index: number) => bool,
		context?: any): bool;
	any(
		callback?: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'any'.
	**/
	some(
		callback: (element: string) => bool,
		context?: any): bool;
	some(
		callback: (element: string, index: number) => bool,
		context?: any): bool;
	some(
		callback: (element: string, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	**/
	contains(value: string, fromIndex?: number): bool;

	/**
	* Alias for 'contains'.
	**/
	include(value: string, fromIndex?: number): bool;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	**/
	invoke(methodName: string, ...arguments: any[]): void;


	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through callback. callback may also be the string name of the property to sort by (eg. length).
	**/
	sortBy(
		callback: (element: string) => number,
		context?: any): string[];
	sortBy(
		callback: (element: string, index: number) => number,
		context?: any): string[];
	sortBy(
		callback: (element: string, index: number, list: string[]) => number,
		context?: any): string[];
	sortBy(callback: string, context?: any): string[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through callback.
	* If callback is a string instead of a function, groups by the property named by callback on
	* each of the values.
	**/
	groupBy(
		callback: (element: string) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): { [key: string]: string[]; };
	groupBy(callback: string, context?: any): { [key: string]: string[]; };

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	**/
	countBy(
		callback: (element: string) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: string, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: string, index: number, list: string[]) => string,
		context?: any): { [key: string]: number; };
	countBy(callback: string, context?: any): { [key: string]: number; };

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	**/
	shuffle(): string[];

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	**/
	toArray(): string[];

	/**
	* Return the number of values in the list.
	**/
	size(): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	**/
	first(): string;
	first(n: number): string[];

	/**
	* Alias for 'first'.
	**/
	head(): string;
	head(n: number): string[];

	/**
	* Alias for 'first'.
	**/
	take(): string;
	take(n: number): string[];

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	**/
	initial(n?: number): string[];

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	**/
	last(): string;
	last(n: number): string[];

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	**/
	rest(index: number): string[];

	/**
	* Alias for 'rest'.
	**/
	tail(index: number): string[];

	/**
	* Alias for 'rest'.
	**/
	drop(index: number): string[];

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	**/
	compact(): string[];

	/**
	* Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will
	* only be flattened a single level.
	**/
	flatten(shallow?: bool): string[];

	/**
	* Returns a copy of the array with all instances of the values removed.
	**/
	without(...values: string[]): string[];

	/**
	* Computes the union of the passed-in arrays: the list of unique items, in order, that are
	* present in one or more of the arrays.
	**/
	union(...arrays: string[][]): string[];

	/**
	* Computes the list of values that are the intersection of all the arrays. Each value in the result
	* is present in each of the arrays.
	**/
	intersection(...arrays: string[][]): string[];

	/**
	* Similar to without, but returns the values from array that are not present in the other arrays.
	**/
	difference(...others: string[]): string[];

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an callback function.
	**/
	uniq(isSorted?: bool, callback?: (element: string) => string): string[];
	uniq(isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	uniq(isSorted?: bool, callback?: (element: string, index: number, list: string[]) => string): string[];

	/**
	* Alias for 'uniq'.
	**/
	unique(isSorted?: bool, callback?: (element: string) => string): string[];
	unique(isSorted?: bool, callback?: (element: string, index: number) => string): string[];
	unique(isSorted?: bool, callback?: (element: string, index: number, list: string[]) => string): string[];

	/**
	* Merges together the values of each of the arrays with the values at the corresponding position.
	* Useful when you have separate data sources that are coordinated through matching array indexes.
	* If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
	**/
	zip(...arrays: string[][]): string[][];

	/**
	* Converts arrays into objects. Pass either a single list of [key, value] pairs, or a
	* list of keys, and a list of values.
	**/
	object(values: any[]): any;

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	**/
	indexOf(value: string, isSorted?: bool): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	**/
	lastIndexOf(value: string, from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an callback is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	**/
	sortedIndex(value: string, callback?: (element: string) => number): number;
	
	/**
	* Returns the maximum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	max(
		callback: (element: string) => number,
		context?: any): string;
	max(
		callback: (element: string, index: number) => number,
		context?: any): string;
	max(
		callback: (element: string, index: number, list: string[]) => number,
		context?: any): string;

	/**
	* Returns the minimum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	min(
		callback: (obj: string) => number,
		context?: any): string;
	min(
		callback: (obj: string, index: number) => number,
		context?: any): string;
	min(
		callback: (obj: string, index: number, list: string[]) => number,
		context?: any): string;

	/************
	* Functions *
	*************/

	// There are no Function OOP Wrappers for String[]

	/**********
	* Objects *
	***********/
	
	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	**/
	clone(): string[];

	/**
	* Returns true if object contains no values.
	**/
	isEmpty(): bool;

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(): bool;

	/**********
	* Utility *
	***********/

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(value: string[]): string[];

	/***********
	* Chaining *
	************/

	/**
	* Extracts the value of a wrapped object.
	**/
	value(): string[];

	/**************
	* OOP Wrapper *
	**************/

	// There are no base OOP Wrappers for String[]
}

interface UnderscoreNumberOOPWrapper {
	
	/**************
	* Collections *
	***************/

	// There are no Collection OOP Wrappers for Number

	/*********
	* Arrays *
	**********/

	/**
	* A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted,
	* defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented)
	* by step, exclusive.
	**/
	// start is the OOP wrapped object
	range(stop: number, step?: number): number[];
	// stop is the OOP wrapped object, cannot have step provided in this case.
	range(): number[];

	/************
	* Functions *
	*************/

	/**
	* Creates a version of the function that will only be run after first being called count times. Useful
	* for grouping asynchronous responses, where you want to be sure that all the async calls have finished,
	* before proceeding.
	**/
	after(fn: Function): Function;

	/**********
	* Objects *
	***********/

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(): bool;

	/**********
	* Utility *
	***********/

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(value: number): number;

	/**
	* Invokes the given callback function n times.
	* Each invocation of callback is called with an index argument.
	* @example
	*
	* _(3).times(function(n){ genie.grantWishNumber(n); });
	*
	**/
	times(callback: (n: number) => void , context?: any): void;

	/**
	* Returns a random integer between min and max, inclusive. If you only pass one argument,
	* it will return a number between 0 and that number.
	**/
	// max is OOP wrapped
	random(): number;
	// min is OOP wrapped
	random(max: number): number;

	/***********
	* Chaining *
	************/

	/**
	* Extracts the value of a wrapped object.
	**/
	value(): number;

	/**************
	* OOP Wrapper *
	**************/

	// There are no base OOP Wrappers for Number
}

interface UnderscoreNumberArrayOOPWrapper {
	
	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	each(
		callback: (element: number) => any,
		context?: any): void;
	each(
		callback: (element: number, index: number) => any,
		context?: any): void;
	each(
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	forEach(
		callback: (element: number) => any,
		context?: any): void;
	forEach(
		callback: (element: number, index: number) => any,
		context?: any): void;
	forEach(
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;

	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	forIn(
		callback: (element: number) => any,
		context?: any): void;
	forIn(
		callback: (element: number, index: number) => any,
		context?: any): void;
	forIn(
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	forOwn(
		callback: (element: number) => any,
		context?: any): void;
	forOwn(
		callback: (element: number, index: number) => any,
		context?: any): void;
	forOwn(
		callback: (element: number, index: number, list: number[]) => any,
		context?: any): void;
	
	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	map(
		callback: (element: number) => number,
		context?: any): number[];
	map(
		callback: (element: number, index: number) => number,
		context?: any): number[];
	map(
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];

	/**
	* Alias for 'map'.
	**/
	collect(
		callback: (element: number) => number,
		context?: any): number[];
	collect(
		callback: (element: number, index: number) => number,
		context?: any): number[];
	collect(
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by callback. The callback is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	**/
	reduce(
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	reduce(
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	reduce(
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;

	/**
	* Alias for 'reduce'.
	**/
	inject(
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	inject(
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	inject(
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;

	/**
	* Alias for 'reduce'.
	**/
	foldl(
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	foldl(
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	foldl(
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	**/
	reduceRight(
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	reduceRight(
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	reduceRight(
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;

	/**
	* Alias for 'reduceRight'.
	**/
	foldr(
		callback: (memo: number, element: number) => number,
		memo: number,
		context?: any): number;
	foldr(
		callback: (memo: number, element: number, index: number) => number,
		memo: number,
		context?: any): number;
	foldr(
		callback: (memo: number, element: number, index: number, list: number[]) => number,
		memo: number,
		context?: any): number;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (callback). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	**/
	find(
		callback: (element: number) => bool,
		context?: any): number;
	find(
		callback: (element: number, index: number) => bool,
		context?: any): number;
	find(
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number;

	/**
	* Alias for 'find'.
	**/
	detect(
		callback: (element: number) => bool,
		context?: any): number;
	detect(
		callback: (element: number, index: number) => bool,
		context?: any): number;
	detect(
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number;


	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (callback). Delegates to the native filter method, if it exists.
	**/
	filter(
		callback: (element: number) => bool,
		context?: any): number[];
	filter(
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	filter(
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];

	/**
	* Alias for 'filter'.
	**/
	select(
		callback: (element: number) => bool,
		context?: any): number[];
	select(
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	select(
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];

	/**
	* Returns the values in list without the elements that the truth test (callback) passes.
	* The opposite of filter.
	**/
	reject(
		callback: (element: number) => bool,
		context?: any): number[];
	reject(
		callback: (element: number, index: number) => bool,
		context?: any): number[];
	reject(
		callback: (element: number, index: number, list: number[]) => bool,
		context?: any): number[];

	/**
	* Returns true if all of the values in the list pass the callback truth test. Delegates to the
	* native method every, if present.
	**/
	all(
		callback: (element: number) => bool,
		context?: any): bool;
	all(
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	all(
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'all'.
	**/
	every(
		callback: (element: number) => bool,
		context?: any): bool;
	every(
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	every(
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Returns true if any of the values in the list pass the callback truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	**/
	any(
		callback?: (element: number) => bool,
		context?: any): bool;
	any(
		callback?: (element: number, index: number) => bool,
		context?: any): bool;
	any(
		callback?: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'any'.
	**/
	some(
		callback: (element: number) => bool,
		context?: any): bool;
	some(
		callback: (element: number, index: number) => bool,
		context?: any): bool;
	some(
		callback: (element: number, index: number, list: string[]) => bool,
		context?: any): bool;

	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	**/
	contains(value: number, fromIndex?: number): bool;

	/**
	* Alias for 'contains'.
	**/
	include(value: number, fromIndex?: number): bool;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	**/
	invoke(methodName: string, ...arguments: any[]): void;

	/**
	* Returns the maximum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	max(): number;

	/**
	* Returns the minimum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	min(): number;

	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through callback. callback may also be the string name of the property to sort by (eg. length).
	**/
	sortBy(
		callback: (element: number) => number,
		context?: any): number[];
	sortBy(
		callback: (element: number, index: number) => number,
		context?: any): number[];
	sortBy(
		callback: (element: number, index: number, list: number[]) => number,
		context?: any): number[];
	sortBy(callback: string, context?: any): number[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through callback.
	* If callback is a string instead of a function, groups by the property named by callback on
	* each of the values.
	**/
	groupBy(
		callback: (element: number) => string,
		context?: any): { [key: string]: number[]; };
	groupBy(
		callback: (element: number, index: number) => string,
		context?: any): { [key: string]: number[]; };
	groupBy(
		callback: (element: number, index: number, list: number[]) => string,
		context?: any): { [key: string]: number[]; };
	groupBy(callback: string, context?: any): { [key: string]: number[]; };

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	**/
	countBy(
		callback: (element: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: number, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: number, index: number, list: number[]) => string,
		context?: any): { [key: string]: number; };
	countBy(callback: string, context?: any): { [key: string]: number; };

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	**/
	shuffle(): number[];

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	**/
	toArray(): number[];

	/**
	* Return the number of values in the list.
	**/
	size(): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	**/
	first(): number;
	first(n: number): number[];

	/**
	* Alias for 'first'.
	**/
	head(): number;
	head(n: number): number[];

	/**
	* Alias for 'first'.
	**/
	take(): number;
	take(n: number): number[];

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	**/
	initial(n?: number): number[];

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	**/
	last(): number;
	last(n: number): number[];

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	**/
	rest(index: number): number[];

	/**
	* Alias for 'rest'.
	**/
	tail(index: number): number[];

	/**
	* Alias for 'rest'.
	**/
	drop(index: number): number[];

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	**/
	compact(): number[];

	/**
	* Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will
	* only be flattened a single level.
	**/
	flatten(shallow?: bool): number[];

	/**
	* Returns a copy of the array with all instances of the values removed.
	**/
	without(...values: number[]): number[];

	/**
	* Computes the union of the passed-in arrays: the list of unique items, in order, that are
	* present in one or more of the arrays.
	**/
	union(...arrays: number[][]): number[];

	/**
	* Computes the list of values that are the intersection of all the arrays. Each value in the result
	* is present in each of the arrays.
	**/
	intersection(...arrays: number[][]): number[];

	/**
	* Similar to without, but returns the values from array that are not present in the other arrays.
	**/
	difference(...others: number[]): number[];

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an callback function.
	**/
	uniq(isSorted?: bool, callback?: (element: number) => number): number[];
	uniq(isSorted?: bool, callback?: (element: number, index: number) => number): number[];
	uniq(isSorted?: bool, callback?: (element: number, index: number, list: number[]) => number): number[];

	/**
	* Alias for 'uniq'.
	**/
	unique(isSorted?: bool, callback?: (element: number) => number): number[];
	unique(isSorted?: bool, callback?: (element: number, index: number) => number): number[];
	unique(isSorted?: bool, callback?: (element: number, index: number, list: number[]) => number): number[];

	/**
	* Merges together the values of each of the arrays with the values at the corresponding position.
	* Useful when you have separate data sources that are coordinated through matching array indexes.
	* If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
	**/
	zip(...arrays: number[][]): number[][];

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	**/
	indexOf(value: number, isSorted?: bool): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	**/
	lastIndexOf(value: number, from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an callback is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	**/
	sortedIndex(value: number, callback?: (element: number) => number): number;

	/************
	* Functions *
	*************/

	// There are no Function OOP Wrappers for Number[]

	/**********
	* Objects *
	***********/
	
	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	**/
	clone(): number[];

	/**
	* Returns true if object contains no values.
	**/
	isEmpty(): bool;

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(): bool;

	/**********
	* Utility *
	***********/

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(): number[];

	/***********
	* Chaining *
	************/

	/**
	* Extracts the value of a wrapped object.
	**/
	value(): number[];

	/**************
	* OOP Wrapper *
	**************/

	// There are no base OOP Wrappers for Number[]
}

interface UnderscoreObjectOOPWrapper {
	
	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	each(
		callback: (value: any) => any,
		context?: any): void;
	each(
		callback: (value: any, key?: string) => any,
		context?: any): void;
	each(
		callback: (value: any, key?: string, object?: any) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	forEach(
		callback: (value: any) => any,
		context?: any): void;
	forEach(
		callback: (value: any, key?: string) => any,
		context?: any): void;
	forEach(
		callback: (value: any, key?: string, object?: any) => any,
		context?: any): void;

	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	forIn(
		callback: (value: any) => any,
		context?: any): void;
	forIn(
		callback: (value: any, key?: string) => any,
		context?: any): void;
	forIn(
		callback: (value: any, key?: string, object?: any) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	forOwn(
		callback: (value: any) => any,
		context?: any): void;
	forOwn(
		callback: (value: any, key?: string) => any,
		context?: any): void;
	forOwn(
		callback: (value: any, key?: string, object?: any) => any,
		context?: any): void;
	
	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	map(
		callback: (value: any) => any,
		context?: any): any[];
	map(
		callback: (value: any, key?: string) => any,
		context?: any): any[];
	map(
		callback: (value: any, key?: string, object?: any) => any,
		context?: any): any[];

	/**
	* Alias for 'map'.
	**/
	collect(
		callback: (value: any) => any,
		context?: any): any[];
	collect(
		callback: (value: any, key?: string) => any,
		context?: any): any[];
	collect(
		callback: (value: any, key?: string, object?: any) => any,
		context?: any): any[];

	/*********
	* Arrays *
	**********/

	// There are no Array OOP Wrappers for any

	/************
	* Functions *
	*************/

	/**
	* Binds a number of methods on the object, specified by methodNames, to be run in the context of that object
	* whenever they are invoked. Very handy for binding functions that are going to be used as event handlers,
	* which would otherwise be invoked with a fairly useless this. If no methodNames are provided, all of the
	* object's function properties will be bound to it.
	**/
	bindAll(...methodNames: string[]): void;

	/**********
	* Objects *
	***********/

	/**
	* Retrieve all the names of the object's properties.
	**/
	keys(): string[];

	/**
	* Return all of the values of the object's properties.
	**/
	values(): any[];

	/**
	* Convert an object into a list of [key, value] pairs.
	**/
	pairs(): any[][];

	/**
	* Returns a copy of the object where the keys have become the values and the values the keys.
	* For this to work, all of your object's values should be unique and string serializable.
	**/
	invert(): any;

	/**
	* Returns a sorted list of the names of every method in an object — that is to say,
	* the name of every function property of the object.
	**/
	functions(): string[];

	/**
	* Copy all of the properties in the source objects over to the destination object, and return
	* the destination object. It's in-order, so the last source will override properties of the
	* same name in previous arguments.
	**/
	extend(...sources: any[]): any;
	
	/**
	* Merges enumerable properties of the source object(s) into the destination object. Subsequent sources
	will overwrite propery assignments of previous sources.
	**/
	merge(...sources: any[]): any;

	/**
	* Return a copy of the object, filtered to only have values for the whitelisted keys
	* (or array of valid keys).
	**/
	pick(...keys: string[]): any;
	pick(
		callback: (element: string) => any,
		context?: any): void;
	pick(
		callback: (element: string, index: number) => any,
		context?: any): void;
	pick(
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
	**/
	omit(...keys: string[]): any;
	omit(
		callback: (element: string) => any,
		context?: any): void;
	omit(
		callback: (element: string, index: number) => any,
		context?: any): void;
	omit(
		callback: (element: string, index: number, list: string[]) => any,
		context?: any): void;

	/**
	* Fill in null and undefined properties in object with values from the defaults objects,
	* and return the object. As soon as the property is filled, further defaults will have no effect.
	**/
	defaults(...defaults: any[]): any;

	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	**/
	clone(): any;

	/**
	* Invokes interceptor with the object, and then returns object. The primary purpose of this method
	* is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.
	**/
	tap(intercepter: Function): any;

	/**
	* Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe
	* reference to the hasOwnProperty function, in case it's been overridden accidentally.
	**/
	has(key: string): bool;

	/**
	* Performs an optimized deep comparison between the two objects,
	* to determine if they should be considered equal.
	**/
	isEqual(other: any): bool;

	/**
	* Returns true if object contains no values.
	**/
	isEmpty(): bool;

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(): bool;

	/**********
	* Utility *
	***********/

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(value: any): any;

	/**
	* Allows you to extend Underscore with your own utility functions. Pass a hash of
	* {name: function} definitions to have your functions added to the Underscore object,
	* as well as the OOP wrapper.
	* @example
	*
	* _.mixin({
	*     capitalize : function(string) {
	*         return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	*     }
	* });
	* _("fabio").capitalize();
	* => "Fabio"
	*
	**/
	mixin(): void;

	/**
	* If the value of the named property is a function then invoke it; otherwise, return it.
	**/
	result(property: string): any;

	/***********
	* Chaining *
	************/

	/**
	* Returns a wrapped object. Calling methods on this object will continue to return wrapped objects
	* until value is used.
	**/
	chain(): any;

	/**
	* Extracts the value of a wrapped object.
	**/
	value(): any;

	/**************
	* OOP Wrapper *
	**************/

	// There are no base OOP Wrappers for any
}

interface UnderscoreObjectArrayOOPWrapper {
	
	/**************
	* Collections *
	***************/

	/**
	* Iterates over a list of elements, yielding each in turn to an callback function. The callback is
	* bound to the context object, if one is passed. Each invocation of callback is called with three
	* arguments: (element, index, list). If list is a JavaScript object, callback's arguments will be
	* (value, key, list). Delegates to the native forEach function if it exists.
	**/	
	each(
		callback: (element: any) => any,
		context?: any): void;
	each(
		callback: (element: any, index: number) => any,
		context?: any): void;
	each(
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;

	/**
	* Alias for 'each'.
	**/
	forEach(
		callback: (element: any) => any,
		context?: any): void;
	forEach(
		callback: (element: any, index: number) => any,
		context?: any): void;
	forEach(
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
		
	/**
	* Iterates over object’s own and inherited enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks may exit
	* iteration early by explicitly returning false.
	**/
	forIn(
		callback: (element: any) => any,
		context?: any): void;
	forIn(
		callback: (element: any, index: number) => any,
		context?: any): void;
	forIn(
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;
		
	/**
	* Iterates over an object’s own enumerable properties, executing the callback for each property.
	* The callback is bound to thisArg and invoked with three arguments; (value, key, object). Callbacks
	* may exit iteration early by explicitly returning false.
	**/
	forOwn(
		callback: (element: any) => any,
		context?: any): void;
	forOwn(
		callback: (element: any, index: number) => any,
		context?: any): void;
	forOwn(
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): void;

	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (callback). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, callback's arguments will be (value, key, list).
	**/
	map(
		callback: (element: any) => any,
		context?: any): any[];
	map(
		callback: (element: any, index: number) => any,
		context?: any): any[];
	map(
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): any[];

	/**
	* Alias for 'map'.
	**/
	collect(
		callback: (element: any) => any,
		context?: any): any[];
	collect(
		callback: (element: any, index: number) => any,
		context?: any): any[];
	collect(
		callback: (element: any, index: number, list: any[]) => any,
		context?: any): any[];

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by callback. The callback is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	**/
	reduce(
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	reduce(
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	reduce(
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduce'.
	**/
	inject(
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	inject(
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	inject(
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduce'.
	**/
	foldl(
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	foldl(
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	foldl(
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	**/
	reduceRight(
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	reduceRight(
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	reduceRight(
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Alias for 'reduceRight'.
	**/
	foldr(
		callback: (memo: any, element: any) => any,
		memo: any,
		context?: any): any;
	foldr(
		callback: (memo: any, element: any, index: number) => any,
		memo: any,
		context?: any): any;
	foldr(
		callback: (memo: any, element: any, index: number, list: any[]) => any,
		memo: any,
		context?: any): any;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (callback). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	**/
	find(
		callback: (element: any) => bool,
		context?: any): any;
	find(
		callback: (element: any, index: number) => bool,
		context?: any): any;
	find(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any;

	/**
	* Alias for 'find'.
	**/
	detect(
		callback: (element: any) => bool,
		context?: any): any;
	detect(
		callback: (element: any, index: number) => bool,
		context?: any): any;
	detect(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any;


	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (callback). Delegates to the native filter method, if it exists.
	**/
	filter(
		callback: (element: any) => bool,
		context?: any): any[];
	filter(
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	filter(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Alias for 'filter'.
	**/
	select(
		callback: (element: any) => bool,
		context?: any): any[];
	select(
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	select(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Looks through each value in the list, returning an array of all the values that contain all
	* of the key-value pairs listed in properties.
	**/
	where(properties: any): any[];

	/**
	* Returns the values in list without the elements that the truth test (callback) passes.
	* The opposite of filter.
	**/
	reject(
		callback: (element: any) => bool,
		context?: any): any[];
	reject(
		callback: (element: any, index: number) => bool,
		context?: any): any[];
	reject(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): any[];

	/**
	* Returns true if all of the values in the list pass the callback truth test. Delegates to the
	* native method every, if present.
	**/
	all(
		callback: (element: any) => bool,
		context?: any): bool;
	all(
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	all(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'all'.
	**/
	every(
		callback: (element: any) => bool,
		context?: any): bool;
	every(
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	every(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Returns true if any of the values in the list pass the callback truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	**/
	any(
		callback?: (element: any) => bool,
		context?: any): bool;
	any(
		callback?: (element: any, index: number) => bool,
		context?: any): bool;
	any(
		callback?: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Alias for 'any'.
	**/
	some(
		callback: (element: any) => bool,
		context?: any): bool;
	some(
		callback: (element: any, index: number) => bool,
		context?: any): bool;
	some(
		callback: (element: any, index: number, list: any[]) => bool,
		context?: any): bool;

	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	**/
	contains(value: any, fromIndex?: number): bool;

	/**
	* Alias for 'contains'.
	**/
	include(value: any, fromIndex?: number): bool;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	**/
	invoke(methodName: string, ...arguments: any[]): void;

	/**
	* A convenient version of what is perhaps the most common use-case for map: extracting a list of
	* property values.
	**/
	pluck(propertyName: string): any[];

	/**
	* Returns the maximum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	max(
		callback: (element: any) => number,
		context?: any): any;
	max(
		callback: (element: any, index: number) => number,
		context?: any): any;
	max(
		callback: (element: any, index: number, list: any[]) => number,
		context?: any): any;

	/**
	* Returns the minimum value in list. If callback is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	**/
	min(
		callback: (obj: any) => number,
		context?: any): any;
	min(
		callback: (obj: any, index: number) => number,
		context?: any): any;
	min(
		callback: (obj: any, index: number, list: any[]) => number,
		context?: any): any;

	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through callback. callback may also be the string name of the property to sort by (eg. length).
	**/
	sortBy(
		callback: (element: any) => number,
		context?: any): any[];
	sortBy(
		callback: (element: any, index: number) => number,
		context?: any): any[];
	sortBy(
		callback: (element: any, index: number, list: any[]) => number,
		context?: any): any[];
	sortBy(callback: string, context?: any): any[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through callback.
	* If callback is a string instead of a function, groups by the property named by callback on
	* each of the values.
	**/
	groupBy(
		callback: (element: any) => string,
		context?: any): { [key: string]: any[]; };
	groupBy(
		callback: (element: any, index: number) => string,
		context?: any): { [key: string]: any[]; };
	groupBy(
		callback: (element: any, index: number, list: any[]) => string,
		context?: any): { [key: string]: any[]; };
	groupBy(callback: string, context?: any): { [key: string]: any[]; };

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	**/
	countBy(
		callback: (element: any) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: any, index: number) => string,
		context?: any): { [key: string]: number; };
	countBy(
		callback: (element: any, index: number, list: any[]) => string,
		context?: any): { [key: string]: number; };
	countBy(callback: string, context?: any): { [key: string]: number; };

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	**/
	shuffle(): any[];

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	**/
	toArray(): any[];

	/**
	* Return the number of values in the list.
	**/
	size(): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	**/
	first(): any;
	first(n: number): any[];

	/**
	* Alias for 'first'.
	**/
	head(): any;
	head(n: number): any[];

	/**
	* Alias for 'first'.
	**/
	take(): any;
	take(n: number): any[];

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	**/
	initial(n?: number): any[];

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	**/
	last(): any;
	last(n: number): any[];

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	**/
	rest(index: number): any[];

	/**
	* Alias for 'rest'.
	**/
	tail(index: number): any[];

	/**
	* Alias for 'rest'.
	**/
	drop(index: number): any[];

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	**/
	compact(): any[];

	/**
	* Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will
	* only be flattened a single level.
	**/
	flatten(shallow?: bool): any[];

	/**
	* Returns a copy of the array with all instances of the values removed.
	**/
	without(...values: any[]): any[];

	/**
	* Computes the union of the passed-in arrays: the list of unique items, in order, that are
	* present in one or more of the arrays.
	**/
	union(...arrays: any[][]): any[];

	/**
	* Computes the list of values that are the intersection of all the arrays. Each value in the result
	* is present in each of the arrays.
	**/
	intersection(...arrays: any[][]): any[];

	/**
	* Similar to without, but returns the values from array that are not present in the other arrays.
	**/
	difference(...others: any[]): any[];

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an callback function.
	**/
	uniq(isSorted?: bool, callback?: (element: any) => any): any[];
	uniq(isSorted?: bool, callback?: (element: any, index: number) => any): any[];
	uniq(isSorted?: bool, callback?: (element: any, index: number, list: any[]) => any): any[];

	/**
	* Alias for 'uniq'.
	**/
	unique(isSorted?: bool, callback?: (element: any) => any): any[];
	unique(isSorted?: bool, callback?: (element: any, index: number) => any): any[];
	unique(isSorted?: bool, callback?: (element: any, index: number, list: any[]) => any): any[];

	/**
	* Merges together the values of each of the arrays with the values at the corresponding position.
	* Useful when you have separate data sources that are coordinated through matching array indexes.
	* If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
	**/
	zip(...arrays: any[][]): any[][];

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	**/
	indexOf(value: any, isSorted?: bool): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	**/
	lastIndexOf(value: any, from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an callback is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	**/
	sortedIndex(value: any, callback?: (element: any) => number): number;

	/************
	* Functions *
	*************/

	// There are no Function OOP Wrappers for any[]

	/**********
	* Objects *
	***********/
	
	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	**/
	clone(list: any[]): any[];

	/**
	* Returns true if object contains no values.
	**/
	isEmpty(): bool;

	/**
	* Returns true if object is a DOM element.
	**/
	isElement(): bool;

	/**
	* Returns true if object is an Array.
	**/
	isArray(): bool;

	/**
	* Returns true if value is an any. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	**/
	isObject(): bool;

	/**
	* Returns true if object is an Arguments object.
	**/
	isArguments(): bool;

	/**
	* Returns true if object is a Function.
	**/
	isFunction(): bool;

	/**
	* Returns true if object is a String.
	**/
	isString(): bool;

	/**
	* Returns true if object is a Number (including NaN).
	**/
	isNumber(): bool;

	/**
	* Returns true if object is a finite Number.
	**/
	isFinite(): bool;

	/**
	* Returns true if object is either true or false.
	**/
	isBoolean(): bool;

	/**
	* Returns true if object is a Date.
	**/
	isDate(): bool;

	/**
	* Returns true if object is a RegExp.
	**/
	isRegExp(): bool;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	**/
	isNaN(): bool;

	/**
	* Returns true if the value of object is null.
	**/
	isNull(): bool;

	/**
	* Returns true if value is undefined.
	**/
	isUndefined(): bool;

	/**********
	* Utility *
	***********/

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default callback.
	**/
	identity(): any[];

	/***********
	* Chaining *
	************/

	/**
	* Returns a wrapped object. Calling methods on this object will continue to return wrapped objects
	* until value is used.
	**/
	chain(): any;

	/**
	* Extracts the value of a wrapped object.
	**/
	value(): any[];

	/**************
	* OOP Wrapper *
	**************/

	// There are no base OOP Wrappers for any[]
}

declare var _: ILodash;