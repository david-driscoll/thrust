/// <reference path="data.d.ts" />
/// <reference path="../facade.d.ts" />
interface IThrustDataFacade extends Function, IThrustFacade, IThrustDataMethods
{
	prototype: IThrustDataFacade;
}

interface IThrustModuleInstance
{
	data?: IThrustDataFacade;
}

interface IThrustModuleFacades
{
	data?: IThrustDataFacade;
}