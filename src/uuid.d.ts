declare module 'uuid'
{
    export function v1(options?: { node?: number[]; clockseq: number; msecs: Date; nsecs: number; }, buffer?: number[], offset?: number) : string;
    export function v4(options?: { random?: number[]; rng?: () => number[]; }, buffer?: number[], offset?: number) : string;
    export function parse(id: string, buffer?: number[], offset?: number);
    export function unparse(buffer: number[], offset?: number);
}
