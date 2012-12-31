/// <reference path="../settings.d.ts" />
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