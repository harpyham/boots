/**
Core script to handle the entire layout and base functions
**/
define(['jquery','boots','boots.events'], function (jQuery,boots,events) {
    
    "use strict";
    
    var bApp = {
        name:'boots',
        init:function(){
        },
        getViewPort : function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            }
        },
        // wrapper function to  block element(indicate loading)
        blockUI: function (el, centerY) {
            var el = jQuery(el);
            if (el.height() <= 400) {
                centerY = true;
            }
            el.block({
                message: '<img src="/static/images/ajax-loading.gif" align="">',
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
             jQuery(el).unblock({
                onUnblock: function () {
                    jQuery(el).css('position', '');
                    jQuery(el).css('zoom', '');
                }
            });
        },

       scrollTo: function (el, offeset) {
            pos = (el && el.size() > 0) ? el.offset().top : 0;
            jQuery('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
            }, 'slow');
        },

        // function to scroll to the top
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
       
        toggleFullScreen:function() {
          if (!document.fullscreenElement &&    // alternative standard method
              !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          } else {
            if (document.cancelFullScreen) {
              document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            }
          }
        },
       
        base_init: function() {
            boots.init();
                   
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