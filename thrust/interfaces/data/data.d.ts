/// <reference path="../../../jquery.d.ts" />
/// <reference path="../thrust.d.ts" />
interface IThrustData extends IThrustPlugin, IEventManager, IThrustDataMethods
{
}

interface IThrustDataMethods
{
	getData(url: string, data : any, settings? : IThrustDataSettings): Promise;
    postData(url: string, data : any, settings?: IThrustDataSettings): Promise;
    get(url: string, settings?: IThrustDataSettings): Promise;
    post(url: string, settings?: IThrustDataSettings): Promise;
    ajax(url: string, settings?: IThrustDataSettings): Promise;
}

interface IThrustDataSettings extends JQueryAjaxSettings
{
	__mediator_data_fired__?: bool;
	silent?: bool;
}

interface IThrust
{
	data?: IThrustData;
}

interface IThrustDataDefaults extends IThrustDataSettings
{
}