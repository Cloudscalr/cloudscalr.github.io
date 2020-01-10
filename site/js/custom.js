
jQuery(function ($) {
	'use strict';

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	/** Pricing Table */
	if (window.Vue !== undefined) {
		new Vue({
			el: '#pricing',
			data: {
				period_monthly: false,
				period_annual: true,
				plans: [
                    {
						id: 'solo',
						name: 'Solo',
						price: {
							monthly: 0,
							annual: 288,
							annual_monthly: 0
						},
						priceList: {
							monthly: {
								5: 32,
								10: 62,
								15: 91,
								20: 118,
								25: 144,
								30: 168
							},
							annual: {
								5: 24,
								10: 46,
								15: 68,
								20: 88,
								25: 108,
								30: 126
							}
							
						},
						savings: 25,
						defaultActiveProjects: 5,
						minActiveProjects: 5,
						maxActiveProjects: 30,
						rangeInputStep: 5,
						isFavorite: false,
						features: [
							{ name: 'Single User', available: true },
							{ name: '5 Active Projects', available: true },
							{ name: 'Server Log Viewer', available: false },
							{ name: '1 Week Metrics Retention', available: true },
							{ name: 'Email/Webhook Alerting', available: true },
							{ name: 'Cost Reporting', available: false },
							{ name: 'Basic Technical Support', available: true }
						]
					},
                    {
						id: 'team',
						name: 'Team',
						price: {
							monthly: 150,
							annual: 1080,
							annual_monthly: 90
						},
						priceList: {
							monthly: {
								10: 150,
								20: 291,
								30: 427,
								40: 552,
								50: 675,
								60: 792,
								70: 592
							},
							annual: {
								10: 90,
								20: 174,
								30: 256,
								40: 331,
								50: 405,
								60: 475,
								70: 535
							}
							
						},
						defaultActiveProjects: 10,
						minActiveProjects: 10,
						maxActiveProjects: 70,
						rangeInputStep: 10,
						savings: 40,
						isFavorite: true,
						features: [
							{ name: '25 Users', available: true },
							{ name: '10 Active Projects', available: true },
							{ name: '5 Custom Teams', available: true },
							{ name: 'Server Log Viewer', available: true },
							{ name: '3 Months Metrics Retention', available: true },
							{ name: 'Email/Webhook Alerting', available: true },
							{ name: 'Cost Reporting', available: true },
							{ name: 'Priority Technical Support', available: true }
						]
					},
                    {
						id: 'enterprise',
						name: 'Enterprise',
						price: {
							monthly: 500,
							annual: 4500,
							annual_monthly: 375
						},
						priceList: {
							monthly: {
								25: 500,
								50: 970,
								75: 1425,
								100: 1840,
								125: 2250,
								150: 2640,
								175: 2975,
								200: 3280
							},
							annual: {
								25: 375,
								50: 727,
								75: 1068,
								100: 1380,
								125: 1687,
								150: 1980,
								175: 2231,
								200: 2460
							}
						},
						savings: 25,
						defaultActiveProjects: 25,
						minActiveProjects: 25,
						maxActiveProjects: 200,
						rangeInputStep: 25,
						isFavorite: false,
						features: [
							{ name: 'Unlimited Users', available: true },
							{ name: '25 Active Projects', available: true },
							{ name: 'Unlimited Custom Teams', available: true },
							{ name: 'Server Log Viewer', available: true },
							{ name: '6 Months Metrics Retention', available: true },
							{ name: 'Email/SMS/Webhook Alerting', available: true },
							{ name: 'Cost Reporting', available: true },
							{ name: 'High Priority Technical Support', available: true }
						]
					}
				]
            },
            computed: {
                planPrice: function(plan) {
					if (this.period_annual) {
                        return plan.priceList.annual[plan.defaultActiveProjects];
                    } else {
                        return plan.priceList.monthly[plan.defaultActiveProjects];
					}
				}
			},
			methods: {
                changePrice: function(plan) {
                    var currentPlan = this.plans.find(function(element) {
                        return plan.id === element.id;
                    });
                    if (this.period_annual) {
                        currentPlan.price.monthly = currentPlan.priceList.annual[currentPlan.defaultActiveProjects];
                    } else {
                        currentPlan.price.monthly = currentPlan.priceList.monthly[currentPlan.defaultActiveProjects];
					}
                }
			}
		});
	}
	/** END Pricing Table */
	
	/*============================================
	Accordion
     ==============================================*/
	function toggleIcon(e) {
		$(e.target)
			.prev('.panel-heading')
			.find('.more-less')
			.toggleClass('ti-minus ti-plus');
	}
	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
	$('.panel-group').on('shown.bs.collapse', toggleIcon);
    
	/*============================================
	FAQ
     ==============================================*/
    
	$('.faq-categories a').on('click', function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
		$('.faq-categories li').removeClass('active');
		$(this).parent().addClass('active');
	});
	/*============================================
	PARALLAX
     ==============================================*/
	if (!Modernizr.touch) {
		var myParaxify = paraxify('.paraxify');
	}
	/*============================================
	FILE UPLOAD MODIFICATION
     ==============================================*/
	$(function() {
		// We can attach the `fileselect` event to all file inputs on the page
		$(document).on('change', ':file', function () {
			var input = $(this),
				numFiles = input.get(0).files ? input.get(0).files.length : 1,
				label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});

		// We can watch for our custom `fileselect` event like this
		$(document).ready(function () {
			$(':file').on('fileselect', function (event, numFiles, label) {

				var input = $(this).parents('.input-group').find(':text'),
					log = numFiles > 1 ? numFiles + ' files selected' : label;

				if (input.length) {
					input.val(log);
				} else {
					if (log)
						alert(log);
				}

			});
		});

	});
	/*============================================
	BACK TO TOP
     ==============================================*/
    
	$('#back-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
	/*============================================
	Counter
     ==============================================*/
	if ($('.count').length)
	{
		$('.count').counterUp({
			delay: 10,
			time: 1000
		});
	}
	/*============================================
     MAGNIFIC POPUP
     ==============================================*/
	$(document).ready(function () {
		if ($('.popup-link').length) {
			$('.popup-link').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}

	});
	/*============================================
     OWL CAROUSAL
     ==============================================*/
	if ($('#about-slider').length)
	{
		$('#about-slider').owlCarousel({
			navigation: false, // Show next and prev buttons
			slideSpeed: 300,
			paginationSpeed: 400,
			singleItem: true
		});
	}
	/*============================================
     BACKGROUND SLIDER
     ==============================================*/
	if ($('.slider-bg').length){
		$(function() {
			$('body').vegas({
				slides: [
					{ src: 'images/blog-1.jpg' },
					{ src: 'images/blog-2.jpg' },
					{ src: 'images/blog-3.jpg' }
				]
			});
		});
	}
	/*============================================
     TEXT ROTATOR
     ==============================================*/
	if($('#text-rotating').length){
		$('#text-rotating').Morphext({
			// The [in] animation type. Refer to Animate.css for a list of available animations.
			animation: 'bounceIn',
			// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
			separator: ',',
			// The delay between the changing of each phrase in milliseconds.
			speed: 4000
		});
	}
	/*============================================
     PARTICLE EFFECTS
     ==============================================*/
	if($('#particles').length) {
		$('#particles').particleground({
			dotColor: 'rgba(255,255,255,0.5)',
			lineColor: 'rgba(255,255,255,0.2)',
			density: 10000
		});
	}

	$('#form-register-reveal-button').on('click', function () {
		window.location = window.location.origin + '/register';
	});
});