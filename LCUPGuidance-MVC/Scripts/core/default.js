
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

    //*--- 
    MAIN.navigation = {
        init: function () {
            var self = this;

            self.activeMenu();
            self.activeMenu();
            self.adminBtnFcn();
            self.adminMaskClose();
            self.mobileMaskClose();
            self.mobileBtnFcn();
            self.mobileNavigation = $("#mobileNavigation");
           // MAIN.navigation.resizeHeader();
        },

        activeMenu: function () {
            var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
            var segment_array = segment_str.split('/'); // split the 
            last_segment = segment_array[segment_array.length - 1]; // get the last part of url
            var segmented_link = last_segment.split('?')[0];
            $(".primary-navigation__selection a[href*='" + last_segment + "']").addClass("active");
            $(".left-navigation a[href='/" + last_segment + "']").addClass("current-page");
            $(".mobile-navigation__selection a[href*='" + last_segment + "']").addClass("active");
            $("#mobileNavigation .primary-navigation__selection a[href*='" + last_segment + "']").addClass("active");
        },
        adminBtnFcn: function () {
            $('.left-navigation .left-navigation-btn').on('click', function () {
                $('.left-navigation').toggleClass('active');
                if ($('.left-navigation').hasClass('active')) {
                    $('#navmask').addClass('active');
                } else {
                    $('#navmask').removeClass('active');
                }
            });
        },
        adminMaskClose: function () {
            $('#navmask').on('click', function () {
                $('.left-navigation-btn').trigger('click');
                $(this).removeClass('active');         
            });
        },
        mobileMaskClose: function () {
            $('#mobileMenuMask').on('click', function () {   
                $('#mobileNavBtn').trigger('click');
                $(this).removeClass('active');
            });
        },
        mobileBtnFcn: function () {
            $('#mobileNavBtn').click(function () {
                $('#mobileMenuMask').toggleClass('active');
                $('#mobileNavigation').toggleClass('nav-active');
                $("#mask").toggleClass("hidden");
                $(this).toggleClass('active');
            });
        },
        resizeHeader: function () {
            if ($(window).scrollTop() >= 20) {
                $('body').addClass('scrolled');
            } else {
                $('body').removeClass('scrolled');
            }
        }
    };

    MAIN.elements = {
        init: function () {
            MAIN.elements.modalMaskClose();
            MAIN.elements.dataTableHighlight();
            MAIN.elements.stickyBanner();
            MAIN.elements.scrollToTop();
            MAIN.elements.clickToTopBtn();
            MAIN.elements.styledCheckbox(); 
            MAIN.elements.modalClose(); 
        },
        checkbox: function () {
            var checkboxes = document.querySelectorAll('input[type="checkbox"]'),
                setChecked = null;

            (setChecked = function (i) {
                checkboxes[i].checked = true;

                if (i < checkboxes.length - 1) {
                    setTimeout(setChecked, 180, i + 2);
                }
            })(0);
        },
        modalClose: function (modalID) {
            $('.modal-close').on('click', function () {
                if ($(this).parent(modalID).hasClass('modal-container-right')) {
                    if ($(this).parent(modalID).hasClass('modal-level-2')) {
                        modalFadeOutRightLevel2(modalID);
                    } else {
                        alert('here');
                        modalFadeOutRight(modalID);
                    }
                } else {
                    if ($(this).parent().hasClass('modal-level-2')) {
                        modalFadeOutDownLevel2(modalID);
                    } else {
                        modalFadeOutDown(modalID);
                    }
                }
            });
        },
        modalMaskClose: function () {
            $('#modalMask').on('click', function () {
               // $(this).removeClass('active');
                $('.modal-container.modal-level-1.active .modal-close').trigger('click');
            });
        },
        dataTableHighlight: function () {
            //* In order to have the whole row highlighted, the checkbox must have an id="chkrow"
            $('input[id*="chkrow"]').on('change', function () {
                if (this.checked) {
                    $(this).parent().addClass('selected').siblings('td').addClass('selected');
                } else {
                    $(this).parent().removeClass('selected').siblings('td').removeClass('selected');
                }
            });
        },
        stickyBanner: function () {
            
            var navHeight = $('.master-header').outerHeight();
            var bannerHeight = $('.jumbo-header').outerHeight();
            var mainPadding = navHeight + bannerHeight + 5;
            

            if ($('.jumbo-header.slide-out').length) {
                $('main#wrap').css("padding-top", navHeight);
            }

            var windowsize = $(window).width();
            if (windowsize < 768) {
                $('.jumbo-header').removeClass("sticky-header");
                
                if ($('.jumbo-header.slide-out').length) {
                    $('main#wrap').css("padding-top", navHeight);
                } else {
                    $('main#wrap').css("padding-top", "0");
                }
            } else {
                
                if ($('.jumbo-header').length) {
                    //$('main#wrap').css("padding-top", "10px");
                    if ($('.jumbo-header.sticky-header').length) {

                        $('main#wrap').css("padding-top", mainPadding);
                    }
                    if ($('.jumbo-header.slide-out').length) {
                        $('main#wrap').css("padding-top", navHeight);
                    }
                }
            }
        },
        scrollToBottom: function () {
            var div = $("body").height();
            var win = $(window).height();
            if (div > win) {
                console.log('win');
            }
        },
        scrollToTop: function () {
            
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                $('#toTop').show();
            } else {
                $('#toTop').hide();
            }
        },
        clickToTopBtn: function () {
            $('#toTop').on('click', function () {
                document.body.scrollTop = 0; // For Chrome, Safari and Opera 
                document.documentElement.scrollTop = 0; // For IE and Firefox
            });
            
        },
        styledCheckbox: function () {
            $('input[type="checkbox"]').addClass("checkbox checkbox--light-green");
        }
    };

    MAIN.plugins = {
        init: function () {
            MAIN.plugins.tooltip();
            MAIN.plugins.smoothScroll();
        },
        tooltip: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
        smoothScroll: function () {
            // Select all links with hashes
            $('a[href*="#"]')
                // Remove links that don't actually link to anything
                .not('[href="#"]')
                .not('[href="#0"]')
                .click(function (event) {
                    // On-page links
                    if (
                        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                        &&
                        location.hostname === this.hostname
                    ) {
                        // Figure out element to scroll to
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        // Does a scroll target exist?
                        if (target.length) {
                            // Only prevent default if animation is actually gonna happen
                            event.preventDefault();
                            $('html, body').animate({
                                scrollTop: target.offset().top
                            }, 700, function () {
                                // Callback after animation
                                // Must change focus!
                                var $target = $(target);
                                $target.focus();
                                if ($target.is(":focus")) { // Checking if the target was focused
                                    return false;
                                } else {
                                    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                    $target.focus(); // Set focus again
                                }
                            });
                        }
                    }
                });
        }
    };
    /*--- DOCUMENT ON READY ---*/
    MAIN.documentOnReady = {
        init: function () {
            //MAIN.preloader.close();
            MAIN.navigation.init();
           // MAIN.elements.init();
            //MAIN.plugins.init();
        }
    };
 
    /*--- WINDOW ON SCROLL ---*/
    MAIN.windowOnScroll = {
        init: function () {
            //MAIN.windowOnScroll.stickyNavigation();
            // MAIN.windowOnScroll.stickyBanner();
            MAIN.elements.scrollToTop();
            MAIN.navigation.resizeHeader();
        },
        stickyNavigation: function () {
            if ($(window).scrollTop() >= 10) {
                $('#primary-navigation').addClass('scrolled');
            } else {
                $('#primary-navigation').removeClass('scrolled');
            }
        },
        stickyBanner: function () {
            if ($(window).scrollTop() >= 30) {
                $('.jumbo-header').addClass('scrolled');
            } else {
                $('.jumbo-header').removeClass('scrolled');
            }
        }
    };

    MAIN.windowOnResize = {
        init: function () {
            //MAIN.windowOnResize.dataTable();
        },
        dataTable: function () {
            $('.table').dataTable();
        }
    };

})(jQuery);

$(document).ready(MAIN.documentOnReady.init);
$(window).scroll(MAIN.windowOnScroll.init);
$(window).resize(MAIN.elements.stickyBanner);
$(window).on('load', function () {
    
});

function swiperSlider() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false
    });
}

$(document).ready(function () {

    

});


function modalFadeOutDown(modalID, modalLevel) {
    $(modalID).removeClass('fadeInUp').addClass("fadeOutDown");
    switch (modalLevel) {
        case 1:
        default:
            setTimeout(function () {
 
                $('#modalMask').removeClass("active");
            }, 200);
            break;
        case 2:
            setTimeout(function () {
                $('#modalMaskLevel2').removeClass("active");
            }, 200);
            break;  
    }
    $('body').removeClass('modal-open');
}


function modalFadeOutRight(modalID,modalLevel) {
    $(modalID).removeClass('fadeInRight').addClass("fadeOutRight");
    switch (modalLevel) {
        case 1:
        default:
            setTimeout(function () {
                $('#modalMask').removeClass("active");
            }, 200);
            break;
        case 2:
            setTimeout(function () {
                $('#modalMaskLevel2').removeClass("active");
            }, 200);
            break;  
    }
    $('body').removeClass('modal-open');
}

//*--- Function for opening a modal ---*//
function initModal(modalID, modalLevel) {
    switch (modalLevel) {
        case 2:
            //code
            $('#modalMaskLevel2').addClass('active');
            $(modalID).addClass('modal-level-2');
            break;
        case 3:
            //code
            $('#modalMaskLevel3').addClass('active');
            $(modalID).addClass('modal-level-3');
            break;
        default:
            $('#modalMask').addClass('active');
            $(modalID).addClass('modal-level-1');

    }
    $('body').addClass('modal-open');

    if ($(modalID).hasClass("modal-container-right")) {
        
        $(modalID).removeClass('fadeOutRight').addClass('active animated fadeInRight');
        $(modalID + ' .modal-close').addClass("modal-close-fadeOutRight");
    } else {
        $(modalID).removeClass('fadeOutDown').addClass('active animated fadeInUp');
        $(modalID + ' .modal-close').addClass("modal-close-fadeOutDown");
    }
 


    //$('.modal-level-3 .modal-close').on('click', function () {
    //    setTimeout(function () {
    //        $(modalID).removeClass('fadeInUp').addClass("fadeOutDown");
    //        $('#modalMaskLevel2').removeClass("active");
    //    }, 200);
    //    $('body').removeClass('modal-open');
    //});

    $(modalID + ' .modal-close').on('click', function () {
        //var logss = $(this).parent();
        //console.log(logss);
        if ($(this).parent(modalID).hasClass('modal-container-right')) {
            if ($(this).parent(modalID).hasClass('modal-level-2')) {
                modalFadeOutRight(modalID,2);
            } else {
                modalFadeOutRight(modalID,1);
            }
        } else {
            if ($(this).parent(modalID).hasClass('modal-level-2')) {
                modalFadeOutDown(modalID,2);
            } else {
                modalFadeOutDown(modalID,1);
            }
        }
    });
    
}



//*--- Reinstantiate Close function when using AJAX
function closeModal(modalID) {
    $(modalID + ' .modal-close').on('click', function () {
        //var logss = $(this).parent();
        //console.log(logss);
        if ($(this).parent(modalID).hasClass('modal-container-right')) {
            if ($(this).parent(modalID).hasClass('modal-level-2')) {
                modalFadeOutRight(modalID, 2);
            } else {
                modalFadeOutRight(modalID, 1);
            }
        } else {
            if ($(this).parent(modalID).hasClass('modal-level-2')) {
                modalFadeOutDown(modalID, 2);
            } else {
                modalFadeOutDown(modalID, 1);
            }
        }
    });
}

//$.fn.ajaxPostData = function (url, donefunc, failfunc) {
//    var $form = $(this);

//}

function ajaxPostData(url, form) {
   
}

function renderingData(url) {
    $.get(url, function (data) {
        $('#modalBody').html(data);
    }).fail(function (error) {
        alert(error);
    });
}
function deleteData(url) {
    if (confirm("Are you sure you want to delete this user?")) {
        $.post(url, function (data) {
            alert("Deleted");
            }).fail(function (error) {
                alert(error);
            });
        }
}

//*--- Validation animates when triggered---*//
//*- (Param1 = ContainerID, Param2 = Parent of the Containerm Param 3 = Status, Param 4 = Message) *//
function validationAnimation(validationContainer,parentModal,condition, message) {

    if (condition === "success") {
        containerBG = "bg-2";
        setTimeout(function () {
            //$('#modalMask').removeClass('active');
            //$('body').removeClass('modal-open');
            $(validationContainer).removeClass('fadeInDown animated active ' + containerBG);
        }, 2500);
        setTimeout(function () {
            //$(parentModal).removeClass('active');

        }, 3000);
    } else if (condition === "fail") {
        containerBG = "bg-red";
        setTimeout(function () {
            $(validationContainer).removeClass('fadeInDown animated active ' + containerBG);
        }, 2500);
    } else {
        containerBG = "bg-1";
    }

    $(validationContainer + ' p').html(message);
    $(validationContainer).addClass('fadeInDown animated active '+ containerBG);
}


//*--- Function for opening a modal ---*//
function initReusableModal(reusableTitle, reusableText, showBtnSave, showBtnYes, saveFunction, yesFunction, reusableParams) {
    //*Animates the modal and add active class to display - block

	if (showBtnYes === undefined) {
		showBtnSave = false;
	}

	if (showBtnYes === undefined) {
		showBtnYes = false;
	}

	if (saveFunction === undefined) {
		saveFunction = null;
	}

	if (yesFunction === undefined) {
		yesFunction = null;
	}

    $("#modalReusable").find("#modalReusableTitle").text(reusableTitle);
    $("#modalReusable").find("#modalReusableText").text(reusableText);
    if (showBtnSave) {
        $("#modalReusableBtnSave").removeClass("display-none");
        $("#modalReusableBtnSave").on("click", function () {
            saveFunction(reusableParams);
        });
    }
    else {
        $("#modalReusableBtnSave").addClass("display-none");
    }
    if (showBtnYes) {
        $("#modalReusableBtnSave").removeClass("display-none");
        $("#modalReusableBtnYes").on("click", function () {
            yesFunction(reusableParams);
        });
    }
    else {
        $("#modalReusableBtnYes").addClass("display-none");
    }

    //*Check if the modal you were about to open is modal-right then throw different animation
    if ($(+ "#modalReusable.modal-container-right").length) {
        $(modalID).removeClass('fadeOutRight').addClass('active animated fadeInRight');

    } else { //*Else throw different animation
        $("#modalReusable").removeClass('fadeOutDown').addClass('active animated fadeInUp');
    }
    //*Set the modal mask to active
    $('#modalMask').addClass('active');
    //*Set body to overflow hidden when modal is open
    $('body').addClass('modal-open');


    //*When self-modal close button is clicked, animates modal close
    $('#modalReusable .modal-close').on('click', function () {
        $('body').removeClass('modal-open');

        //*Check if the modal you were about to open is modal-right then throw different animation
        if ($("#modalReusable.modal-container-right").length) {
            $("#modalReusable").removeClass('fadeInUp').addClass("fadeOutRight");
        } else { //*Else throw different animation
            $("#modalReusable").removeClass('fadeInUp').addClass("fadeOutDown");
        }
        setTimeout(function () {
            $("#modalReusable").removeClass("active");
            $('#modalMask').removeClass("active");
        }, 700);
    });

    return 0;
}

$(document).ready(function () {
    $('.modal-close').on('click', function () {
        //alert($(this).className);
    });
});

var ShowLoading = function () {
    $("div.preloader-container").show();
}

var HideLoading = function () {
    $("div.preloader-container").hide();
}