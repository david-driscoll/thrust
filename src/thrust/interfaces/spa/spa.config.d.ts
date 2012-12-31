/// <reference path="../settings.d.ts" />
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