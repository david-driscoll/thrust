/// <reference path="../when.d.ts" />
interface WhenParallel {
    (tasks: Promise[], ...args : any[]): Promise;
    (tasks: any[], ...args : any[]): Promise;
}

declare module 'when/parallel' 
{
	export function (tasks: Promise[], ...args : any[]): Promise;
    export function (tasks: any[], ...args : any[]): Promise;
}