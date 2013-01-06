/// <reference path="../when.d.ts" />
interface WhenDelay
{
	(msec: number): Promise;
	(promise: Promise, msec: number): Promise;
	(promiseOrValue: any, msec: number): Promise;
}

declare module 'when/delay'
{
	export function (msec: number): Promise;
	export function (promise: Promise, msec: number): Promise;
	export function (promiseOrValue: any, msec: number): Promise;
}