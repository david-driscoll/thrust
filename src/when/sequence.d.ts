/// <reference path="../when.d.ts" />
interface WhenSequence
{
	(tasks: Promise[], ...args: any[]): Promise;
	(tasks: any[], ...args: any[]): Promise;
}

declare module 'when/sequence'
{
	export function (tasks: Promise[], ...args: any[]): Promise;
	export function (tasks: any[], ...args: any[]): Promise;
}
