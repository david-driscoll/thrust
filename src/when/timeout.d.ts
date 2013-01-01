/// <reference path="../when.d.ts" />
interface WhenTimeout
{
	(promise: Promise, msec: number): Promise;
	(promiseOrValue: any, msec: number): Promise;
}

declare module 'when/timeout' 
{
	export function (promise: Promise, msec: number): Promise;
	export function (promiseOrValue: any, msec: number): Promise;
}
