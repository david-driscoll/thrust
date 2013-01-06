declare class AsyncSpec
{
	constructor(spec : any);
	beforeEach(action: Function) : void;
	afterEach(action: Function) : void;
	it(expectation: string, assertion: Function) : void;
}
