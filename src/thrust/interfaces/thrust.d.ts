/// <reference path="mediator/mediator.d.ts" />
/// <reference path="../../when.d.ts" />
interface IThrust
{
	name: string;
	
	modules: Object;
	failedModules: Object;
	children: IThrust[];
	startingModules: any[];
	__previousState: bool;
	started: bool;
	cfg: IThrustConfig;
	config: IThrustConfig;
	parent: IThrust;

	mediator: IThrustMediator;
	//__moduleRegistrations: Object;
	__conventionPluckPropertiesCache: any[];
	__conventions: ThrustConvention[];

	__injectModule(mod: IThrustModule): void;
	
	create(name: string, mod: any, preBuilt?: bool) : IThrustModule;
	_countdown(calledByParent: bool) : Promise;
	countdown(calledByParent: bool) : Promise;
	ignite(calledByParent: bool) : Promise;
	orbit(calledByParent: bool) : Promise;
	deploy(calledByParent: bool) : Promise;
	inOrbit();
	deorbit(calledByParent: bool) : Promise;
	splashdown(calledByParent: bool) : Promise;
	init(name?: string[]): Promise;
	init(name?: string): Promise;
	init(name?: string[], ...args : any[]): Promise;
	init(name?: string, ...args : any[]): Promise;
	start(names?: string[]): Promise;
	start(name?: string): Promise;
	start(names?: string[], ...args : any[]): Promise;
	start(name?: string, ...args : any[]): Promise;
	ready(name?: string[]): Promise;
	ready(name?: string): Promise;
	ready(name?: string[], ...args : any[]): Promise;
	ready(name?: string, ...args : any[]): Promise;
	stop(name?: string[]): Promise;
	stop(name?: string): Promise;
	stop(name?: string[], ...args : any[]): Promise;
	stop(name?: string, ...args : any[]): Promise;
	destroy(name?: string[]): Promise;
	destroy(name?: string): Promise;
	destroy(name?: string[], ...args : any[]): Promise;
	destroy(name?: string, ...args : any[]): Promise;
}

interface IThrustStatic
{
    getInstance(name: string): IThrust;
    fetchInstance(name: string): Promise;
	launch(settings: IThrustConfig, calledByParent?: bool): Promise;
}

interface IThrustIndexer extends IThrust
{
	[plugin: string]: IThrustPlugin;
}

// plugin
interface IThrustPlugin
{
	name: string;
	createFacade(thrust: IThrust, mod: IThrustModuleInstance, facades: any): IThrustFacade;
}

// module
interface IThrustModule
{
	thrust: IThrust;
	name: string;
	mid: string;
	instance: IThrustModuleInstance;
	convention(property: string, value?: any): any;
	thrustCreate(thrust: IThrust);
	thrustCall(method : string, facadeAfter :bool, args : any[]) : Promise;
	start() : Promise;
	stop() : Promise;
}

interface IThrustModuleInternal extends IThrustModule {
    cache: IThrustModuleCacheInstance;
}

interface IThrustModuleInstanceConfig
{
    autoStart: bool;
}

interface IThrustModuleInstance
{
    [key: string]: any;
	name?: string;
	config?: IThrustModuleInstanceConfig;
    init: Function;
	destroy: Function;
	start?: Function;
	ready?: Function;
	stop?: Function;
}

interface IThrustModuleInstancePrivate extends IThrustModuleInstance
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

// facade
interface IThrustFacade
{
	(mod: IThrustModuleInstance, ...args: any[]);
    init(m : IThrustModuleInstance) : Promise[];
    start(m : IThrustModuleInstance) : Promise[];
    ready(m : IThrustModuleInstance) : Promise[];
    stop(m : IThrustModuleInstance) : Promise[];
    destroy(m : IThrustModuleInstance) : Promise[];
    updateFacade(...args: any[]): void;
    prototype: IThrustFacade;
}

/// convention
declare module IThrustConvention
{
	interface Properties {
		properties: string[];
	}
	interface Create
	{
		create(thrust: IThrust, mod : IThrustModule, facades: IThrustModuleFacades): void;
	}
	declare module Init
	{
		interface PromiseObject {
			init(mod: IThrustModule, facades: IThrustModuleFacades): Promise;
		}

		interface PromiseArray	{
			init(mod: IThrustModule, facades: IThrustModuleFacades): Promise[];
		}
		
		interface Void	{
			init(mod: IThrustModule, facades: IThrustModuleFacades): void;
		}
	}
	declare module Start
	{
		interface PromiseObject {
			start(mod: IThrustModule, facades: IThrustModuleFacades): Promise;
		}

		interface PromiseArray	{
			start(mod: IThrustModule, facades: IThrustModuleFacades): Promise[];
		}
		
		interface Void	{
			start(mod: IThrustModule, facades: IThrustModuleFacades): void;
		}
	}
	declare module Ready
	{
		interface PromiseObject {
			ready(mod: IThrustModule, facades: IThrustModuleFacades): Promise;
		}

		interface PromiseArray	{
			ready(mod: IThrustModule, facades: IThrustModuleFacades): Promise[];
		}
		
		interface Void	{
			ready(mod: IThrustModule, facades: IThrustModuleFacades): void;
		}
	}
	declare module Stop
	{
		interface PromiseObject {
			stop(mod: IThrustModule, facades: IThrustModuleFacades): Promise;
		}

		interface PromiseArray	{
			stop(mod: IThrustModule, facades: IThrustModuleFacades): Promise[];
		}
		
		interface Void	{
			stop(mod: IThrustModule, facades: IThrustModuleFacades): void;
		}
	}
	declare module Destroy
	{
		interface PromiseObject {
			destroy(mod: IThrustModule, facades: IThrustModuleFacades): Promise;
		}

		interface PromiseArray	{
			destroy(mod: IThrustModule, facades: IThrustModuleFacades): Promise[];
		}
		
		interface Void	{
			destroy(mod: IThrustModule, facades: IThrustModuleFacades): void;
		}
	}
	declare module Plugin {
		declare module Init
		{
			interface PromiseObject {
				init(mod: IThrustModule, facade: IThrustFacade): Promise;
			}

			interface PromiseArray	{
				init(mod: IThrustModule, facade: IThrustFacade): Promise[];
			}
			
			interface Void	{
				init(mod: IThrustModule, facade: IThrustFacade): void;
			}
		}
		declare module Start
		{
			interface PromiseObject {
				start(mod: IThrustModule, facade: IThrustFacade): Promise;
			}

			interface PromiseArray	{
				start(mod: IThrustModule, facade: IThrustFacade): Promise[];
			}
			
			interface Void	{
				start(mod: IThrustModule, facade: IThrustFacade): void;
			}
		}
		declare module Ready
		{
			interface PromiseObject {
				ready(mod: IThrustModule, facade: IThrustFacade): Promise;
			}

			interface PromiseArray	{
				ready(mod: IThrustModule, facade: IThrustFacade): Promise[];
			}
			
			interface Void	{
				ready(mod: IThrustModule, facade: IThrustFacade): void;
			}
		}
		declare module Stop
		{
			interface PromiseObject {
				stop(mod: IThrustModule, facade: IThrustFacade): Promise;
			}

			interface PromiseArray	{
				stop(mod: IThrustModule, facade: IThrustFacade): Promise[];
			}
			
			interface Void	{
				stop(mod: IThrustModule, facade: IThrustFacade): void;
			}
		}
		declare module Destroy
		{
			interface PromiseObject {
				destroy(mod: IThrustModule, facade: IThrustFacade): Promise;
			}

			interface PromiseArray	{
				destroy(mod: IThrustModule, facade: IThrustFacade): Promise[];
			}
			
			interface Void	{
				destroy(mod: IThrustModule, facade: IThrustFacade): void;
			}
		}
	}	
	declare module Countdown {
		interface PromiseObject {
			countdown(thrust : IThrust): Promise;
		}

		interface PromiseArray	{
			countdown(thrust : IThrust): Promise[];
		}
		
		interface Void	{
			countdown(thrust : IThrust): void;
		}
	}
	declare module Ignite {
		interface PromiseObject {
			ignite(thrust : IThrust): Promise;
		}

		interface PromiseArray	{
			ignite(thrust : IThrust): Promise[];
		}
		
		interface Void	{
			ignite(thrust : IThrust): void;
		}
	}
	declare module Orbit {
		interface PromiseObject {
			orbit(thrust : IThrust): Promise;
		}

		interface PromiseArray	{
			orbit(thrust : IThrust): Promise[];
		}
		
		interface Void	{
			orbit(thrust : IThrust): void;
		}
	}
	declare module Deorbit {
		interface PromiseObject {
			deorbit(thrust : IThrust): Promise;
		}

		interface PromiseArray	{
			deorbit(thrust : IThrust): Promise[];
		}
		
		interface Void	{
			deorbit(thrust : IThrust): void;
		}
	}
	declare module Splashdown {
		interface PromiseObject {
			splashdown(thrust : IThrust): Promise;
		}

		interface PromiseArray	{
			splashdown(thrust : IThrust): Promise[];
		}
		
		interface Void	{
			splashdown(thrust : IThrust): void;
		}
	}
}

interface ThrustConvention extends IThrustConvention.Properties, IThrustConvention.Create,
	IThrustConvention.Plugin.Init.Void, IThrustConvention.Plugin.Start.Void, IThrustConvention.Plugin.Ready.Void,
	IThrustConvention.Plugin.Stop.Void, IThrustConvention.Plugin.Destroy.Void,
	 IThrustConvention.Countdown.Void, IThrustConvention.Ignite.Void, IThrustConvention.Orbit.Void,
	IThrustConvention.Deorbit.Void, IThrustConvention.Splashdown.Void
{
}

// config
interface IThrustSettings
{
	name?: string;
	throwErrors?: bool;
	async?: bool;
	exposeGlobals?: bool;
	url?: IThrustUrlSettings;
	log?: IThrustLogSettings;
	plugins?: string[];
	modules?: string[];
	childInstance?: bool;
	automaticLifecycle?: bool;
	conventions?: string[];

	autoStart?: bool;
}

interface IThrustUrlSettings
{
	path?: string;
	traditionalEncoding?: bool;
}

interface IThrustLogSettings
{
	level?: number;
	enabled?: bool;
}

interface IThrustConfig extends IThrustSettings
{
	autoStart?: bool;
	async?: bool;
	childInstance?: bool;
	automaticLifecycle?: bool;
	debug?: IThrustDebugConfig;
}

interface IThrustDebugConfig
{
	timeStart?: number;
}

interface IThrustPluginConfig
{
	resolve?: string[];
	conventions?: string[];
}