/**
Core script to handle the entire layout and base functions
**/
define(['jquery','boots','boots.events'], function ($,boots,events) {
    
    "use strict";
    
    var bApp = {
        name:'boots',
        init:function(){
        },
        tabletWidth:1280,
        // wrapper function to  block element(indicate loading)
        blockUI: function (el, centerY) {
            var el = $(el); 
            el.block({
                    message: '<img src="./assets/img/ajax-loading.gif" align="">',
                    centerY: centerY != undefined ? centerY : true,
                    css: {
                        top: '10%',
                        border: 'none',
                        padding: '2px',
                        backgroundColor: 'none'
                    },
                    overlayCSS: {
                        backgroundColor: '#000',
                        opacity: 0.05,
                        cursor: 'wait'
                    }
                });
        },

        // wrapper function to  un-block element(finish loading)
        unblockUI: function (el) {
            $(el).unblock({
                    onUnblock: function () {
                        $(el).removeAttr("style");
                    }
                });
        },

        
        // useful function to make equal height for contacts stand side by side
        setEqualHeight: function (els) {
            var tallestEl = 0;
            els = $(els);
            els.each(function () {
                    var currentHeight = $(this).height();
                    if (currentHeight > tallestEl) {
                        tallestColumn = currentHeight;
                    }
                });
            els.height(tallestEl);
        },

        // wrapper function to scroll to an element
        scrollTo: function (el, offeset) {
            pos = el ? el.offset().top : 0;
            $('html,body').animate({
                    scrollTop: pos + (offeset ? offeset : 0)
                }, 'slow');
        },

        scrollTop: function () {
            this.scrollTo();
        },

        handleResponsiveOnResize : function () {
            var resize;
            var app = this;
            if (boots.isIE8) {
                var currheight;
                $(window).resize(function() {
                    if(currheight == document.documentElement.clientHeight) {
                        return; //quite event since only body resized not window.
                    }                
                    if (resize) {
                        clearTimeout(resize);
                    }   
                    resize = setTimeout(function() {
                        app.trigger('resize');
                        //app.handleResponsive();    
                    }, 50); // wait 50ms until window resize finishes.                
                    currheight = document.documentElement.clientHeight; // store last body client height
                });
            } else {
                $(window).resize(function() {
                    if (resize) {
                        clearTimeout(resize);
                    }   
                    resize = setTimeout(function() {
                        console.debug('resize');
                        app.trigger('resize');
                        //app.handleResponsive();    
                    }, 50); // wait 50ms until window resize finishes.
                });
            }   
        },
        handleDesktopTabletContents : function () {
        // loops all page elements with "responsive" class and applies classes for tablet mode
        // For metornic  1280px or less set as tablet mode to display the content properly
            if ($(window).width() <= this.tabletWidth || $('body').hasClass('page-boxed')) {
                $(".responsive").each(function () {
                    var forTablet = $(this).attr('data-tablet'),
                        forDesktop = $(this).attr('data-desktop');
                    if (forTablet) {
                        $(this).removeClass(forDesktop);
                        $(this).addClass(forTablet);
                    }
                });
            }

            // loops all page elements with "responsive" class and applied classes for desktop mode
            // For metornic  higher 1280px set as desktop mode to display the content properly
            if ($(window).width() > this.tabletWidth && $('body').hasClass('page-boxed') === false) {
                $(".responsive").each(function () {
                    var forTablet = $(this).attr('data-tablet'),
                        forDesktop = $(this).attr('data-desktop');
                    if (forTablet) {
                        $(this).removeClass(forTablet);
                        $(this).addClass(forDesktop);
                    }
                });
            }
        },
        onResponsive:function(){
            console.log('handleResponsive');
            this.handleDesktopTabletContents();
        },
        base_init: function() {
            boots.init();
            this.on('resize',this.onResponsive,this);
         
            this.handleResponsiveOnResize();
            this.trigger('resize');
        }
    };
    $.extend(bApp,events);
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