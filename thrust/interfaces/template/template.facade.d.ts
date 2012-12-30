/// <reference path="template.d.ts" />
/// <reference path="../facade.d.ts" />
interface IThrustTemplateFacade extends Function, IThrustFacade, IThrustTemplateMethods
{
	prototype: IThrustTemplateFacade;
	loadingPromise: Promise;
}

interface IThrustTemplateMethods
{
	[name: string]: (x : any) => string;
	fetch(name: string, type?: string) : Promise;
	get (name: string): IThrustTemplate;
	has(name: string): bool;
}

interface IThrustModuleFacades
{
	template?: IThrustTemplateFacade;
}

interface IThrustModuleInstance
{
	templates?: IThrustTemplateMethods;
}