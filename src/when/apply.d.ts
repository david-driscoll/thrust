/// <reference path="../when.d.ts" />
interface WhenApply
{
	(argFunc: Function): Function;
}

declare module 'when/apply'
{
	export function (argFunc: Function): Function;
}
