/// <reference path="../../../when.d.ts" />
/// <reference path="../../../when/timeout.d.ts" />
/// <reference path="../../../when/sequence.d.ts" />
/// <reference path="../../../when/pipeline.d.ts" />
/// <reference path="../../../when/parallel.d.ts" />
/// <reference path="../../../when/delay.d.ts" />
/// <reference path="../../../when/cancelable.d.ts" />
/// <reference path="../../../when/apply.d.ts" />
/// <reference path="../../../lodash.d.ts" />

interface IThrustUtilWhen extends IWhen
{
	apply: WhenApply;
    delay: WhenDelay;
	timeout: WhenTimeout;
	parallel: WhenParallel;
	pipeline: WhenPipeline;
	sequence: WhenSequence;
	cancelable: WhenCancelable;
}

interface IThrustUtil
{
	_ : ILodash;

    instantiate(ctor : Function, args: any[]) : Function;
    noop() : void;
    safeInvoke(collection : any, methodName : string, ...args : any[]) : any[];

    invert(obj : any) : any;

    type(obj : any) : string;
    isArrayLike(obj : any) : bool;
    isArrayOrArrayLike(obj : any) : bool;

    emptyGuid() : string;
    isGuid(guid: string) : bool;
    isEmptyGuid(guid: string) : bool;
    newGuid() : string;

    getModuleNameForPath(name : string) : string;
    format(str: string, ...formatArgs: any[]) : string;

    param(a : Object, traditional : bool) : string;
    cleanUrl(url : string) : string;
    fixupUrl(url : string, urlPath : string) : string;

    when: IThrustUtilWhen;
    flattenToPromises(array : any[]) : Promise[];
    
    camelCase(str: string) : string;
    unCamelCase(str: string) : string;
}