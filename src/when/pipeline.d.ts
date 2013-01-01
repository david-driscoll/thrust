/// <reference path="../when.d.ts" />
interface WhenPipeline
{
	(tasks: Promise[], ...initialArgs: any[]): Promise;
	(tasks: any[], ...initialArgs: any[]): Promise;
}

declare module 'when/pipeline'
{
	export function (tasks: Promise[], ...initialArgs: any[]): Promise;
	export function (tasks: any[], ...initialArgs: any[]): Promise;
}

