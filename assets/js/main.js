/*!
Theme Name: Luxury
Theme URI: http://themeforest.net/user/Medhati/portfolio
Author: Medhati
Author URI: http://themeforest.net/user/Medhati
Description: Luxury minimal & Coming soon bootstrap template
*/
var $ = jQuery.noConflict();
jQuery(function($) {
	"use strict";
	
	/* ---------------------------------------------------------------------------
	 * Preloader
	 * --------------------------------------------------------------------------- */
	$(document).on( "ready",function() {
		setTimeout(function(){$(".loader").fadeOut(100)},1550);
		setTimeout(function(){$(".preloader").addClass("unavailable")},1800);
		setTimeout(function(){$(".preloader").addClass('invisible')},2300);
	});
	
	/* ---------------------------------------------------------------------------
	 * Backgrounds
	 * --------------------------------------------------------------------------- */
	$("#background").each(function() {
		$('#background,header .container').parallax({
			scalarX: 25,
			scalarY: 15,
			frictionX: 0.1,
			frictionY: 0.1,
			calibrateX: false,
		});
	});
	
	/* ---------------------------------------------------------------------------
	 * Rain Background
	 * --------------------------------------------------------------------------- */
	$(".rain").each(function() {
		function getURLParameter(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		}
		var image = document.getElementById('rainy');
		image.onload = function() {
			var engine = new RainyDay('rain','rainy', window.innerWidth, window.innerHeight, 1, getURLParameter("blur") || 15);
			
			var preset = getURLParameter("preset") || 1;
			if (preset == 1) {
				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_DROPS;
				engine.rain([ engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1) ], 100);
			} else if (preset == 2) {
				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_DROPS;
				engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
				engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
			} else if (preset == 3) {
				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_SMUDGE;
				engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
			}
		};
		image.crossOrigin = "anonymous";
		image.src="assets/img/bg.png";
	});
	
	/* ---------------------------------------------------------------------------
	 * Bubble Background
	 * --------------------------------------------------------------------------- */
	$(".bubble").each(function() {
		$(".bubble").pobubble({
			color: "#ffffff",
	        ammount: 7,
	        min: .1,
	        max: .3,
	        time: 60,
	        vertical:true,
	        horizontal:true,
	        style: 'circle'
		});
	});

	/* ---------------------------------------------------------------------------
	 * Slider Background
	 * --------------------------------------------------------------------------- */
	$(".slider").each(function() {
		$('.slider').phoenix({
			delay: 6000,
			fullscreen: true,
			dots: false,
			keys: false,
		});
	});
	
	/* ---------------------------------------------------------------------------
	 * Kenburn Background
	 * --------------------------------------------------------------------------- */
	$(".zoom").each(function() {
		$(".zoom").kenburnsy({
          fullscreen: true
        });
	});
	
	/* ---------------------------------------------------------------------------
	 * Origami Background
	 * --------------------------------------------------------------------------- */
	$(".origami").each(function() {
		var container = document.getElementById('origami');
		var renderer = new FSS.CanvasRenderer();
		var scene = new FSS.Scene();
		var light = new FSS.Light('#1a0433', '#ff0026');
		var geometry = new FSS.Plane(1920, 980, 28, 15);
		var material = new FSS.Material('#FFFFFF', '#FFFFFF');
		var mesh = new FSS.Mesh(geometry, material);
		var now, start = Date.now();function initialise(){scene.add(mesh);scene.add(light);container.appendChild(renderer.element);window.addEventListener('resize',resize);}
		function resize(){renderer.setSize(container.offsetWidth,container.offsetHeight);}
		function animate(){now=Date.now()-start;light.setPosition(300*Math.sin(now*0.001),200*Math.cos(now*0.0005),60);renderer.render(scene);requestAnimationFrame(animate);}
		initialise();resize();animate();
	});
	
	/* ---------------------------------------------------------------------------
	 * Contact Form
	 * --------------------------------------------------------------------------- */
	$(".contactform,#contact").each(function() {
		// validator
		jQuery.validator.addMethod('answercheck', function (value, element) {
			return this.optional(element) || /^\b10\b$/.test(value);//you can set your custom answer for example our answer is 10, format answer is "b10" or "bYOUR_ANSWER"
		}, "type the correct answer");
		$('#contactform').validate({
			highlight: function(element, errorClass) {
				$(element).fadeOut(function() {
					$(element).fadeIn();
				});
			},
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
					digits: true,
					minlength: 8
				},
				message: {
					required: true,
					minlength: 5
				},
				answer: {
					required: true,
					answercheck: true
				}
			},
			messages: {
				/* you can use custom error for contact form
				name: {
					required: "come on, you have a name don't you?",
					minlength: "your name must consist of at least 3 characters"
				},
				email: {
					required: "no email, no message"
				},
				phone: {
					required: "Please enter your phone."
				},
				message: {
					required: "um...yea, you have to write something to send this form.",
					minlength: "thats all? really?"
				},*/
				answer: {
					required: "sorry, wrong answer!"
				}
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type: "POST",
					data: $(form).serialize(),
					url: "assets/inc/contact.php",
					success: function() {
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").addClass("active")},300);
						setTimeout(function(){$('#contact').after("<dialog id='notification'><h4 class='m-b-1'>Thanks!</h4><p>We'll be in touch real soon!</p></dialog>")},300);
						setTimeout(function(){$("#notification").addClass("success")},500);
						setTimeout(function(){$(".contactform input,#contact input").prop( "disabled", true );},2200);
						setTimeout(function(){$(".contactform textarea,#contact textarea").prop( "disabled", true );},2200);
						setTimeout(function(){$(".contactform button,#contact button").prop( "disabled", true );},2200);
						setTimeout(function(){$('.contactform,#contact #contactform').fadeTo("slow", 0.15);},2200);
						setTimeout(function(){$("#notification").addClass("visible")},2200);
						setTimeout(function(){$('#notification').removeClass('visible');},7000);
						setTimeout(function(){$('#notification').remove('dialog');},7100);
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").addClass("deactivate")},2400);
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").removeClass("active")},3000);
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").removeClass("deactivate")},5100);
					},
					error: function() {
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").addClass("active")},300);
						setTimeout(function(){$('#contact').after("<dialog id='notification'><h4 class='m-b-1'>Something went wrong!</h4><p>try refreshing and submitting the form again!</p></dialog>")},300);
						setTimeout(function(){$("#notification").addClass("error")},500);
						setTimeout(function(){$("#notification").addClass("visible")},2200);
						setTimeout(function(){$('#notification').removeClass('visible');},7000);
						setTimeout(function(){$('#notification').remove('dialog');},7100);
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").addClass("deactivate")},2400);
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").removeClass("active")},3000);
						setTimeout(function(){$("dialog .loading-bar,#contact .loading-bar").removeClass("deactivate")},5100);
					}
				});
			}
		});
	});

	/* ---------------------------------------------------------------------------
	 * Modal Newsletter
	 * --------------------------------------------------------------------------- */
	$("#newsletter").each(function() {
		var $form = $('#newsletter');
		$('#newsletter .submit').on('click', function(event) {
			if (event)
				event.preventDefault();
			register($form);
		});
		function register($form) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				error: function(err) {
					setTimeout(function(){$(".modal .loading-bar").addClass("active")},300);
					setTimeout(function(){$('.modal #newsletter').before("<p class='text-danger' style='display:none'>Could not connect to server. Please try again later!</p>")},300);
					setTimeout(function(){$(".modal .text-danger").delay(0).slideDown("slow")},2200);
					setTimeout(function(){$('.modal .text-danger').delay(0).slideUp("fast");},7000);
					setTimeout(function(){$('.modal .text-danger').remove('p');},7100);
					setTimeout(function(){$(".modal .loading-bar").addClass("deactivate")},2400);
					setTimeout(function(){$(".modal .loading-bar").removeClass("active")},3000);
					setTimeout(function(){$(".modal .loading-bar").removeClass("deactivate")},5100);
				},
				success: function(data) {
					if (data.result != "success") {
						var message = data.msg.substring(4);
						setTimeout(function(){$(".modal .loading-bar").addClass("active")},300);
						setTimeout(function(){$('.modal #newsletter').before("<p class='text-danger' style='display:none'> Something went wrong!<br>"+ message +"</p>")},300);
						setTimeout(function(){$(".modal .text-danger").delay(0).slideDown("slow")},2200);
						setTimeout(function(){$('.modal .text-danger').delay(0).slideUp("fast");},7000);
						setTimeout(function(){$('.modal .text-danger').remove('p');},7100);
						setTimeout(function(){$(".modal .loading-bar").addClass("deactivate")},2400);
						setTimeout(function(){$(".modal .loading-bar").removeClass("active")},3000);
						setTimeout(function(){$(".modal .loading-bar").removeClass("deactivate")},5100);
					} else {
						var message = data.msg.substring(4);
						setTimeout(function(){$(".modal .loading-bar").addClass("active")},300);
						setTimeout(function(){$('.modal #newsletter').before("<p class='text-success' style='display:none'>Awesome! We sent you a confirmation email!</p>")},300);
						setTimeout(function(){$(".modal .text-success").delay(0).slideDown("slow")},2200);
						setTimeout(function(){$('.modal .text-success').delay(0).slideUp("fast");},7000);
						setTimeout(function(){$('.modal .text-success').remove('p');},7100);
						setTimeout(function(){$(".modal .loading-bar").addClass("deactivate")},2400);
						setTimeout(function(){$(".modal .loading-bar").removeClass("active")},3000);
						setTimeout(function(){$(".modal .loading-bar").removeClass("deactivate")},5100);
					}
				}
			});
		}
	});
	
	/* ---------------------------------------------------------------------------
	 * Content Newsletter
	 * --------------------------------------------------------------------------- */
	$("#subscribeform").each(function() {
		var $form = $('#subscribeform');
		$('#subscribeform .submit').on('click', function(event) {
			if (event)
				event.preventDefault();
			register($form);
		});
		function register($form) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				error: function(err) {
					setTimeout(function(){$(".loading-bar.subscribe").addClass("active")},300);
					setTimeout(function(){$('main').after("<dialog id='notification'><h4 class='m-b-1'>Something went wrong!</h4><p>"+ message +"</p></dialog>")},300);
					setTimeout(function(){$("#notification").addClass("error")},500);
					setTimeout(function(){$("#notification").addClass("visible")},2200);
					setTimeout(function(){$('#notification').removeClass('visible');},7000);
					setTimeout(function(){$('#notification').remove('dialog');},7100);
					setTimeout(function(){$(".loading-bar.subscribe").addClass("deactivate")},2400);
					setTimeout(function(){$(".loading-bar.subscribe").removeClass("active")},3000);
					setTimeout(function(){$(".loading-bar.subscribe").removeClass("deactivate")},5100);
				},
				success: function(data) {
					if (data.result != "success") {
						var message = data.msg.substring(4);
						setTimeout(function(){$(".loading-bar.subscribe").addClass("active")},300);
						setTimeout(function(){$('main').after("<dialog id='notification'><h4 class='m-b-1'>Something went wrong!</h4><p>"+ message +"</p></dialog>")},300);
						setTimeout(function(){$("#notification").addClass("error")},500);
						setTimeout(function(){$("#notification").addClass("visible")},2200);
						setTimeout(function(){$('#notification').removeClass('visible');},7000);
						setTimeout(function(){$('#notification').remove('dialog');},7100);
						setTimeout(function(){$(".loading-bar.subscribe").addClass("deactivate")},2400);
						setTimeout(function(){$(".loading-bar.subscribe").removeClass("active")},3000);
						setTimeout(function(){$(".loading-bar.subscribe").removeClass("deactivate")},5100);
					} else {
						var message = data.msg.substring(4);
						setTimeout(function(){$(".loading-bar.subscribe").addClass("active")},300);
						setTimeout(function(){$('main').after("<dialog id='notification'><h4 class='m-b-1'>Awesome!</h4><p>We sent you a confirmation email!</p></dialog>")},300);
						setTimeout(function(){$("#notification").addClass("success")},500);
						setTimeout(function(){$("#notification").addClass("visible")},2200);
						setTimeout(function(){$('#notification').removeClass('visible');},7000);
						setTimeout(function(){$('#notification').remove('dialog');},7100);
						setTimeout(function(){$(".loading-bar.subscribe").addClass("deactivate")},2400);
						setTimeout(function(){$(".loading-bar.subscribe").removeClass("active")},3000);
						setTimeout(function(){$(".loading-bar.subscribe").removeClass("deactivate")},5100);
					}
				}
			});
		}
	});

	/* ---------------------------------------------------------------------------
	 * Countdown Timer
	 * --------------------------------------------------------------------------- */
	$(".countdown").each(function() {
		$('.countdown').countdown({
			//Set your target date here!
			day: 1,//Set your target Days
			month: 1,//Set your target Month
			year: 2018,//Set your target Year
			onChange: function() {
				m3dAnimate($('.digits span'));
			}
		});
		function m3dAnimate($el) {
			$el.each( function() {
				var $this = $(this),
					fieldText = $this.text(),
					fieldData = $this.attr('data-value'),
					fieldOld = $this.attr('data-old');

				if (typeof fieldOld === 'undefined') {
					$this.attr('data-old', fieldText);
				}
				if (fieldText != fieldData) {
					$this
						.attr('data-value', fieldText)
						.attr('data-old', fieldData)
						.addClass('animate');

					window.setTimeout(function() {
						$this
							.removeClass('animate')
							.attr('data-old', fieldText);
					}, 300);
				}
			});
		};
	});
	
	/* ---------------------------------------------------------------------------
	 * Speed Dial Box
	 * --------------------------------------------------------------------------- */
	$('.speeddial').on('click',function(){
		$( ".contactform").addClass('visible');
	});
	$('.contactform button.close').on('click', function(){
		$('.contactform').removeClass('visible');
	});
	
	/* ---------------------------------------------------------------------------
	 * Scrollbar
	 * --------------------------------------------------------------------------- */
	$(window).resize(function() {
		$('header').css({'min-height':($(window).height())+'px'});
		$('header').css({'width':($(window).width())+'px'});
		$('.modal-content').css({'max-width':($(window).width())+'px'});
		$('.feature-box').css({'height':($(window).height())+'px'});
	});$(window).trigger('resize');
	$(document).scroll(function() {
		var st = $(this).scrollTop();
		$(".header .container div[class^='col-']").css({"top": (st/5), "bottom": (-st/5) })
	});
	$(window).on('scroll', function () {
		var header = $('header .container, header .scene');
		var range = 200;  
		var scrollTop = $(this).scrollTop();
		var offset = header.offset().top;
		var height = header.outerHeight();
		offset = offset + height / 1.5;
		var calc = 1 - (scrollTop - offset + range) / range;
		header.css({ 'opacity': calc });
		if ( calc > '1' ) {
		  header.css({ 'opacity': 1 });
		} else if ( calc < '0' ) {
		  header.css({ 'opacity': 0});
		}
	});
	
	/* ---------------------------------------------------------------------------
	 * Lightbox
	 * --------------------------------------------------------------------------- */
	$(".card").each(function() {
		 $('.card a').nivoLightbox({
		    effect: 'fadeScale'    
	    });				  
	});
	$(".video-play").each(function() {
		 $('.video-play').nivoLightbox({
		    effect: 'fadeScale'    
	    });				  
	});
	$('a[data-inline="video"]').on('click',function(){
		$( ".nivo-lightbox-overlay").addClass('video-lightbox');
	});
	$('.video-play,.card a,a.nivo-lightbox-close').not('a[data-inline="video"]').on('click',function(){
		$(".nivo-lightbox-overlay").removeClass("video-lightbox");
	});
	
	/* ---------------------------------------------------------------------------
	 * Browser 
	 * --------------------------------------------------------------------------- */
	if(false || typeof ScriptEngineMajorVersion === "function"){
		$('html').addClass('ie');
	}
	else if(window.chrome){
		$('html').addClass('chrome');
	}
	else if(window.opera){
		$('html').addClass('opera');
	}
	else if('MozBoxSizing' in document.body.style){
		$('html').addClass('firefox');
	}
	else if({}.toString.call(window.HTMLElement).indexOf('Constructor')+1){
		$('html').addClass('safari');
	}
	else{
		//Unknown
	}

});