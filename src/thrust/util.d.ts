/// <reference path="interfaces/util/util.d.ts" />
declare module 'thrust/util'
{
	export var _ : ILodash;

	export function instantiate(ctor : Function, args: any[]) : Function;
    export function noop() : void;
    export function safeInvoke(collection : any, methodName : string, ...args : any[]) : any[];

    export function invert(obj : any) : any;

    export function isArrayLike(obj : any) : bool;
    export function isArrayOrArrayLike(obj : any) : bool;

    export function emptyGuid() : string;
    export function isGuid(guid: string): bool;
    export function isEmptyGuid(guid: string) : bool;
    export function newGuid() : string;

    export function getModuleNameForPath(name : string) : string;
    export function format(str: string, ...formatArgs : any[]) : string;

    export function param(a : Object, traditional : bool) : string;
    export function cleanUrl(url : string) : string;
    export function fixupUrl(url : string, urlPath : string) : string;

    export var when : IThrustUtilWhen;
    export function flattenToPromises(array: any[]): Promise[];
    
    export function camelCase(str: string) : string;
    export function unCamelCase(str: string) : string;
}
