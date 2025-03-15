(function($) {
    "use strict";

    // Windows load

    $(window).on("load", function() {

        // Site loader 

        $(".loader-inner").fadeOut();
        $(".loader").delay(200).fadeOut("slow");

    });


    // Scroll to

    $('a.scroll').smoothScroll({
        speed: 800,
        offset: -60
    });



    // Site navigation setup

    var header = $('.header'),
        pos = header.offset(),
        blockTop = $('.block-top');

    $(window).scroll(function() {
        if ($(this).scrollTop() > pos.top + 500 && header.hasClass('default')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('default').addClass('switched-header').fadeIn(200);
                blockTop.addClass('active');
            });
        } else if ($(this).scrollTop() <= pos.top + 500 && header.hasClass('switched-header')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('switched-header').addClass('default').fadeIn(100);
                blockTop.removeClass('active');
            });
        }
    });




    //Hero resize


    var mainHero = $(" .hero .main-slider .slides li");
    function mainHeroResize() {
        mainHero.css('height', $(window).height());
    }

    $(function() {
            mainHeroResize()
        }),
        $(window).resize(function() {
            mainHeroResize()
        });




    // Slider

    $('.main-slider').flexslider({
        animation: "fade",
        slideshow: true,
        directionNav: false,
        controlNav: true,
        pauseOnAction: false,
        animationSpeed: 1000
    });


    $('.review-slider').flexslider({
        animation: "slide",
        slideshow: true,
        directionNav: true,
        controlNav: false,
        pauseOnAction: false,
        animationSpeed: 500
    });




    // Mobile menu

    var mobileBtn = $('.mobile-but');
    var nav = $('.main-nav ul.main-menu');
    var navHeight = nav.height();

    $(mobileBtn).on("click", function() {
        $(".toggle-mobile-but").toggleClass("active");
        nav.slideToggle();
        $('.main-nav li a').addClass('mobile');
        return false;


    });



    $(window).resize(function() {
        var w = $(window).width();
        if (w > 320 && nav.is(':hidden')) {
            nav.removeAttr('style');
            $('.main-nav li a').removeClass('mobile');
        }

    });


    // Append images as css background

    $('.background-img').each(function() {
        var path = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + path + '")').css('background-position', 'initial');
    });

     // Track list player 

   // Audio Player Setup
    if (typeof audiojs !== 'undefined') {
        console.log("Audio.js detectado correctamente.");
        audiojs.events.ready(function() {
            var audioPlayers = audiojs.createAll();
            if (audioPlayers.length === 0) {
                console.error("No se pudo inicializar audiojs.");
                return;
            }
            var audio1 = audioPlayers[0];
            console.log("Reproductor de audio inicializado.", audio1);

            // Cargar y reproducir la primera canción automáticamente
            var first = $('.playlist li .as-link').attr('data-src');
            if (first) {
                $('.playlist li').first().addClass('playing');
                audio1.load(first);
                audio1.play();
                console.log("Reproduciendo automáticamente la primera canción:", first);
            }

            // Manejo del evento de finalización de la canción
            audio1.element.addEventListener('ended', function() {
                var current = $('.playlist li.playing');
                var next = current.next().length ? current.next() : $('.playlist li').first();
                var nextSrc = $('.as-link', next).attr('data-src');
                if (nextSrc) {
                    current.removeClass('playing');
                    next.addClass('playing');
                    audio1.load(nextSrc);
                    audio1.play();
                    console.log("Reproduciendo siguiente canción:", nextSrc);
                }
            });

            // Control de reproducción y pausa al hacer clic en una canción
            $('.playlist li .as-link').on('click', function(e) {
                e.preventDefault();
                var songSrc = $(this).attr('data-src');
                if (songSrc) {
                    if ($(this).parent().hasClass('playing')) {
                        audio1.pause();
                        $(this).parent().removeClass('playing').addClass('paused');
                        console.log("Pausando canción:", songSrc);
                    } else {
                        $('.playlist li').removeClass('playing paused');
                        $(this).parent().addClass('playing');
                        audio1.load(songSrc);
                        audio1.play();
                        console.log("Reproduciendo canción seleccionada:", songSrc);
                    }
                }
            });
        });
    } else {
        console.error("Audio.js no está cargado correctamente.");
    }


    // Tabbed content 

    $(".block-tabs li").on("click", function() {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            $(".block-tabs li.active").removeClass("active");
            $(this).addClass("active");
            $(".block-tab li.active").removeClass("active");
            $(".block-tab li:nth-child(" + nthChild + ")").addClass("active");

        }
    });






})(jQuery);
