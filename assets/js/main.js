/*
	Author: themexriver
	Version: 1.0
*/


(function ($) {
"use strict";


gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

gsap.config({
	nullTargetWarn: false,
});



// smooth scroll activation start

const lenis = new Lenis({
	duration: .7,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	direction: 'vertical',
	smooth: true,
	smoothTouch: false,
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
$('a[href^="#"]').on('click', function (e) {
	e.preventDefault();

	const href = this.getAttribute('href');

	// "#" alone is not a valid selector, nothing to scroll to
	if (href.length < 2) return;

	const target = $(href);

	if (target.length) {
		lenis.scrollTo(target[0], {
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});
	}
});




// preloader
document.addEventListener("DOMContentLoaded", function () {

	let preloader = document.querySelector(".tn-preloader");

	window.addEventListener('load', function(){

		if (preloader) {
			preloader.classList.add("preloaded");
			setTimeout(function () {
				  preloader.remove();
			}, 1000 ) ;

		}

		CustomEase.create("ease1", "0.19, 1, 0.22, 1");

        if($('.hero-title').length) {
            var st = $(".hero-title");
            st.each(function(index, el) {
                el.split = new SplitText(el, {
                    type: "lines",
                    linesClass: "split-line"
                });
                gsap.set(el, { perspective: 400 });

                gsap.set(el.split.lines, {
                    yPercent: 100,
                    opacity: 0,
                    ease: "Back.easeOut",
                });

                el.anim = gsap.to(el.split.lines, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                    },
                    yPercent: 0,
                    opacity: 1,
                    ease: "Back.easeOut",
                    stagger: 0.2,
                    delay:1,
                });
            });
        }

		var heroIllus = gsap.timeline({
				defaults: { duration:1,
                ease: "ease1", }
		});
        heroIllus.from(".px-hero-illus svg path" , { yPercent: 100, stagger: .3, delay: 2 })

		var heroDemo = gsap.timeline({
				defaults: { duration:1,
                ease: "ease1", }
		});
        heroDemo.from(".px-hero-demo-single" , { yPercent: 100, stagger: .2, delay: 1 })

		var heroShape = gsap.timeline({
				defaults: { duration:1,
                ease: "ease1", }
		});
        heroShape.from(".px-hero-shape-single" , { yPercent: 100, stagger: .2, delay: 2 })

		var heroText = gsap.timeline({
				defaults: {
					duration:1,
					ease: "Back.easeOut",
				}
		});
        heroText.from(".px-hero-content .logo" , { yPercent: 100, opacity: 0, delay: .8 })
        heroText.from(".px-hero-content .btn-wrap" , { yPercent: 100, opacity: 0,})


        if($('.wa-split-text-3').length) {
            var st = $(".wa-split-text-3");
            st.each(function(index, el) {
                el.split = new SplitText(el, {
                    type: "lines",
                    linesClass: "split-line"
                });
                gsap.set(el, { perspective: 400 });

                gsap.set(el.split.lines, {
                    yPercent: 100,
                    opacity: 0,
                    ease: "Back.easeOut",
                });

                el.anim = gsap.to(el.split.lines, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
						invalidateOnRefresh: true,
                    },
                    yPercent: 0,
                    opacity: 1,
                    ease: "Back.easeOut",
                    stagger: 0.2,
                });
            });
        }


	})

});

// sticky header: slides in past 300px, slides out (not a hard cut) when scrolling back up
var stickyHeader = $('.sticky_header_1');
var stickyOn = false;
var stickyTimer;

$(window).on('scroll', function() {
	var y = $(this).scrollTop();

	if (y > 300 && !stickyOn) {
		stickyOn = true;
		clearTimeout(stickyTimer);
		stickyHeader.removeClass('sticky1-out').addClass('sticky1');
	}
	else if (y <= 300 && stickyOn) {
		stickyOn = false;
		stickyHeader.addClass('sticky1-out');
		stickyTimer = setTimeout(function () {
			stickyHeader.removeClass('sticky1 sticky1-out');
		}, 400);
	}
});

// Toggle Offcanvas start
$('.offcanvas_toggle').on('click', function() {
    $('.offcanvas_box_active').addClass('active');
});

$('.offcanvas_box_close').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.offcanvas_box_active').removeClass('active');
    }
});

$('.offcanvas_box_active a').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
});

// slide-text-1
if($('.marquee_active').length) {
	$('.marquee_active').marquee({
		gap: 0,
		speed: 20,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});
}

// slide-text-2
if($('.marquee_right_active').length) {
	$('.marquee_right_active').marquee({
		gap: 0,
		speed: 20,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});
}



// key-feature
var keyFeature = gsap.timeline({
    scrollTrigger: {
        trigger: ".px-key-feature-wrap",
        start: "top 70%",
        toggleActions: "play none none reverse",
        markers: false,
    },
    defaults: {
        ease: "ease1",
        duration: 1,
    },
})

keyFeature
.from(".px-key-feature-item .content", {
    yPercent: -100,
    stagger: .2,
})

// advanced-feature
var advanced = gsap.timeline({
    scrollTrigger: {
        trigger: ".px-advance-wrap",
        start: "top 60%",
        toggleActions: "play none none reverse",
        markers: false,
    },
    defaults: {
        ease: "ease1",
        duration: 1,
    },
})

advanced
.from(".px-advance-item:nth-of-type(1)", {
    xPercent: 100,
})
.from(".px-advance-item:nth-of-type(2)", {
    xPercent: 30,
},"<")
.from(".px-advance-item:nth-of-type(3)", {
    xPercent: -30,
},"<")
.from(".px-advance-item:nth-of-type(4)", {
    xPercent: -100,
},"<")


// features
var pxFeatures = gsap.timeline({
	scrollTrigger: {
		trigger: ".px-features-1-img",
		start: "top 90%",
		markers: false
	},
	defaults: {
		duration: 1,
		ease: "power4.out",
	} //
});

pxFeatures.from(".px-features-1-img-1" , { yPercent: 50, })
pxFeatures.from(".px-features-1-img-5" , { yPercent: 100, opacity: 0 }, "<=.3")
pxFeatures.from(".px-features-1-img-2" , { yPercent: 100, opacity: 0 }, "<=.3")
pxFeatures.from(".px-features-1-img-3" , { yPercent: 100, opacity: 0 }, "<=.3")
pxFeatures.from(".px-features-1-img-4" , { yPercent: 100, opacity: 0 }, "<=.3")
pxFeatures.from(".px-features-1-img-6" , { yPercent: 100, opacity: 0 }, "<=.3")


// footer-glow
let price1bgGlow2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".footer-ani-wrap",
		start: "top 80%",
		end: "top 0%",
		toggleActions: "play none none reverse",
		scrub: true,
		markers: false,
	},
});

price1bgGlow2.from(".footer-ani .ani-glow", {  opacity: 0, });
price1bgGlow2.from(".footer-ani .inner-glow", {  opacity: 0, },"<");
price1bgGlow2.from(".footer-ani .has-line", {  scale: 0, },"<50%");
price1bgGlow2.from(".footer-ani-favicon-glow", {  opacity: 0, },"<50%");


// counter-activation
$('.counter').counterUp({
	time: 2000
});


/* data-bg-activation */
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})


// wow-activation
if($('.wow').length){
	var wow = new WOW(
	{
		boxClass:     'wow',
		animateClass: 'animated',
		offset:       0,
		mobile:       true,
		live:         true
	}
	);
	wow.init();
};


})(jQuery);
