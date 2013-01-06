/// <reference path="../thrust.d.ts" />
interface IThrustTemplate extends IThrustPlugin
{
	templateTypes: any;
    longName: (name: string, type?: string) => string;
    shortName: (name: string) => string;
    templateId: (name: string) => string;
    engines: any;
    data: IThrustData;
    config: IThrustTemplateConfig;
    templates: IThrustTemmplateContainer;

    get (name: string): IThrustTemplateInstance;
    set (name: string, type: string, compiledTemplate: Function, html: string): void;
    has(name: string): bool;
    newTemplate(name : string, type : string, html : any, engine?): IThrustTemplateInstance;
    fetch(name: string, type?: string): Promise;
    createFromDomNode(element: HTMLScriptElement) : void;
    compile(html: string, engine?): Function;
}

interface IThrust
{
	template?: IThrustTemplate;
}

interface IThrustTemplateInstance
{
	name: string;
	shortName: string;
	id: string;
	type: string;
	html: string;
	compiled: (x : any) => string;
}

interface IThrustTemmplateContainer
{
    long: IThrustTemplateDictionary;
    short: IThrustTemplateDictionary;
    id: IThrustTemplateDictionary;
}

interface IThrustTemplateDictionary
{
	[name : string] : IThrustTemplateInstance;
}

// config
interface IThrustTemplateConfig extends IThrustPluginConfig
{
	types: Object;
	evaluators: Object;
	defaultType: string;
	baseUrl: string;
	extension: string;
	templatePaths: Object;
}

interface IThrustConfig
{
	template?: IThrustTemplateConfig;
}

// facade
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

interface IThrustModuleTemplateInstanceConfig
{
}

interface IThrustModuleInstanceConfig
{
	template?: IThrustModuleTemplateInstanceConfig;
}