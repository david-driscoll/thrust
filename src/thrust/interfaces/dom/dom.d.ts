/// <reference path="../thrust.d.ts" />
/// <reference path="../../../jquery.d.ts" />
interface IThrustDom extends IThrustPlugin, IEventManager
{
}

interface IThrust
{
	dom?: IThrustDom;
}

//config
interface IThrustDomConfig extends IThrustPluginConfig
{
}

interface IThrustConfig
{
	dom?: IThrustDomConfig;
}

// facade

interface IThrustDomFacade extends Function, IThrustFacade
{
	prototype: IThrustDomFacade;
	namespace: string;
	context: TQuery;
}

interface IThrustModuleDomInstanceConfig
{
}

interface IThrustModuleInstanceConfig
{
	dom?: IThrustModuleDomInstanceConfig;
}

interface IThrustModuleFacades
{
	dom?: IThrustDomFacade;
}

// tquery
interface TQueryStatic
{
	(selector: string, context?: any, namespace?: string): TQuery;
    (element: Element, context?: any, namespace?: string): TQuery;
    (elementArray: Element[], context?: any, namespace?: string): TQuery;
    (object: TQuery, context?: any, namespace?: string): TQuery;
    (object: JQuery, context?: any, namespace?: string): TQuery;
    (): TQuery;
}

interface TQueryEventObject extends JQueryEventObject {}

interface TQuery
{
	//alias to find.
    query(selector?: string): TQuery;
    query(element?: any): TQuery;
    query(obj?: TQuery): TQuery;
    query(obj?: JQuery): TQuery;
    $(selector?: string): TQuery;
    $(element?: any): TQuery;
    $(obj?: TQuery): TQuery;
    $(obj?: JQuery): TQuery;

	/******* jQuery *******/
    /**********
     ATTRIBUTES
    ***********/
    addClass(classNames: string): TQuery;
    addClass(func: (index: any, currentClass: any) => string): TQuery;

    attr(attributeName: string): string;
    attr(attributeName: string, value: any): TQuery;
    attr(map: { [key: string]: any; }): TQuery;
    attr(attributeName: string, func: (index: any, attr: any) => any): TQuery;

    hasClass(className: string): bool;

    html(): string;
    html(htmlString: string): TQuery;
    html(htmlContent: (index: number, oldhtml: string) => string): TQuery;

    prop(propertyName: string): any;
    prop(propertyName: string, value: any): TQuery;
    prop(map: any): TQuery;
    prop(propertyName: string, func: (index: any, oldPropertyValue: any) => any): TQuery;

    removeAttr(attributeName: any): TQuery;

    removeClass(className?: any): TQuery;
    removeClass(func: (index: any, cls: any) => any): TQuery;

    removeProp(propertyName: any): TQuery;

    toggleClass(className: any, swtch?: bool): TQuery;
    toggleClass(swtch?: bool): TQuery;
    toggleClass(func: (index: any, cls: any, swtch: any) => any): TQuery;

    val(): any;
    val(value: string[]): TQuery;
    val(value: string): TQuery;
    val(value: number): TQuery;
    val(func: (index: any, value: any) => any): TQuery;

    /***
     CSS
    ****/
    css(propertyName: string, value?: any): any;
    css(propertyName: any, value?: any): any;

    height(): number;
    height(value: number): TQuery;
    height(value: string): TQuery;
    height(func: (index: any, height: any) => any): TQuery;

    innerHeight(): number;
    innerWidth(): number;

    offset(): { left: number; top: number; };
    offset(coordinates: any): TQuery;
    offset(func: (index: any, coords: any) => any): TQuery;

    outerHeight(includeMargin?: bool): number;
    outerWidth(includeMargin?: bool): number;

    position(): { top: number; left: number; };

    scrollLeft(): number;
    scrollLeft(value: number): TQuery;

    scrollTop(): number;
    scrollTop(value: number): TQuery;

    width(): number;
    width(value: number): TQuery;
    width(value: string): TQuery;
    width(func: (index: any, height: any) => any): TQuery;

    /****
     DATA
    *****/
    data(key: string, value: any): TQuery;
    data(obj: { [key: string]: any; }): TQuery;
    data(key?: string): any;

    removeData(nameOrList?: any): TQuery;

    /*******
     EFFECTS
    ********/
    animate(properties: any, duration?: any, complete?: Function): TQuery;
    animate(properties: any, duration?: any, easing?: string, complete?: Function): TQuery;
    animate(properties: any, options: { duration?: any; easing?: string; complete?: Function; step?: Function; queue?: bool; specialEasing?: any; });

    delay(duration: number, queueName?: string): TQuery;

    hide(): TQuery;

    show(): TQuery;

    toggle(): TQuery;
    toggle(showOrHide: bool): TQuery;

    /******
     EVENTS
    *******/
    bind(eventType: string, eventData?: any, handler?: (eventObject: TQueryEventObject) => any): TQuery;
    bind(eventType: string, eventData: any, preventBubble:bool): TQuery;
    bind(eventType: string, preventBubble:bool): TQuery;
    bind(...events: any[]);

    off(events?: string, selector?: any, handler?: (eventObject: TQueryEventObject) => any): TQuery;
    off(eventsMap: { [key: string]: any; }, selector?: any): TQuery;

    on(events: string, selector?: any, data?: any, handler?: (eventObject: TQueryEventObject) => any): TQuery;
    on(eventsMap: { [key: string]: any; }, selector?: any, data?: any): TQuery;

    one(events: string, selector?: any, data?: any, handler?: (eventObject: TQueryEventObject) => any): TQuery;
    one(eventsMap: { [key: string]: any; }, selector?: any, data?: any): TQuery;

    trigger(eventType: string, ...extraParameters: any[]): TQuery;
    trigger(event: TQueryEventObject): TQuery;

    triggerHandler(eventType: string, ...extraParameters: any[]): Object;

    /*********
     INTERNALS
    **********/
    context: Element;
    jquery: string;

    pushStack(elements: any[]): TQuery;
    pushStack(elements: any[], name: any, arguments: any): TQuery;

    /************
     MANIPULATION
    *************/
    after(...content: any[]): TQuery;
    after(func: (index: any) => any);

    append(...content: any[]): TQuery;
    append(func: (index: any, html: any) => any);

    appendTo(target: any): TQuery;

    before(...content: any[]): TQuery;
    before(func: (index: any) => any);

    clone(withDataAndEvents?: bool, deepWithDataAndEvents?: bool): TQuery;

    detach(selector?: any): TQuery;

    empty(): TQuery;

    insertAfter(target: any): TQuery;
    insertBefore(target: any): TQuery;

    prepend(...content: any[]): TQuery;
    prepend(func: (index: any, html: any) =>any): TQuery;

    prependTo(target: any): TQuery;

    remove(selector?: any): TQuery;

    replaceAll(target: any): TQuery;

    replaceWith(func: any): TQuery;

    text(): string;
    text(textString: any): TQuery;
    text(textString: (index: number, text: string) => string): TQuery;

    toArray(): any[];

    unwrap(): TQuery;

    wrap(wrappingElement: any): TQuery;
    wrap(func: (index: any) =>any): TQuery;

    wrapAll(wrappingElement: any): TQuery;

    wrapInner(wrappingElement: any): TQuery;
    wrapInner(func: (index: any) =>any): TQuery;

    /*************
     MISCELLANEOUS
    **************/
    each(func: (index: any, elem: Element) => any);

    get(index?: number): any;

    index(): number;
    index(selector: string): number;
    index(element: any): number;

    /**********
     PROPERTIES
    ***********/
    length: number;
    selector: string;
    namespace: string;
    [x: string]: HTMLElement;
    [x: number]: HTMLElement;

    /**********
     TRAVERSING
    ***********/
    add(selector: string, context?: any): TQuery;
    add(...elements: any[]): TQuery;
    add(html: string): TQuery;
    add(obj: TQuery): TQuery;
    add(obj: JQuery): TQuery;

    andSelf(): TQuery;

    children(selector?: any): TQuery;

    closest(selector: string): TQuery;
    closest(selector: string, context?: Element): TQuery;
    closest(obj: TQuery): TQuery;
    closest(obj: JQuery): TQuery;
    closest(element: any): TQuery;
    closest(selectors: any, context?: Element): any[];

    contents(): TQuery;

    end(): TQuery;

    eq(index: number): TQuery;

    filter(selector: string): TQuery;
    filter(func: (index: any) =>any): TQuery;
    filter(element: any): TQuery;
    filter(obj: TQuery): TQuery;
    filter(obj: JQuery): TQuery;

    find(selector?: string): TQuery;
    find(element?: any): TQuery;
    find(obj?: TQuery): TQuery;
    find(obj?: JQuery): TQuery;

    first(): TQuery;

    has(selector: string): TQuery;
    has(contained: Element): TQuery;

    is(selector: string): bool;
    is(func: (index: any) =>any): bool;
    is(element: any): bool;
    is(obj: TQuery): bool;
    is(obj: JQuery): bool;

    last(): TQuery;

    map(callback: (index: any, domElement: Element) =>any): TQuery;

    next(selector?: string): TQuery;

    nextAll(selector?: string): TQuery;

    nextUntil(selector?: string, filter?: string): TQuery;
    nextUntil(element?: Element, filter?: string): TQuery;

    not(selector: string): TQuery;
    not(func: (index: any) =>any): TQuery;
    not(element: any): TQuery;
    not(obj: TQuery): TQuery;
	not(obj: JQuery): TQuery;

    offsetParent(): TQuery;

    parent(selector?: string): TQuery;

    parents(selector?: string): TQuery;

    parentsUntil(selector?: string, filter?: string): TQuery;
    parentsUntil(element?: Element, filter?: string): TQuery;

    prev(selector?: string): TQuery;

    prevAll(selector?: string): TQuery;

    prevUntil(selector?: string, filter?:string): TQuery;
    prevUntil(element?: Element, filter?:string): TQuery;

    siblings(selector?: string): TQuery;

    slice(start: number, end?: number): TQuery;
}