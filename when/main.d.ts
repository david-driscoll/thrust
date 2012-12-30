/// <reference path="../when.d.ts" />
declare module 'when/main'
{
	export function (promise: Promise,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function);
	export function (promiseOrValue: any,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function);

	export function defer(): Deferred;

	export function resolve(promise: Promise): Promise;
	export function resolve(promiseOrValue: any): Promise;
	export function reject(promise: Promise): Promise;
	export function reject(promiseOrValue: any): Promise;

	export function join(...promises: Promise[]): Promise;
	export function join(...promisesOrValues: any[]): Promise;

	export function all(promises: Promise[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;
	export function all(promisesOrValues: any[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	export function map(promise: Promise,
		fn: Function): Promise;
	export function map(promiseOrValue: any,
		fn: Function): Promise;
	export function map(promises: Promise[],
		fn: Function): Promise;
	export function map(promisesOrValues: any[],
		fn: Function): Promise;

	export function reduce(promise: Promise,
		fn: Function,
		initialValue?: any): Promise;
	export function reduce(promiseOrValue: any,
		fn: Function,
		initialValue?: any): Promise;
	export function reduce(promises: Promise[],
		fn: Function,
		initialValue?: any): Promise;
	export function reduce(promisesOrValues: any[],
		fn: Function,
		initialValue?: any): Promise;

	export function any(promises: Promise[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;
	export function any(promisesOrValues: any[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	export function some(promises: Promise[],
		howMany: number,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;
	export function some(promisesOrValues: any[],
		howMany: number,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	export function chain(promise: Promise,
		resolver: Resolver,
		resolveValue?: any): Promise;
	export function chain(promiseOrValue: any,
		resolver: Resolver,
		resolveValue?: any): Promise;

	export function isPromise(promiseOrValue: any): bool;
}
