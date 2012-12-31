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
	resolve: string[];
	conventions: string[];
}