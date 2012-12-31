// Type definitions for Knockout.Mapping 2.0
// Project: https://github.com/SteveSanderson/knockout.mapping
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions https://github.com/borisyankov/DefinitelyTyped


interface KnockoutMappingOptions {
    ignore;
    include;
    copy;
    mappedProperties;
    deferEvaluation;
}

interface KnockoutMapping {
    isMapped(viewModel: any): bool;
    fromJS(jsObject: any): any;
    fromJS(jsObject: any, targetOrOptions: any): any;
    fromJS(jsObject: any, inputOptions: any, target: any): any;
    fromJSON(jsonString: string): any;
    toJS(rootObject: any, options?: KnockoutMappingOptions): any;
    toJSON(rootObject: any, options?: KnockoutMappingOptions): any;
    defaultOptions(): KnockoutMappingOptions;
    resetDefaultOptions(): void;
    getType(x: any): any;
    visitModel(rootObject: any, callback: Function, options?: { visitedObjects?; parentName?; ignore?; copy?; include?; } ): any;
}

interface KnockoutStatic {
    mapping: KnockoutMapping;
}

declare module 'knockout.mapping' 
{
	export function isMapped(viewModel: any): bool;
    export function fromJS(jsObject: any): any;
    export function fromJS(jsObject: any, targetOrOptions: any): any;
    export function fromJS(jsObject: any, inputOptions: any, target: any): any;
    export function fromJSON(jsonString: string): any;
    export function toJS(rootObject: any, options?: KnockoutMappingOptions): any;
    export function toJSON(rootObject: any, options?: KnockoutMappingOptions): any;
    export function defaultOptions(): KnockoutMappingOptions;
    export function resetDefaultOptions(): void;
    export function getType(x: any): any;
    export function visitModel(rootObject: any, callback: Function, options?: { visitedObjects?; parentName?; ignore?; copy?; include?; } ): any;
}