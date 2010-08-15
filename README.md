# A class-keyed function dispatcher.

The point is to attach the minimum of events to the dom, and support late registration of code modules.

## How To Use

1. Include dispatcher.js into an HTML file
2. Create a new copy, using a deep merge how ever
    * In jquery: myDispatcher = jQuery.extend({}, Dispatcher);
    * In YUI2: myDispatcher = YAHOO.lang.merge({},Dispatcher);
3. Create event handlers and subscribe the dispatcher to it 
    * IN YUI2 handle = YAHOO.util.Event.on(main_dom , "click",my_dispatcher.getHandler("click"));
    * In jQuery: jQuery.click(my_dispatcher.getHandler("click"));
        * jQuery has event delegation built in just use live, this is for example. 
4. Subscribe functions, to class names: The arguments are
    * The Event type
    * the class name you want to key off of
    * the callback
    * the callback scope
    * wether or not you want to prevent default, boolean
    

    my_dispatcher.subscribe(
        "click",  // Event Type
        "red",    // Class Name
        function(target){ 
            console.log("Is Red"); 
            return false;
        
        }, // Callback 
        scopeObject,
        true
    );
    
    