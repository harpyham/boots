/**
Core script to handle the entire layout and base functions
**/
define(['jquery'], function ($) {
    "use strict";
    // IE mode
       //* END:CORE HANDLERS *//

    var boots= {
        isRTL : false,
        isIE8 : false,
        isIE9 : false,
        isIE10 : false,
        isTouchDevice: false,
        isIOS :false,
        isIPhone:false,
        isIPad:false,
        isIPod:false,
        //main function to initiate template pages
        init: function () {

            //IMPORTANT!!!: Do not modify the core handlers call order.

            //core handlers
            this.handleInit();
           
        },

       getActualVal: function (el) {
            var el = $(el);
            if (el.val() === el.attr("placeholder")) {
                return "";
            }

            return el.val();
        },

        getURLParameter: function (paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        },
        
        handleInit:function(){
            if ($('body').css('direction') === 'rtl') {
                this.isRTL = true;
            }
    
            this.isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
            this.isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
            this.isIE10 = !!navigator.userAgent.match(/MSIE 10/);
            
            if (this.isIE10) {
                $('html').addClass('ie10'); // detect IE10 version
            }
            // check for device touch support        
            try {
                document.createEvent("TouchEvent");
                this.isTouchDevice = true;
            } catch (e) {
                this.isTouchDevice = false;
            }
            var deviceAgent = navigator.userAgent.toLowerCase();
            if (deviceAgent.match(/iphone/)) {
                this.isIPhone = true;
            }
            if (deviceAgent.match(/ipod/)) {
                this.isIPod = true;
            }
            if (deviceAgent.match(/ipad/)) {
                this.isIPad = true;
            }
            this.isIOS = this.isIPad ||this.isIPhone||this.isIPod;
            
        }

        

    };
    boots.init();
    return boots;
});