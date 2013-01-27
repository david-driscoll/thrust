define(["require", "exports"], function(require, exports) {
    /**
    
    @module thrust.data
    @for thrust.data
    **/
    /**
    The `thrust/data/wait` event is fired once a data call is made.
    
    @event thrust/data/wait
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    **/
    exports.wait = 'thrust/data/wait';
    /**
    The `thrust/data/start` event is fired the queue is started.
    
    @event thrust/data/start
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The outgoing call count
    **/
    exports.start = 'thrust/data/start';
    /**
    The `thrust/data/status` event is fired for every item that returns from the queue.
    
    NOTE: It is entirely possible for `thrust/data/status** to be called after `thrust/data/stop** if several
    calls take to long to complete.  This is intended, and potentially useful information.
    
    @event thrust/data/status
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The current completed call count for this queue.
    **/
    exports.status = 'thrust/data/status';
    /**
    The `thrust/data/stop` event is fired when all items in the queue return, or the finishedTimeout setting elapses.
    
    @event thrust/data/stop
    @param {String} queryId The internal id of the outbound queue.
    @param {String} type The type of the outbound event queue (Get/Post/etc)
    @param {Number} count The (current) completed call count for this queue.
    **/
    exports.stop = 'thrust/data/stop';
    exports.event = {
        beforeSend: /**
        The `thrust/data/event/before-send` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/before-send
        @private
        **/
        'thrust/data/event/before-send',
        start: /**
        The `thrust/data/event/start` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/start
        @private
        **/
        'thrust/data/event/start',
        send: /**
        The `thrust/data/event/send` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/send
        @private
        **/
        'thrust/data/event/send',
        error: /**
        The `thrust/data/event/error` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/error
        @private
        **/
        'thrust/data/event/error',
        success: /**
        The `thrust/data/event/success` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/success
        @private
        **/
        'thrust/data/event/sucess',
        complete: /**
        The `thrust/data/event/complete` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/complete
        @private
        **/
        'thrust/data/event/complete',
        stop: /**
        The `thrust/data/event/stop` event is wrapped by thrust, and fired through jQuery.
        
        
        NOTE: Marked as private because this event exposes underlying jQuery arguments, and may
        be changed in the future.
        
        @event thrust/data/event/stop
        @private
        **/
        'thrust/data/event/stop'
    };
})
//@ sourceMappingURL=event.types.js.map
