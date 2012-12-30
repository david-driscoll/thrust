/// <reference path="../facade.d.ts" />
interface IThrustMediatorFacade extends Function, IThrustFacade, IEventManager
{
	prototype: IThrustMediatorFacade;
}

interface IThrustModuleInstance
{
	mediator?: IThrustMediatorFacade;
}

interface IThrustModuleFacades
{
	mediator?: IThrustMediatorFacade;
}