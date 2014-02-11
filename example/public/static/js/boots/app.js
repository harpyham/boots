/**
Core script to handle the entire layout and base functions
**/
define(['jquery'], function ($) {
    
    "use strict";
    
    var bApp = {
        name:'boots',
        init:function(){
        },
        base_init: function() {
            
        }
    };
    
    var App = function(opts){
        var bopts=bApp;
        if (typeof(opts) === "object")
        {
            bopts=$.extend(true,bApp,opts);
        }
        else if (typeof(opts) === "string" )
        {
            bopts = $.extend(true,bApp,{'name':opts});
        }
        return bopts;
    };
    
    return App;

});