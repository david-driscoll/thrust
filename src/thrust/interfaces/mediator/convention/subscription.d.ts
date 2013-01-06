/// <reference path="../mediator.d.ts" />
interface ISubscriptionEvent
{
	handler?: Function;
	moduleHandler?: string;
	context?: any;
}

interface ISubscriptionEvents
{
	[event: string]: ISubscriptionEvent[];
}

interface IThrustModuleMediatorInstanceConfig
{
    subscriptions?: ISubscriptionEvents;
}
