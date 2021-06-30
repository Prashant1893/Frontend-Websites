jQuery(document).ready(function($){
	"use strict";

	/* Scroll to top */
	$('.scrollToTop').on('click',function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	/* Search Box */
	$(".search-box-area").on('click', '.search-button, .search-close', function(event){
		event.preventDefault();
		if($('.search-text').hasClass('active')){
			$('.search-text, .search-close').removeClass('active');
		}
		else{
			$('.search-text, .search-close').addClass('active');
		}
		return false;
	});

	/* MeanMenu - Mobile Menu */
	$('#site-navigation nav').meanmenu({
		meanMenuContainer: '#meanmenu',
		meanScreenWidth: EikraObj.meanWidth,
		appendHtml: EikraObj.appendHtml,
		removeElements: "#masthead",
		siteLogo: EikraObj.siteLogo
	});

	/* Header Right Menu */
	$('body').on('click', '.side-menu-trigger', function (e) {
		e.preventDefault();
		if ( $('.sidenav').hasClass('rtin-ropen') ) {
			$('.sidenav').removeClass('rtin-ropen');
		}
		else {
			$('.sidenav').addClass('rtin-ropen');
		}
	});

	$('.additional-menu-area').on('click', '.closebtn', function (e) {
		e.preventDefault();
		$('.sidenav').removeClass('rtin-ropen');
	});

	$('.sidenav .menu li.menu-item-has-children > a').on('click',function(){
		var $submenu = $(this).find('+ .sub-menu');
		$submenu.slideToggle();
		return false;
	});

	// Wishlist Icon
	$(document).on('click', '.rdtheme-wishlist-icon',function() {
		if ( $(this).hasClass('rdtheme-add-to-wishlist')) {

			var $obj = $(this),
				productId = $obj.data('product-id'),
				afterTitle = $obj.data('title-after');

			var data = {
				'action' : 'eikra_add_to_wishlist',
				'context' : 'frontend',
				'nonce' : $obj.data('nonce'),
				'add_to_wishlist' : productId,
			};

			$.ajax({
				url : EikraObj.ajaxurl,
				type : 'POST',
				data : data,
				success : function( data ){
					if ( data['result'] != 'error' ) {
						$obj.find('.wishlist-icon').removeClass('fa-heart-o').addClass('fa-check').show();
						$obj.removeClass('rdtheme-add-to-wishlist').addClass('rdtheme-remove-from-wishlist');
						$obj.attr('title', afterTitle);
					}
				}
			});

			return false;
		}
	});

	/* Mega Menu */
	$('.site-header .main-navigation ul > li.mega-menu').each(function() {
        // total num of columns
        var items = $(this).find(' > ul.sub-menu > li').length;
        // screen width
        var bodyWidth = $('body').outerWidth();
        // main menu link width
        var parentLinkWidth = $(this).find(' > a').outerWidth();
        // main menu position from left
        var parentLinkpos = $(this).find(' > a').offset().left;

        var width = items * 220;
        var left  = (width/2) - (parentLinkWidth/2);

        var linkleftWidth  = parentLinkpos + (parentLinkWidth/2);
        var linkRightWidth = bodyWidth - ( parentLinkpos + parentLinkWidth );

        // exceeds left screen
        if( (width/2)>linkleftWidth ){
        	$(this).find(' > ul.sub-menu').css({
        		width: width + 'px',
        		right: 'inherit',
        		left:  '-' + parentLinkpos + 'px'
        	});
        }
        // exceeds right screen
        else if ( (width/2)>linkRightWidth ) {
        	$(this).find(' > ul.sub-menu').css({
        		width: width + 'px',
        		left: 'inherit',
        		right:  '-' + linkRightWidth + 'px'
        	});
        }
        else{
        	$(this).find(' > ul.sub-menu').css({
        		width: width + 'px',
        		left:  '-' + left + 'px'
        	});
        }
    });

	/* Sticky Menu */
	if ( EikraObj.stickyMenu == 1 || EikraObj.stickyMenu == 'on' ) {
		rdtheme_sticky_header();

        // Sticky Menmenu
        $(window).scroll(function() {
            var $body = $("body");
            var windowpos = $(window).scrollTop();
            if(windowpos > 55){
                $body.addClass("mean-stick");
            }
            else {
                $body.removeClass("mean-stick");
            }
        });
	}

	/* Event Single Countdown */
	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('#event-countdown').data('time'),
			day    = (EikraObj.day == 'Day') ? 'Day%!D' : EikraObj.day,
			hour   = (EikraObj.hour == 'Hour') ? 'Hour%!D' : EikraObj.hour,
			minute = (EikraObj.minute == 'Minute') ? 'Minute%!D' : EikraObj.minute,
			second = (EikraObj.second == 'Second') ? 'Second%!D' : EikraObj.second;
			$('#event-countdown').countdown(eventCountdownTime).on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="event-countdown-each"><div class="count-title">%D</div><div class="count-subtitle">'+day+'</div></div>'
					+ '<div class="event-countdown-each"><div class="count-title">%H</div><div class="count-subtitle">'+hour+'</div></div>'
					+ '<div class="event-countdown-each"><div class="count-title">%M</div><div class="count-subtitle">'+minute+'</div></div>'
					+ '<div class="event-countdown-each"><div class="count-title">%S</div><div class="count-subtitle">'+second+'</div></div>'));
			}).on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});
		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}
	}

	// Fix submenu styling in widget_nav_menu
	$(".footer-top-area .widget_nav_menu").each(function() {
		if ($(this).find(".menu>li").hasClass('menu-item-has-children')) {
			$(this).addClass('has-children');
		}
	});

	/* Visual Composer */
	rdtheme_vc_scripts($);

	/* WooCommerce */
	rdtheme_wc_scripts($);

	/* LearnPress */
	rdtheme_lp_scripts($);
});

function eikra_content_load_scripts() {
	var $ = jQuery;

	/* Owl Custom Nav */
	if ( typeof $.fn.owlCarousel == 'function') {

		$(".owl-custom-nav .owl-next").on('click',function(){
			$(this).closest('.owl-wrap').find('.owl-carousel').trigger('next.owl.carousel');
		});
		$(".owl-custom-nav .owl-prev").on('click',function(){
			$(this).closest('.owl-wrap').find('.owl-carousel').trigger('prev.owl.carousel');
		});

		$(".rt-owl-carousel").each(function() {
			var options = $(this).data('carousel-options');
			if ( EikraObj.rtl == 'yes' ) {
				options['rtl'] = true; //@rtl
				//options['navText'] = ["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"];
			}
			$(this).owlCarousel(options);
		});
	}

	// Event Coundown
	if ( typeof $.fn.countdown == 'function') {
		try {
			var day = (EikraObj.day == 'Day') ? 'Day%!D' : EikraObj.day,
				hour    = (EikraObj.hour == 'Hour') ? 'Hour%!D' : EikraObj.hour,
				minute  = (EikraObj.minute == 'Minute') ? 'Minute%!D' : EikraObj.minute,
				second  = (EikraObj.second == 'Second') ? 'Second%!D' : EikraObj.second;

			$('.rt-event-countdown').each(function() {
				var $CountdownSelector = $(this).find('.rt-date');
				var eventCountdownTime = $CountdownSelector.data('time');
				$CountdownSelector.countdown(eventCountdownTime).on('update.countdown', function(event) {
					$(this).html(event.strftime(''
						+ '<div class="rt-countdown-section"><div class="rt-countdown-text"><div class="rtin-count">%D</div><div class="rtin-text">'+day+'</div></div><span class="countdown-colon">:</span></div>'
						+ '<div class="rt-countdown-section"><div class="rt-countdown-text"><div class="rtin-count">%H</div><div class="rtin-text">'+hour+'</div></div><span class="countdown-colon">:</span></div>'
						+ '<div class="rt-countdown-section"><div class="rt-countdown-text"><div class="rtin-count">%M</div><div class="rtin-text">'+minute+'</div></div><span class="countdown-colon">:</span></div>'
						+ '<div class="rt-countdown-section"><div class="rt-countdown-text"><div class="rtin-count">%S</div><div class="rtin-text">'+second+'</div></div></div>'));
				}).on('finish.countdown', function(event) {
					$(this).html(event.strftime(''));
				});
			});

			// Custom Countdown
			$('.rt-countdown').each(function() {
				var $CountdownSelector = $(this).find('.rt-date');
				var eventCountdownTime = $CountdownSelector.data('time');
				$CountdownSelector.countdown(eventCountdownTime).on('update.countdown', function(event) {
					$(this).html(event.strftime(''
						+ '<div class="rt-countdown-section-2"><div class="rtin-count">%D</div><div class="rtin-text">'+day+'</div></div>'
						+ '<div class="rt-countdown-section-2"><div class="rtin-count">%H</div><div class="rtin-text">'+hour+'</div></div>'
						+ '<div class="rt-countdown-section-2"><div class="rtin-count">%M</div><div class="rtin-text">'+minute+'</div></div>'
						+ '<div class="rt-countdown-section-2"><div class="rtin-count">%S</div><div class="rtin-text">'+second+'</div></div>'));
				}).on('finish.countdown', function(event) {
					$(this).html(event.strftime(''));
				});
			});

		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}
	}

	// Popup - Used in vc-gallery
	if ( typeof $.fn.magnificPopup == 'function') {
		$('.rt-vc-magnific-popup').magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery:{enabled:true}
		});
	}

	// Popup - Used in video
	if ( typeof $.fn.magnificPopup == 'function') {
		$('.rt-video-popup').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}

	// Counter
	if ( typeof $.fn.counterUp == 'function') {
		$('.rt-vc-counter .rtin-counter-num, .rt-vc-counter-2 .rtin-counter-num').counterUp({
			delay: $(this).data('rtSteps'),
			time: $(this).data('rtSpeed')
		});
	}

	// Isotope - Used in vc-gallery and vc-course-isotope
	function runIsotope($container,filter){
		$container.isotope({
			filter: filter,
			layoutMode: 'fitRows',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
	}

	if ( typeof $.fn.isotope == 'function') {
		// Run 1st time
		$('.rt-vc-isotope-container').each(function() {
			var $container = $(this).find('.rt-vc-isotope-wrapper'),
				filter = $(this).find('.rt-vc-isotope-tab a.current').data('filter');
			runIsotope($container,filter);
		});

		// Run on click event
		$('.rt-vc-isotope-tab a').on('click',function(){
			$(this).closest('.rt-vc-isotope-tab').find('.current').removeClass('current');
			$(this).addClass('current');
			var $container = $(this).closest('.rt-vc-isotope-container').find('.rt-vc-isotope-wrapper'),
				filter = $(this).attr('data-filter');
			runIsotope($container,filter);
			return false;
		});
	}
}

(function($){
	"use strict";

    // Window Load+Resize
    $(window).on('load resize', function () {
        // Define the maximum height for mobile menu
        var wHeight = $(window).height();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('max-height', wHeight + 'px');

		// Elementor Frontend Load
		$(window).on('elementor/frontend/init', function () {
			if (elementorFrontend.isEditMode()) {
				elementorFrontend.hooks.addAction('frontend/element_ready/widget', function () {
					eikra_content_load_scripts();
				});
			}
		});

    });

    // Window Load
    $(window).on('load', function () {
        // Preloader
        $('#preloader').fadeOut('slow', function () {
        	$(this).remove();
        });

		/* Nav smooth scroll */
		$('#site-navigation .menu, .widget_nav_menu .menu, .rt-wid-menu .menu').onePageNav({
			extraOffset: EikraObj.extraOffset,
		});

        // Onepage Nav on meanmenu
        $('#meanmenu .menu').onePageNav({
        	extraOffset: EikraObj.extraOffsetMobile,
        	end: function() {
        		$('.meanclose').trigger('click');
        	}
        });

		eikra_content_load_scripts();

    });

})(jQuery);


function rdtheme_sticky_header(){
	$ = jQuery;

	if ( $('#sticky-header-wrapper').length ) {
		return;
	}

	var sticky = $('<div id="sticky-header-wrapper"></div>');
	var stickyWrap = $('<header class="site-header"></header>');
	stickyWrap.append($(".masthead-container").clone());
	sticky.append(stickyWrap);

	if ( EikraObj.headerStyle == 3 || EikraObj.headerStyle == 7 ) {
		sticky.find('.header-firstrow, .menu-sep').remove();
	}

	if ( EikraObj.headerStyle == 4 ) {
		sticky.find('.header-firstrow-wrap, .menu-sep').remove();
	}

	$('body').append(sticky);
	var stickyHeaderHeight = sticky.outerHeight();
	sticky.css('top', -stickyHeaderHeight + 'px');

	var topSpacing = 0,
	$body = $('body'),
	$header = $('#masthead'),
	headerHeight = $header.outerHeight(),
	screenWidth = $body.outerWidth();

    if ( EikraObj.hasAdminBar == 1 && screenWidth > 600 ) {
        var stickyAdminbarHeight = $('#wpadminbar').outerHeight();
        topSpacing = stickyAdminbarHeight;
    }

    var totalHeight = topSpacing + headerHeight;

	$(window).scroll(function() {
		var windowPos = $(window).scrollTop();

		if(windowPos > (totalHeight+1) ){
			sticky.show();
		}
		else {
			sticky.hide();
		}

		if(windowPos > (totalHeight+50) ){
			$body.addClass("stick");
		}
		else {
			$body.removeClass("stick");
		}
	});
}

function rdtheme_vc_scripts($){
    // VC fullscreen error fix in RTL /@rtl
    if ( EikraObj.vcRtl == 'yes' ) {
    	rdthemeFixVcFullWidthRow();
    	$(document).on('vc-full-width-row', function () {
    		rdthemeFixVcFullWidthRow();
    	});
    }

    // Course search category select
    $('.rt-vc-course-search .rtin-dropdown').on('click', 'ul li a', function(e) {
    	e.preventDefault();
    	var text = $(this).text(),
    	cat      = $(this).data('cat'),
    	$parent  = $(this).closest('.rt-vc-course-search');
    	$parent.find('.rtin-cat').text(text);
    	$parent.find('input[name="refcat"]').val(cat);
    });
}

function rdtheme_wc_scripts($){
	/* Shop change view */
	$('#shop-view-mode li a').on('click',function(){
		$('body').removeClass('product-grid-view').removeClass('product-list-view');

		if ( $(this).closest('li').hasClass('list-view-nav')) {
			$('body').addClass('product-list-view');
			Cookies.set('shopview', 'list');
		}
		else{
			$('body').addClass('product-grid-view');
			Cookies.remove('shopview');
		}
		return false;
	});
}

function rdtheme_lp_scripts($){
	/* Course change view */
	$('.rt-course-archive-top .rtin-icons a').on('click', function() {
		$('body').removeClass('rt-course-grid-view').removeClass('rt-course-list-view');

		if ($(this).hasClass('rtin-list')) {
			$('body').addClass('rt-course-list-view');
			Cookies.set('lpcourseview', 'list');
		}
		else {
			$('body').addClass('rt-course-grid-view');
			Cookies.set('lpcourseview', 'grid');
		}
		return false;
	});


	/* Curriculum accordian */
	$(document).ready(function () {
		$rdtheme_current_curriculam = $(".viewing-course-item .curriculum-sections .section .section-content li.current").closest('.section');
		$rdtheme_current_curriculam.find('.section-description').slideToggle();
		$rdtheme_current_curriculam.find('.section-content').slideToggle();
		$rdtheme_current_curriculam.find('.section-header').addClass('active').trigger( "click" );
		$("#learn-press-course-curriculum .section-header").on('click', function(event){
			$section = $(this).closest('.section');
			$section.find('.section-description').slideToggle();
			$section.find('.section-content').slideToggle();
			$section.find('.section-header').toggleClass('active');
		});
	});

	/* Lesson page layout change */
	/*$(document).ready(function () {
		var $body = $('body'),
		$contentItem = $('#learn-press-content-item'),
		$curriculum = $('#learn-press-course-curriculum'),
		inPopup = $body.hasClass('course-item-popup');
		if (inPopup) {
			$curriculum.appendTo($body);
			$contentItem.appendTo($body);
		}
	});*/

	// Responsive Table
	$( ".lp-list-table" ).wrap( "<div class='table-responsive'></div>" );
}

//@rtl
function rdthemeFixVcFullWidthRow(){
	var $elements = jQuery('[data-vc-full-width="true"]');
	jQuery.each($elements, function () {
		var $el = jQuery(this);
		$el.css('right', $el.css('left')).css('left', '');
	});
}

/* Generate class based on container width */
(function ($) {
    "use strict";

    $(window).on('load resize', elementWidth);

    function elementWidth(){
        $('.elementwidth').each(function() {
            var $container = $(this),
            width = $container.outerWidth(),
            classes = $container.attr("class").split(' '); // get all class

            var classes1 = startWith(classes,'elwidth'); // class starting with "elwidth"
            classes1 = classes1[0].split('-'); // "elwidth" classnames into array
            classes1.splice(0, 1); // remove 1st element "elwidth"

            var classes2 = startWith(classes,'elmaxwidth'); // class starting with "elmaxwidth"
            classes2.forEach(function(el){
                $container.removeClass(el);
            });

            classes1.forEach(function(el){
                var maxWidth = parseInt(el);

                if (width <= maxWidth) {
                    $container.addClass('elmaxwidth-'+maxWidth);
                }
            });
        });
    }

    function startWith(item, stringName){
        return $.grep(item, function(elem) {
            return elem.indexOf(stringName) == 0;
        });
    }

}(jQuery));