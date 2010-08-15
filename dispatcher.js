(function(){
    var TRUE = true,
        FALSE = false;


    if(window["Dispatcher"]){
        return;
    }
    
    /**
    * Dispatcher
    * 
    * @class Dispatcher
    */
    window.Dispatcher = {

        /**
        * Stores the events as keys, and the callbacks as an array
        * @property events {Object}
        */
        events: {},
    
        /**
        * Stores the event Handler references so we can latter undo them
        * @property handlers {Array}
        */
        handlers: [],

        /**
        * Stores a reference to the container
        * @property element {DOMElement}
        */
        element: "",


        addHandler: function(event, handler){
            var events = this.events,
                handlers = this.handlers;
            if(!events[event]){
                events[event] = {};
                handlers.push(handler);
            }
        },
        subscribe: function(evnt, classname, callback, scope, prevent){
            var events = this.events;
        
            // If this is not an event we track already return false
            if(!events[evnt]) {
                return FALSE;
            }
            if(!events[evnt][classname]){
                events[evnt][classname] = [];
            }
            // If we do handle events like this push it on to the tobe notified stack
            events[evnt][classname].push({callback:callback, scope:scope,prevent:prevent});
            return TRUE;
        },
        
        /**
        * Returns the event handler with a bound scope
        * @method getHandler
        */
        getHandler: function(eventType){
            var self = this;
                handler = function(e){
                    self.handler(e);
                };
                // Register this with the internal registry of handlers.
                self.addHandler(eventType, handler);
                
            return handler;
        },

        /**
        * Handles all the events for this Dispatcher
        * @method handler
        * @private
        * @param event {Event} the event object
        */
        handler: function(e){
        
            var target = e.target || e.srcElement,
                etype = e.type,
                key = e.keyCode,
                YD = YAHOO.util.Dom,
                YE = YAHOO.util.Event,
                targetClasses = YD.getAttribute(target, 'className') ? YD.getAttribute(target, 'className').split(/\s+/) : '',
                classIdx = targetClasses.length,
                events = this.events,
                className,
                currentExecute,
                i;
            console.log(this);
            while (classIdx--) {
                className = targetClasses[classIdx];
            
                if( events[etype] && events[etype][className]){
                    for(i in events[etype][className]){
                        currentExecute = events[etype][className][i];
                        if(currentExecute["prevent"]){
                            console.log("preventing");
                            YE.preventDefault(e);
                        }
                        currentExecute["callback"].apply(currentExecute["scope"], [target]);
                    }  
                }
            }
        },
    
        /**
        * Unload all the events that were attached.
        * @method unhandle
        */
        unload: function(){
            var evnts = this.events,
                i;
            for(i in evnts){
                YAHOO.util.Event.removeListener(this.element, i, this.handler);
            }
        
        }
    
        /**
        * Stores the events as keys, and the callbacks as an array
        * @method init
        * @param element {DOMElement} the top level element that will act as dispatcher
        * @param events  {Array} an array of events to dispatch for this element
        */
        /*
        init: function(element, events){
            var el = this.element = element,
                YL = YAHOO.lang,
                YE = YAHOO.util.Event,
                i;
            events = this.events = YL.merge(this.events,events);
            var handler = function(e){
                var that = this;
                return that.handler;
            };
            for(i in events){
                YE.on(el, i,this.handler, this, TRUE );
                //YE.on(el, i,function(e){ console.log(e); }, {}, this);
            }
        
            newDispatcher = YL.merge({},this);
            //this.unhandle();
            return newDispatcher; 

        }
        */

    };
    
    
})();