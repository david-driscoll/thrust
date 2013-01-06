/// <reference path="context.d.ts" />
/// <reference path="../dom.d.ts" />
interface IDomEvent
{
	handler: (eventObject: TQueryEventObject) => any;
	selector?: string;
	data?: any;
	context?: any;
}

interface IDomEventsConfig
{
	[event: string]: IDomEvent[];
}

interface IThrustModuleDomInstanceConfig
{
	events?: IDomEventsConfig;
}
