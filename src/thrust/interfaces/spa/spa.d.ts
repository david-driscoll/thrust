/// <reference path="../thrust.d.ts" />
interface IThrustSpa extends IThrustPlugin
{
	navigate(location: string);
	start();
	startingModulePromise: Promise;
}

interface IThrust
{
	spa?: IThrustSpa;
}

// config
interface IThrustSpaConfig extends IThrustPluginConfig
{
	params: any;
    routes : any;
    fileExtension : string;
}

interface IThrustConfig
{
	spa?: IThrustSpaConfig;
}

// facade
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

interface IThrustModuleSpaInstanceConfig
{
}

interface IThrustModuleInstanceConfig
{
	spa?: IThrustModuleSpaInstanceConfig;
}