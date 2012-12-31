/// <reference path="mediator/mediator.d.ts" />
/// <reference path="module.d.ts" />
/// <reference path="convention.d.ts" />
/// <reference path="settings.d.ts" />
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
	__conventions: IThrustConvention[];

	__injectModule(mod: IThrustModule): void;
	
	create(name: string, mod: any, preBuilt: bool);
	countdown(ignoreChild: bool, calledByParent: bool) : Promise;
	ignite(ignoreChild: bool, calledByParent: bool) : Promise;
	orbit(ignoreChild: bool, calledByParent: bool) : Promise;
	deploy(ignoreChild: bool, calledByParent: bool) : Promise;
	inOrbit();
	deorbit(ignoreChild: bool, calledByParent: bool) : Promise;
	splashdown(ignoreChild: bool, calledByParent: bool) : Promise;
	init(name?: string[], ...args : any[]): Promise;
	init(name?: string, ...args : any[]): Promise;
	start(names?: string[], ...args : any[]): Promise;
	start(name?: string, ...args : any[]): Promise;
	ready(name?: string[], ...args : any[]): Promise;
	ready(name?: string, ...args : any[]): Promise;
	stop(name?: string[], ...args : any[]): Promise;
	stop(name?: string, ...args : any[]): Promise;
	destroy(name?: string[], ...args : any[]): Promise;
	destroy(name?: string, ...args : any[]): Promise;
}

interface IThrustIndexer extends IThrust
{
	[plugin: string]: IThrustPlugin;
}