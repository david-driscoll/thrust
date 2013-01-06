/// <reference path="../when.d.ts" />
interface WhenParallel {
    (tasks: Function[], ...args : any[]): Promise;
}

declare module 'when/parallel' 
{
	export function (tasks: Function[], ...args : any[]): Promise;
}