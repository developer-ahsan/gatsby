/*
◄------------------------------------------------------------► 
This file includes all cusomized javascript and all plugins libraries options 
◄------------------------------------------------------------►
*/

(function() {
    //-- Enable Use Strict Mode --
    "use strict";
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 768px)").matches) {
            $dropdown.hover(
                function() {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function() {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    $('.one-time').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 7000,
        infinite: true,
        fade: true,
        speed: 500,
        cssEase: 'ease-in-out'
    });
    $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            nav: false,
            dots: false,
            navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        })
        //footer widget menu hide on mobile	
    $(".widgets-footer h3").click(
        function() {
            $(this).parent().parent().toggleClass('active');
        }
    );
    // $(document).ready(function() {
    //   $(".search-mobile").bind("click", function() {
    //           $(".mobile-search-form").toggle();

    //       });
    //       $(".close-se").bind("click", function() {
    //           $(".mobile-search-form").css({
    //               "display": "none"
    //           });
    //       });
    //   });
})(); //end of use strict