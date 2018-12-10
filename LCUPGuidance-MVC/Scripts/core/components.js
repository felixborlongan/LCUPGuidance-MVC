var $ = jQuery.noConflict();
var MAIN = MAIN || {};
(function ($) {
    //*--- Preloader
    MAIN.preloader = {
        close: function () {
            setTimeout(function () {
                $('body').removeClass('preloading');
                $('#preloader').removeClass("fadeInUp").addClass("fadeOut");
            }, 1000);
        }
    };
    
    //*--- NAVIGATION
    MAIN.navigation = {
        init: function () {
            MAIN.navigation.mobileMenu();
        },
        mobileMenu: function() {
            $('.navbar-toggle').click(function () {
                $('.main-nav').toggle();
                $('.sub-nav').removeClass('slide-in');
            })
            $('.main-nav > li > a').click(function () {
                event.preventDefault();
                $(this).siblings('.sub-nav').toggleClass('slide-in');
            });
            $('.mobile-top-link button').click(function () {
                $(this).parents('.sub-nav').toggleClass('slide-out');
            });
        }
    };

    //*--- COMPONENTS
    MAIN.components = {
        init: function () {
            MAIN.components.C016();
        },
        Test: function() {
            alert('catch');
        },
        C016: function () {
            /* C016 - TABS Jquery*/
            /* 1.) Must set a selected tab by default, in this case Tab 1 is selected */
            /* 2.) Instantiate C016 Tab on document ready */
            /* NOTE: Every anchor must have data attribute ex: data-tab="tabComponent1" as this will serve as the call for active tab */
            var activeC016_item = $('.C016-horizontal-tabs .nav li a.selected').attr("data-tab");
            $(".tab-content").hide();
            $("#" + activeC016_item).show();

            /* 3.) Tabs switch content by clicking, adding class to the clicked tab and removing class to the old tab */
            /* 4.) This code also hide All tabs and show the corresponding Tab of the Clicked Anchor Tab */
            /* NOTE: every tab component must have an ID similar to this: id="tabComponent1", id="tabComponent2" and etc. */
            $('.C016-horizontal-tabs .nav li a').on("click", function () {
                event.preventDefault();
                $(this).addClass("selected");
                $(this).parents().siblings().children("a").removeClass("selected");
                var activeC016_item = $('.C016-horizontal-tabs .nav li a.selected').attr("data-tab");
                $(this).parents('.tabs-header').siblings('.tab-content').hide();
                $("#" + activeC016_item).show();
            });
        },
        JN_Scroll: function () {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                  .parent().removeClass("active")
                  .end().filter("[href='#" + id + "']").parent().addClass("active");
            }
        }
        
    };

    MAIN.ImageResponsive = {

       init: function() {
           MAIN.ImageResponsive.HComponents();
       },
       HComponents: function() {
           var WindowWidth = $(window).width();
           if ((WindowWidth <= 768)) {

               $('.H003-mini-hero img, .H002-hero img, .VN015-featured-navigation-banners img, .C010-big-feature-image-left img').attr('src', function (index, src) {
                   return src.replace(".jpg", "_768.jpg");
               });
           }
       }
    };
    /*--- DOCUMENT ON READY ---*/
    MAIN.documentOnReady = {
        init: function () {
            MAIN.navigation.init();
            MAIN.components.init();
            MAIN.ImageResponsive.init();
        }
    };

    /*--- WINDOW SCROLL ---*/
    MAIN.windowOnScroll = {
        init: function () {
          
        }
    };
    


    //*--- END Function
})(jQuery);

//* Instantiate all functions declared on MAIN.documentOnReady.init
$(document).ready(MAIN.documentOnReady.init);

//* Instantiate all functions declared on MAIN.windowOnScroll.init
$(window).scroll(MAIN.windowOnScroll.init);


/* --- JUMP NAVIGATION ---*/
    // Cache selectors
    var lastId,
        topMenu = $("#jump-nav"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });


    // Bind to scroll
    $(window).scroll(function () {


        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
              .parent().removeClass("active")
              .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });