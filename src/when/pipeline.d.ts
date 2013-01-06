/// <reference path="../when.d.ts" />
interface WhenPipeline
{
	(tasks: Function[], ...initialArgs: any[]): Promise;
}

declare module 'when/pipeline'
{
	export function (tasks: Function[], ...initialArgs: any[]): Promise;
}

