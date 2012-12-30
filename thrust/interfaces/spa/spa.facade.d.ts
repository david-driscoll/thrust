/// <reference path="spa.d.ts" />
/// <reference path="../facade.d.ts" />
interface IThrustSpaFacade extends Function, IThrustFacade
{
	prototype: IThrustSpaFacade;
	loadingPromise: Promise;
}

interface IThrustModuleFacades
{
	spa?: IThrustSpaFacade;
}

interface IThrustModuleInstance
{
	navigate(location: string);
}