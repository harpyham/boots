define(['jquery','bootstrap'], function ($) {
    "use strict";

    var bMenu = {
        renderTo:null,
        el:null,
        init : function (opt) {
            if (this.renderTo === undefined)
            {
                this.renderTo = '.boots-menu';
            }
            this.el=$(this.renderTo);
            this.handleMenu();
        },
        handleMenu : function () {
            this.el.on('click', 'li > a', function (e) {
                    if ($(this).next().hasClass('sub-menu') === false) {
                       /* if ($('.btn-navbar').hasClass('collapsed') === false) {
                            $('.btn-navbar').click();
                        }*/
                        return;
                    }
    
                    var parent = $(this).parent().parent();
    
                    parent.children('li.open').children('a').children('.arrow').removeClass('open');
                    parent.children('li.open').children('.sub-menu').slideUp(200);
                    parent.children('li.open').removeClass('open');
    
                    var sub = $(this).next();
                    if (sub.is(":visible")) {
                        $('.arrow', $(this)).removeClass("open");
                        $(this).parent().removeClass("open");
                        sub.slideUp(200, function () {
                              //  handleSidebarAndContentHeight();
                            });
                    } else {
                        $('.arrow', $(this)).addClass("open");
                        $(this).parent().addClass("open");
                        sub.slideDown(200, function () {
                            //    handleSidebarAndContentHeight();
                            });
                    }
    
                    e.preventDefault();
                });
    
            // handle ajax links
            this.el.on('click', ' li > a.ajaxify', function (e) {
                    e.preventDefault();
                    App.scrollTop();
    
                    var url = $(this).attr("href");
                    var menuContainer = $('.page-sidebar ul');
                    var pageContent = $('.page-content');
                    var pageContentBody = $('.page-content .page-content-body');
    
                    menuContainer.children('li.active').removeClass('active');
                    menuContainer.children('arrow.open').removeClass('open');
    
                    $(this).parents('li').each(function () {
                            $(this).addClass('active');
                            $(this).children('a > span.arrow').addClass('open');
                        });
                    $(this).parents('li').addClass('active');
    
                    App.blockUI(pageContent, false);
    
                    $.post(url, {}, function (res) {
                            App.unblockUI(pageContent);
                            pageContentBody.html(res);
                            App.fixContentHeight(); // fix content height
                            App.initUniform(); // initialize uniform elements
                        });
                });
        }

    };
    var boots_menu = function (opts) {
        var bopts=opts;
        if( typeof opts === "string")
        {
            bopts={'renderTo':opts};
        }
        
        var bmenu = $.extend({},bMenu,bopts);
        bmenu.init();
        return bmenu;
    };
    $.extend(true,$.boots,{'menu':boots_menu});
    return boots_menu;
});
