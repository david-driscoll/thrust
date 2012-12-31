/// <reference path="module.d.ts" />
interface IThrustFacade
{
	(mod: IThrustModuleInstance, ...args: any[]);
    init(m : IThrustModuleInstance) : Promise[];
    start(m : IThrustModuleInstance) : Promise[];
    ready(m : IThrustModuleInstance) : Promise[];
    stop(m : IThrustModuleInstance) : Promise[];
    destroy(m : IThrustModuleInstance) : Promise[];
    updateFacade(...args: any[]): void;
    prototype: IThrustFacade;
}
