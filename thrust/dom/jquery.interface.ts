    import jQuery = module('jquery');

    var jQueryMethodBlackList = ['constructor', 'init', 'selector', 'jquery', 'ready', 'extend', 'queue', 'dequeue', 'clearQueue', 'promise', 'bind', 'unbind', 'live', 'die', 'delegate', 'undelegate', 'blur', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'error', 'domManip', 'serialize', 'serializeArray', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend', '_toggle', 'fadeTo', 'stop', 'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle', 'on', 'off', 'one'],
        slice = Array.prototype.slice;

    //#region jQuery Interface Layer
    export function updatejQueryInternals(selector : any)
    {
        if (selector)
            this._context = jQuery(selector);
        this.context = this._context.context;
        this.selector = this._context.selector;

        for (var i = this.length || 0, iLen = this._context.context; i < iLen; i++)
            delete this[i];

        this.length = this._context.length;
        for (var i = 0, iLen = this.length; i < iLen; i++)
            this[i] = this._context[i];
    }

    export function initalizeContext(context)
    {
        this._context = context instanceof jQuery ? context : jQuery(context);
        updatejQueryInternals.call(this);
    }

    export function jQueryMethodWrap(method : string, DomFacade)
    {
        return function ()
        {
            var args = slice.call(arguments);
            for (var i = 0, iLen = args.length; i < iLen; i++)
                if (args[i] instanceof DomFacade)
                    args[i] = args[i]._context;

            if (this._context)
            {
                var ret = this._context[method].apply(this._context, args);

                if (ret instanceof jQuery)
                {
                    if (ret.selector === this.selector && ret.context === this.context)
                    {
                        updatejQueryInternals.call(this, ret);
                        return this;
                    }
                    return new DomFacade(this.module, this, ret, true);
                }
                updatejQueryInternals.call(this);
                return ret;
            }
        };
    }

    export function updateThrustDomPrototype(proto, DomFacade)
    {
        /*jshint loopfunc:true */
        for (var i in jQuery.fn)
            if (Object.hasOwnProperty.call(jQuery.fn, i) && !proto[i] && !jQueryMethodBlackList.some(function (e, index) { return e === i; }))
                proto[i] = jQueryMethodWrap(i, DomFacade);
        proto.$ = proto.find;
    }
    //#endregion
