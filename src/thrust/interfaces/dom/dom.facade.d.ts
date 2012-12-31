/// <reference path="../module.d.ts" />
/// <reference path="dom.d.ts" />
/// <reference path="../facade.d.ts" />
interface IThrustDomFacade extends Function, IThrustFacade, IThrustDomStaticInstance
{
	prototype: IThrustDomFacade;
}

interface IThrustModuleInstance
{
	dom?: IThrustDomFacade;
	$?: IThrustDomFacade;
}

interface IThrustModuleFacades
{
	dom?: IThrustDomFacade;
}