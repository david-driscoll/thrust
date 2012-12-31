/// <reference path="template.config.d.ts" />
/// <reference path="../data/data.d.ts" />
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