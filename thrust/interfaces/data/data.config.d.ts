/// <reference path="../settings.d.ts" />
interface IThrustDataConfig extends IThrustPluginConfig
{
	cache: bool;
	startTimeout: number;
	finishTimeout: number;
}

interface IThrustConfig
{
	data?: IThrustDataConfig;
}