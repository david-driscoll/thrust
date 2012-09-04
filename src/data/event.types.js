/**

@module thrust.data
@for thrust.data
**/
define({
    /**
    The `thrust/data/wait` event is fired once a data call is made.

    @event thrust/data/wait
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    **/
    wait: 'thrust/data/wait',
    /**
    The `thrust/data/start` event is fired the queue is started.

    @event thrust/data/start
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The outgoing call count
    **/
    start: 'thrust/data/start',
    /**
    The `thrust/data/status` event is fired for every item that returns from the queue.

    NOTE: It is entirely possible for `thrust/data/status** to be called after `thrust/data/stop** if several
        calls take to long to complete.  This is intended, and potentially useful information.

    @event thrust/data/status
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The current completed call count for this queue.
    **/
    status: 'thrust/data/status',
    /**
    The `thrust/data/stop` event is fired when all items in the queue return, or the finishedTimeout setting elapses.

    @event thrust/data/stop
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The (current) completed call count for this queue.
    **/
    stop: 'thrust/data/stop',
    event: {
        /**
        The `thrust/data/event/before-send` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/before-send
        @private
        **/
        beforeSend: 'thrust/data/event/before-send',
        /**
        The `thrust/data/event/start` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/start
        @private
        **/
        start: 'thrust/data/event/start',
        /**
        The `thrust/data/event/send` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/send
        @private
        **/
        send: 'thrust/data/event/send',
        /**
        The `thrust/data/event/error` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/error
        @private
        **/
        error: 'thrust/data/event/error',
        /**
        The `thrust/data/event/success` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/success
        @private
        **/
        success: 'thrust/data/event/sucess',
        /**
        The `thrust/data/event/complete` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/complete
        @private
        **/
        complete: 'thrust/data/event/complete',
        /**
        The `thrust/data/event/stop` event is wrapped by thrust, and fired through jQuery.


        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.

        @event thrust/data/event/stop
        @private
        **/
        stop: 'thrust/data/event/stop'
    }
});