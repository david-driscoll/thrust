declare class AsyncSpec {
    constructor(spec: any);
    public it(expectation: string, assertion: Function): void;
    public beforeEach(action: Function): void;
    public afterEach(action: Function): void;
}
