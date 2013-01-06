/// <reference path="../when.d.ts" />
interface WhenSequence
{
	(tasks: Function[], ...args: any[]): Promise;
}

declare module 'when/sequence'
{
	export function (tasks: Function[], ...args: any[]): Promise;
}
