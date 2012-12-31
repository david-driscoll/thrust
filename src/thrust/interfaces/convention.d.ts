/// <reference path="facade.d.ts" />
/// <reference path="module.d.ts" />
/// <reference path="thrust.d.ts" />
interface IThrustConventionProperties
{
	properties: string[];
}

interface IThrustConventionCreate
{
	create(thrust: IThrust, mod : IThrustModule, facades: IThrustModuleFacades): void;
}

interface IThrustConventionInit
{
	init(facades: IThrustFacade, mod: IThrustModule): Promise;
}

interface IThrustConventionInitPromiseArray
{
	init(facades: IThrustFacade, mod: IThrustModule): Promise[];
}

interface IThrustConventionStart
{
	start(facades: IThrustFacade, mod: IThrustModule): Promise;
}

interface IThrustConventionStartPromiseArray
{
	start(facades: IThrustFacade, mod: IThrustModule): Promise[];
}

interface IThrustConventionReady
{
	ready(facades: IThrustFacade, mod: IThrustModule): Promise;
}

interface IThrustConventionReadyPromiseArray
{
	ready(facades: IThrustFacade, mod: IThrustModule): Promise[];
}

interface IThrustConventionStop
{
	stop(facades: IThrustFacade, mod: IThrustModule): Promise;
}

interface IThrustConventionStopPromiseArray
{
	stop(facades: IThrustFacade, mod: IThrustModule): Promise[];
}

interface IThrustConventionDestroy
{
	destroy(facades: IThrustFacade, mod: IThrustModule): Promise;
}

interface IThrustConventionDestroyPromiseArray
{
	destroy(facades: IThrustFacade, mod: IThrustModule): Promise[];
}

interface IThrustConventionCountdown
{
	countdown(thrust : IThrust): Promise;
}

interface IThrustConventionCountdownPromiseArray
{
	countdown(thrust : IThrust): Promise[];
}

interface IThrustConventionIgnite
{
	ignite(thrust : IThrust): Promise;
}

interface IThrustConventionIgnitePromiseArray
{
	ignite(thrust : IThrust): Promise[];
}

interface IThrustConventionOrbit
{
	orbit(thrust : IThrust): Promise;
}

interface IThrustConventionOrbitPromiseArray
{
	orbit(thrust : IThrust): Promise[];
}

interface IThrustConventionDeorbit
{
	deorbit(thrust : IThrust): Promise;
}

interface IThrustConventionDeorbitPromiseArray
{
	deorbit(thrust : IThrust): Promise[];
}

interface IThrustConventionSplashdown
{
	splashdown(thrust : IThrust): Promise;
}

interface IThrustConventionSplashdownPromiseArray
{
	splashdown(thrust : IThrust): Promise[];
}

interface IThrustConvention extends IThrustConventionProperties, IThrustConventionCreate,
	IThrustConventionInit, IThrustConventionStart, IThrustConventionReady,
	IThrustConventionStop, IThrustConventionDestroy,
	 IThrustConventionCountdown, IThrustConventionIgnite, IThrustConventionOrbit,
	IThrustConventionDeorbit, IThrustConventionSplashdown
{
}