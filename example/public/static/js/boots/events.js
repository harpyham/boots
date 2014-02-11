define(['jquery','underscore','backbone'],function($,_,Backbone){
    
    "use strict";
    var bObservable={
    
        
    };
    var Observable = function(opts)
    {
        return $.extend(true,bObservable,Backbone.Events,opts);
    };    
    //return Observable
    return _.extend(bObservable,Backbone.Events);
});