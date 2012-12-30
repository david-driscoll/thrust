/// <reference path="../module.d.ts" />
/// <reference path="../../../jquery.d.ts" />
/// <reference path="../thrust.plugin.d.ts" />
interface IThrustUntypedDom extends IThrustPlugin, IEventManager
{
}

interface IThrustDom extends IThrustUntypedDom, IThrustDomInstance
{
}

interface IThrust
{
	dom?: IThrustDom;
}

interface IThrustDomStaticInstance extends IThrustDomStatic, IThrustDomInstance
{
}

interface IThrustDomStatic
{
	(selector: string, context?: any): IThrustDomInstance;
    (element: Element): IThrustDomInstance;
    (elementArray: Element[]): IThrustDomInstance;
    (object: IThrustDomInstance): IThrustDomInstance;
    (object: JQuery): IThrustDomInstance;
    (): IThrustDomInstance;
}

interface IThrustDomEventObject extends JQueryEventObject {}

interface IThrustDomInstance
{
    query(selector?: string): IThrustDomInstance;
    query(element?: any): IThrustDomInstance;
    query(obj?: IThrustDomInstance): IThrustDomInstance;
    query(obj?: JQuery): IThrustDomInstance;
    $(selector?: string): IThrustDomInstance;
    $(element?: any): IThrustDomInstance;
    $(obj?: IThrustDomInstance): IThrustDomInstance;
    $(obj?: JQuery): IThrustDomInstance;
	changeContext(selector) : IThrustDomInstance;

	/******* jQuery *******/
    /**********
     ATTRIBUTES
    ***********/
    addClass(classNames: string): IThrustDomInstance;
    addClass(func: (index: any, currentClass: any) => string): IThrustDomInstance;

    attr(attributeName: string): string;
    attr(attributeName: string, value: any): IThrustDomInstance;
    attr(map: { [key: string]: any; }): IThrustDomInstance;
    attr(attributeName: string, func: (index: any, attr: any) => any): IThrustDomInstance;

    hasClass(className: string): bool;

    html(): string;
    html(htmlString: string): IThrustDomInstance;
    html(htmlContent: (index: number, oldhtml: string) => string): IThrustDomInstance;

    prop(propertyName: string): any;
    prop(propertyName: string, value: any): IThrustDomInstance;
    prop(map: any): IThrustDomInstance;
    prop(propertyName: string, func: (index: any, oldPropertyValue: any) => any): IThrustDomInstance;

    removeAttr(attributeName: any): IThrustDomInstance;

    removeClass(className?: any): IThrustDomInstance;
    removeClass(func: (index: any, cls: any) => any): IThrustDomInstance;

    removeProp(propertyName: any): IThrustDomInstance;

    toggleClass(className: any, swtch?: bool): IThrustDomInstance;
    toggleClass(swtch?: bool): IThrustDomInstance;
    toggleClass(func: (index: any, cls: any, swtch: any) => any): IThrustDomInstance;

    val(): any;
    val(value: string[]): IThrustDomInstance;
    val(value: string): IThrustDomInstance;
    val(value: number): IThrustDomInstance;
    val(func: (index: any, value: any) => any): IThrustDomInstance;

    /***
     CSS
    ****/
    css(propertyName: string, value?: any): any;
    css(propertyName: any, value?: any): any;

    height(): number;
    height(value: number): IThrustDomInstance;
    height(value: string): IThrustDomInstance;
    height(func: (index: any, height: any) => any): IThrustDomInstance;

    innerHeight(): number;
    innerWidth(): number;

    offset(): { left: number; top: number; };
    offset(coordinates: any): IThrustDomInstance;
    offset(func: (index: any, coords: any) => any): IThrustDomInstance;

    outerHeight(includeMargin?: bool): number;
    outerWidth(includeMargin?: bool): number;

    position(): { top: number; left: number; };

    scrollLeft(): number;
    scrollLeft(value: number): IThrustDomInstance;

    scrollTop(): number;
    scrollTop(value: number): IThrustDomInstance;

    width(): number;
    width(value: number): IThrustDomInstance;
    width(value: string): IThrustDomInstance;
    width(func: (index: any, height: any) => any): IThrustDomInstance;

    /****
     DATA
    *****/
    data(key: string, value: any): IThrustDomInstance;
    data(obj: { [key: string]: any; }): IThrustDomInstance;
    data(key?: string): any;

    removeData(nameOrList?: any): IThrustDomInstance;

    /*******
     EFFECTS
    ********/
    animate(properties: any, duration?: any, complete?: Function): IThrustDomInstance;
    animate(properties: any, duration?: any, easing?: string, complete?: Function): IThrustDomInstance;
    animate(properties: any, options: { duration?: any; easing?: string; complete?: Function; step?: Function; queue?: bool; specialEasing?: any; });

    delay(duration: number, queueName?: string): IThrustDomInstance;

    hide(): IThrustDomInstance;

    show(): IThrustDomInstance;

    toggle(): IThrustDomInstance;
    toggle(showOrHide: bool): IThrustDomInstance;

    /******
     EVENTS
    *******/
    bind(eventType: string, eventData?: any, handler?: (eventObject: IThrustDomEventObject) => any): IThrustDomInstance;
    bind(eventType: string, eventData: any, preventBubble:bool): IThrustDomInstance;
    bind(eventType: string, preventBubble:bool): IThrustDomInstance;
    bind(...events: any[]);

    off(events?: string, selector?: any, handler?: (eventObject: IThrustDomEventObject) => any): IThrustDomInstance;
    off(eventsMap: { [key: string]: any; }, selector?: any): IThrustDomInstance;

    on(events: string, selector?: any, data?: any, handler?: (eventObject: IThrustDomEventObject) => any): IThrustDomInstance;
    on(eventsMap: { [key: string]: any; }, selector?: any, data?: any): IThrustDomInstance;

    one(events: string, selector?: any, data?: any, handler?: (eventObject: IThrustDomEventObject) => any): IThrustDomInstance;
    one(eventsMap: { [key: string]: any; }, selector?: any, data?: any): IThrustDomInstance;

    trigger(eventType: string, ...extraParameters: any[]): IThrustDomInstance;
    trigger(event: IThrustDomEventObject): IThrustDomInstance;

    triggerHandler(eventType: string, ...extraParameters: any[]): Object;

    /*********
     INTERNALS
    **********/
    context: Element;
    jquery: string;

    pushStack(elements: any[]): IThrustDomInstance;
    pushStack(elements: any[], name: any, arguments: any): IThrustDomInstance;

    /************
     MANIPULATION
    *************/
    after(...content: any[]): IThrustDomInstance;
    after(func: (index: any) => any);

    append(...content: any[]): IThrustDomInstance;
    append(func: (index: any, html: any) => any);

    appendTo(target: any): IThrustDomInstance;

    before(...content: any[]): IThrustDomInstance;
    before(func: (index: any) => any);

    clone(withDataAndEvents?: bool, deepWithDataAndEvents?: bool): IThrustDomInstance;

    detach(selector?: any): IThrustDomInstance;

    empty(): IThrustDomInstance;

    insertAfter(target: any): IThrustDomInstance;
    insertBefore(target: any): IThrustDomInstance;

    prepend(...content: any[]): IThrustDomInstance;
    prepend(func: (index: any, html: any) =>any): IThrustDomInstance;

    prependTo(target: any): IThrustDomInstance;

    remove(selector?: any): IThrustDomInstance;

    replaceAll(target: any): IThrustDomInstance;

    replaceWith(func: any): IThrustDomInstance;

    text(): string;
    text(textString: any): IThrustDomInstance;
    text(textString: (index: number, text: string) => string): IThrustDomInstance;

    toArray(): any[];

    unwrap(): IThrustDomInstance;

    wrap(wrappingElement: any): IThrustDomInstance;
    wrap(func: (index: any) =>any): IThrustDomInstance;

    wrapAll(wrappingElement: any): IThrustDomInstance;

    wrapInner(wrappingElement: any): IThrustDomInstance;
    wrapInner(func: (index: any) =>any): IThrustDomInstance;

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
    [x: string]: HTMLElement;
    [x: number]: HTMLElement;

    /**********
     TRAVERSING
    ***********/
    add(selector: string, context?: any): IThrustDomInstance;
    add(...elements: any[]): IThrustDomInstance;
    add(html: string): IThrustDomInstance;
    add(obj: IThrustDomInstance): IThrustDomInstance;
    add(obj: JQuery): IThrustDomInstance;

    andSelf(): IThrustDomInstance;

    children(selector?: any): IThrustDomInstance;

    closest(selector: string): IThrustDomInstance;
    closest(selector: string, context?: Element): IThrustDomInstance;
    closest(obj: IThrustDomInstance): IThrustDomInstance;
    closest(obj: JQuery): IThrustDomInstance;
    closest(element: any): IThrustDomInstance;
    closest(selectors: any, context?: Element): any[];

    contents(): IThrustDomInstance;

    end(): IThrustDomInstance;

    eq(index: number): IThrustDomInstance;

    filter(selector: string): IThrustDomInstance;
    filter(func: (index: any) =>any): IThrustDomInstance;
    filter(element: any): IThrustDomInstance;
    filter(obj: IThrustDomInstance): IThrustDomInstance;
    filter(obj: JQuery): IThrustDomInstance;

    find(selector?: string): IThrustDomInstance;
    find(element?: any): IThrustDomInstance;
    find(obj?: IThrustDomInstance): IThrustDomInstance;
    find(obj?: JQuery): IThrustDomInstance;

    first(): IThrustDomInstance;

    has(selector: string): IThrustDomInstance;
    has(contained: Element): IThrustDomInstance;

    is(selector: string): bool;
    is(func: (index: any) =>any): bool;
    is(element: any): bool;
    is(obj: IThrustDomInstance): bool;
    is(obj: JQuery): bool;

    last(): IThrustDomInstance;

    map(callback: (index: any, domElement: Element) =>any): IThrustDomInstance;

    next(selector?: string): IThrustDomInstance;

    nextAll(selector?: string): IThrustDomInstance;

    nextUntil(selector?: string, filter?: string): IThrustDomInstance;
    nextUntil(element?: Element, filter?: string): IThrustDomInstance;

    not(selector: string): IThrustDomInstance;
    not(func: (index: any) =>any): IThrustDomInstance;
    not(element: any): IThrustDomInstance;
    not(obj: IThrustDomInstance): IThrustDomInstance;
	not(obj: JQuery): IThrustDomInstance;

    offsetParent(): IThrustDomInstance;

    parent(selector?: string): IThrustDomInstance;

    parents(selector?: string): IThrustDomInstance;

    parentsUntil(selector?: string, filter?: string): IThrustDomInstance;
    parentsUntil(element?: Element, filter?: string): IThrustDomInstance;

    prev(selector?: string): IThrustDomInstance;

    prevAll(selector?: string): IThrustDomInstance;

    prevUntil(selector?: string, filter?:string): IThrustDomInstance;
    prevUntil(element?: Element, filter?:string): IThrustDomInstance;

    siblings(selector?: string): IThrustDomInstance;

    slice(start: number, end?: number): IThrustDomInstance;
}