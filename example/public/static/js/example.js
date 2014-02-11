define('example', [ 'jquery','jquery.cookie','boots', 'boots.app' ], function ($,cookie, boots,app) {
    "use strict";
    return app({
        name: 'example',
        
        handleSidebarState : function () {
            // remove sidebar toggler if window width smaller than 900(for table and phone mode)
            var viewport = this.getViewPort();
            if (viewport.width < 992) {
                $('body').removeClass("page-sidebar-closed");
            }
        },
        handleSidebarAndContentHeight : function () {
            var content = $('.page-content');
            var sidebar = $('.page-sidebar');
            var body = $('body');
            var height;

            if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
                var available_height = $(window).height() - $('.footer').outerHeight();
                if (content.height() < available_height) {
                    content.attr('style', 'min-height:' + available_height + 'px !important');
                }
            } else {
                if (body.hasClass('page-sidebar-fixed')) {
                    height = _calculateFixedSidebarViewportHeight();
                } else {
                    height = sidebar.height() + 20;
                }
                if (height >= content.height()) {
                    content.attr('style', 'min-height:' + height + 'px !important');
                }
            }         
        },
        _calculateFixedSidebarViewportHeight : function () {
            var sidebarHeight = $(window).height() - $('.header').height() + 1;
            if ($('body').hasClass("page-footer-fixed")) {
                sidebarHeight = sidebarHeight - $('.footer').outerHeight();
            }

            return sidebarHeight;
        },
        handleFixedSidebar : function () {
            var menu = $('.page-sidebar-menu');

            if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
                menu.slimScroll({
                    destroy: true
                });
                menu.removeAttr('style');
                $('.page-sidebar').removeAttr('style');
            }

            if ($('.page-sidebar-fixed').size() === 0) {
                this.handleSidebarAndContentHeight();
                return;
            }

            var viewport = this.getViewPort();
            if (viewport.width >= 992) {
                var sidebarHeight = this._calculateFixedSidebarViewportHeight();

                menu.slimScroll({
                    size: '7px',
                    color: '#a1b2bd',
                    opacity: .3,
                    position: isRTL ? 'left' : 'right',
                    height: sidebarHeight,
                    allowPageScroll: false,
                    disableFadeOut: false
                });
                this.handleSidebarAndContentHeight();
            }
        },
        handleTheme : function () {

            var panel = $('.theme-panel');

            if ($('body').hasClass('page-boxed') == false) {
                $('.layout-option', panel).val("fluid");
            }

            $('.sidebar-option', panel).val("default");
            $('.header-option', panel).val("fixed");
            $('.footer-option', panel).val("default");

            //handle theme layout
            var resetLayout = function () {
                $("body").
                removeClass("page-boxed").
                removeClass("page-footer-fixed").
                removeClass("page-sidebar-fixed").
                removeClass("page-header-fixed");

                $('.header > .header-inner').removeClass("container");

                if ($('.page-container').parent(".container").size() === 1) {
                    $('.page-container').insertAfter('body > .clearfix');
                }

                if ($('.footer > .container').size() === 1) {
                    $('.footer').html($('.footer > .container').html());
                } else if ($('.footer').parent(".container").size() === 1) {
                    $('.footer').insertAfter('.page-container');
                }

                $('body > .container').remove();
            }

            var lastSelectedLayout = '';

            var setLayout = function () {

                var layoutOption = $('.layout-option', panel).val();
                var sidebarOption = $('.sidebar-option', panel).val();
                var headerOption = $('.header-option', panel).val();
                var footerOption = $('.footer-option', panel).val();

                if (sidebarOption == "fixed" && headerOption == "default") {
                    alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
                    $('.header-option', panel).val("fixed");
                    $('.sidebar-option', panel).val("fixed");
                    sidebarOption = 'fixed';
                    headerOption = 'fixed';
                }

                resetLayout(); // reset layout to default state

                if (layoutOption === "boxed") {
                    $("body").addClass("page-boxed");

                    // set header
                    $('.header > .header-inner').addClass("container");
                    var cont = $('body > .clearfix').after('<div class="container"></div>');

                    // set content
                    $('.page-container').appendTo('body > .container');

                    // set footer
                    if (footerOption === 'fixed') {
                        $('.footer').html('<div class="container">' + $('.footer').html() + '</div>');
                    } else {
                        $('.footer').appendTo('body > .container');
                    }
                }

                if (lastSelectedLayout != layoutOption) {
                    //layout changed, run responsive handler:
                    runResponsiveHandlers();
                }
                lastSelectedLayout = layoutOption;

                //header
                if (headerOption === 'fixed') {
                    $("body").addClass("page-header-fixed");
                    $(".header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
                } else {
                    $("body").removeClass("page-header-fixed");
                    $(".header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
                }

                //sidebar
                if (sidebarOption === 'fixed') {
                    $("body").addClass("page-sidebar-fixed");
                } else {
                    $("body").removeClass("page-sidebar-fixed");
                }

                //footer 
                if (footerOption === 'fixed') {
                    $("body").addClass("page-footer-fixed");
                } else {
                    $("body").removeClass("page-footer-fixed");
                }

                handleSidebarAndContentHeight(); // fix content height            
                handleFixedSidebar(); // reinitialize fixed sidebar
                handleFixedSidebarHoverable(); // reinitialize fixed sidebar hover effect
            }

            // handle theme colors
            var setColor = function (color) {
                $('#style_color').attr("href", "assets/css/themes/" + color + ".css");
                $.cookie('style_color', color);
            }

            $('.toggler', panel).click(function () {
                $('.toggler').hide();
                $('.toggler-close').show();
                $('.theme-panel > .theme-options').show();
            });

            $('.toggler-close', panel).click(function () {
                $('.toggler').show();
                $('.toggler-close').hide();
                $('.theme-panel > .theme-options').hide();
            });

            $('.theme-colors > ul > li', panel).click(function () {
                var color = $(this).attr("data-style");
                setColor(color);
                $('ul > li', panel).removeClass("current");
                $(this).addClass("current");
            });

            $('.layout-option, .header-option, .sidebar-option, .footer-option', panel).change(setLayout);

            if ($.cookie('style_color')) {
                setColor($.cookie('style_color'));
            }
        },
        
        init: function () {
            this.base_init();
            this.on('resize',this.handleSidebarState,this);
            this.on('resize',this.handleSidebarAndContentHeight,this);
            this.on('resize',this.handleFixedSidebar,this);            
            this.trigger('resize');
            this.handleTheme();
            
            if(boots.isIOS){
                $(document).on('focus', 'input, textarea', function () {
                    $('.header').hide();
                    $('.footer').hide();
                });
                $(document).on('blur', 'input, textarea', function () {
                    $('.header').show();
                    $('.footer').show();
                });
            }
            console.log("start app:" + this.name);
        }
    });
});



