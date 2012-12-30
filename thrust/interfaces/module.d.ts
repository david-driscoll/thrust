/// <reference path="facade.d.ts" />
/// <reference path="thrust.d.ts" />
/// <reference path="../../when.d.ts" />
interface IThrustModule
{
	thrust: IThrust;
	name: string;
	mid: string;
	instance: IThrustModuleInstance;
	convention(property: string, value?: any): any;
	thrustCreate(thrust: IThrust);
	thrustCall(method : string, facadeAfter :bool, args : any[]) : Promise;
	start() : void;
	stop() : void;
}

interface IThrustModuleInstance
{
	name: string;
	mid: string;
}

interface IThrustModuleFacades
{
	[key: string]: IThrustFacade;
}

interface IThrustModuleCache
{
	[key: string]: IThrustModuleCacheInstance;
}

interface IThrustModuleCacheInstance
{
	name?: string;
	module?: IThrustModule;
	facades: IThrustModuleFacades;
	instance: IThrustModuleInstance;
}