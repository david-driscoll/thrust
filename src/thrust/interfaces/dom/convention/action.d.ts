/// <reference path="../dom.d.ts" />
interface IDomActionEvent
{
	name: string;
	handler?: (eventObject: TQueryEventObject) => any;
	moduleHandler?: string;
	context?: any;
}

interface IDomActionsConfig
{
	click?: IDomActionEvent[];
	dblclick: IDomActionEvent[];
	mouseenter: IDomActionEvent[];
	mouseleave: IDomActionEvent[];
	focus: IDomActionEvent[];
	leave: IDomActionEvent[];
}

interface IThrustModuleDomInstanceConfig
{
	actions?: IDomActionsConfig;
}

interface IThrustDom
{
    actionHandler?: IThrustDomActionHandler;
}

interface IThrustDomActionHandlerCollection
{
    [name: string]: IThrustDomActionHandler;
}

interface IThrustDomActionHandler
{
    events: IThrustDomActionHandlerEventCollection;
    register(eventName: string, acionName: string, action : IDomActionEvent): void;
    unregister(eventName: string, acionName: string): void;
    callbackFor(eventName, returnResults): Function;
}

interface IThrustDomActionHandlerEventCollection
{
    [event: string]: IThrustDomActionHandlerEvent;
}

interface IThrustDomActionHandlerEvent
{
	[action: string]: IDomActionEvent;
}

