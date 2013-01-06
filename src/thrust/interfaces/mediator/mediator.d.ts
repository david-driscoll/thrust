/// <reference path="../thrust.d.ts" />
interface IEventManager {
    initEvents() : any;
    extend(to : Object, init? : bool) : Object;

    subscribe(events : string, callback : Function, context?:any, once? : bool) : any;
    unsubscribe(events : string, callback : Function, context?:any) : any;
    once(events : string, callback : Function, context?:any) : any;

    publish : IAsyncEvent;
    fire : IAsyncEvent;
}

interface IAsyncEvent {
    (events : string, ...args : any[]) : any;
    async(events : string, ...args : any[]) : any;
}

interface IEventNode {
    tail : IEventNode;
    next : IEventNode;
    callback : Function;
    context: any;
    once : bool;
    namespace?: string;
}

interface IThrustMediator extends IThrustPlugin, IEventManager
{
}

// config
interface IThrustMediatorConfig extends IThrustPluginConfig
{
}

interface IThrustConfig
{
	mediator?: IThrustMediatorConfig;
}

// facade
interface IThrustMediatorFacade extends Function, IThrustFacade, IEventManager
{
	prototype: IThrustMediatorFacade;
}

interface IThrustModuleInstance
{
	mediator: IThrustMediatorFacade;
}

interface IThrustModuleMediatorInstanceConfig
{
}

interface IThrustModuleInstanceConfig
{
	mediator?: IThrustModuleMediatorInstanceConfig;
}

interface IThrustModuleFacades
{
	mediator?: IThrustMediatorFacade;
}