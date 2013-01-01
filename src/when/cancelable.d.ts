/// <reference path="../when.d.ts" />
interface CancelableDeferred extends Deferred
{
	cancel();
}

interface WhenCancelable
{
	(deferred: Deferred, canceler: Function): CancelableDeferred;
}

declare module 'when/cancelable'
{
	export function (deferred: Deferred, canceler: Function): CancelableDeferred;
}