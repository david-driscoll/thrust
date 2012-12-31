/// <reference path="../thrust.plugin.d.ts" />
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