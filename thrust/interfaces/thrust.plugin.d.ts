/// <reference path="module.d.ts" />
interface IThrustPlugin
{
	name: string;
	createFacade(thrust: IThrust, mod: IThrustModuleInstance, facades: any): IThrustFacade;
}