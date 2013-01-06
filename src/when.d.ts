interface Promise
{
	then(onFulfilled: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	always(onFulfilledOrRejected: Function,
		onProgress?: Function): Promise;

	otherwise(onRejected: Function): Promise;

	yield(onFulfilled: Function): Promise;

	spread(onFulfilled: Function): Promise;
}

interface Resolver
{
	resolve(value?: any): void;
	reject(error?: any): void;
}

interface ProgressResolver extends Resolver
{
	progress(update?: any): void;
}

interface Deferred extends ProgressResolver
{
	promise: Promise;
	resolver: ProgressResolver;
}

interface IWhen
{
	(promise: Promise,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function);
	(promiseOrValue: any,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function);

	defer(): Deferred;

	resolve(promise: Promise): Promise;
	resolve(promiseOrValue: any): Promise;
	reject(promise: Promise): Promise;
	reject(promiseOrValue: any): Promise;

	join(...promises: Promise[]): Promise;
	join(...promisesOrValues: any[]): Promise;

	all(promises: Promise[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;
	all(promisesOrValues: any[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	map(promise: Promise,
		fn: () => any): Promise;
	map(promise: Promise,
		fn: (item) => any): Promise;
	map(promiseOrValue: any,
		fn: () => any): Promise;
	map(promiseOrValue: any,
		fn: (item) => any): Promise;
	map(promises: Promise[],
		fn: () => any): Promise;
	map(promises: Promise[],
		fn: (item) => any): Promise;
	map(promisesOrValues: any[],
		fn: () => any): Promise;
	map(promisesOrValues: any[],
		fn: (item) => any): Promise;

	reduce(promise: Promise,
		fn: Function,
		initialValue?: any): Promise;
	reduce(promiseOrValue: any,
		fn: Function,
		initialValue?: any): Promise;
	reduce(promises: Promise[],
		fn: Function,
		initialValue?: any): Promise;
	reduce(promisesOrValues: any[],
		fn: Function,
		initialValue?: any): Promise;

	any(promises: Promise[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;
	any(promisesOrValues: any[],
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	some(promises: Promise[],
		howMany: number,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;
	some(promisesOrValues: any[],
		howMany: number,
		onFulfilled?: Function,
		onRejected?: Function,
		onProgress?: Function): Promise;

	chain(promise: Promise,
		resolver: Resolver,
		resolveValue?: any): Promise;
	chain(promiseOrValue: any,
		resolver: Resolver,
		resolveValue?: any): Promise;

	isPromise(promiseOrValue: any): bool;
}

declare module 'when'
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
		resolveValue: any): Promise;
	export function chain(promiseOrValue: any,
		resolver: Resolver,
		resolveValue: any): Promise;

	export function isPromise(promiseOrValue: any): bool;
}

declare var when: IWhen;