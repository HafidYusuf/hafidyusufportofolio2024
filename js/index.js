import { preloadImages } from './utils.js';

/* Smooth Scroll */
let lenis;

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
    lenis = new Lenis({
        lerp: .2, // Lower values create a smoother scroll effect
        smoothWheel: true // Enables smooth scrolling for mouse wheel events
    });
    lenis.on('scroll', () => ScrollTrigger.update());
    const scrollFn = (time) => {
        lenis.raf(time); // Run Lenis' requestAnimationFrame method
        requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
    };
    requestAnimationFrame(scrollFn);
};
/* End of Smooth Scroll */


/* General Animation State */
const indexAnimationEnter = (container) => {
    Splitting();

    //NAVBAR
    var nav = $('nav a');
    var burger = $(".menu-toggle");

    TweenMax.staggerFrom(nav, 2, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:1},.1);
    TweenMax.from(burger, 1, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:1.5},.1);

    //ADDING GRADIENT TO THE NAVBAR
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300){
            $('nav').addClass("nav-bg-scroll");
        }
        else{
            $('nav').removeClass("nav-bg-scroll");
        }
    });

    //HEADLINE EACH SECTIONS
    gsap.set(".headline .word, .headline .emoji", {
        y: 10,
        autoAlpha: 0,
    }) 

    ScrollTrigger.batch(".headline .word, .headline .emoji", {
        start: "top bottom-=100px",
        onEnter: (batch) =>
        TweenMax.staggerTo(batch, 1, {
            y: 0,
            autoAlpha: 1,
            ease: Power4.easeOut
        }, .03),
        onLeaveBack: (batch) =>
        gsap.to(batch, 1, {
            y: 10,
            autoAlpha: 0,
            ease: Power4.easeOut
        })
    });

    //NAV FUNCTION FOR MOBILE
    $('.menu-toggle').click(function () {
        $('.ham-menu').addClass('visible');
    });
    $('.closeit').click(function () {
        $('.ham-menu').removeClass('visible');
    });

    //FOOTER ANIMATION
    gsap.set('.keepintouch a', {y: 10, autoAlpha: 0})
    gsap.set('.contact h2 .char', {y: 10, autoAlpha:0})
    gsap.set('.contact h2 .emoji', {y: 10, autoAlpha: 0})
    gsap.set('.copyright', {scaleX: 0})
    gsap.set('.copyright .left .char', {y: 10, autoAlpha: 0})
    gsap.set('.copyright .emoji', {y: 10, autoAlpha: 0})

    gsap.timeline({
        scrollTrigger:{
        trigger:'.keepintouch',
        start: "top bottom-=100px",
        toggleActions: "restart none none reverse",
        ease: Power4.easeOut
        }
    })

    .staggerTo('.keepintouch a', 0.5, {y: 0, autoAlpha:1, delay: .5},0.05)
    .staggerTo('.contact h2 .char, .contact h2 .emoji', 0.3, {y: 0, autoAlpha:1,},0.01)
    .to('.copyright', {scaleX: 1})
    .staggerTo('.copyright .left .char, .copyright .emoji', 0.3, {y: 0, autoAlpha: 1},0.01)
    .to('.copyright .emoji', 0.3, {"animation": "heartbeat 1.8s infinite"})

    //ADD A GRADIENT BACKGROUND WHEN FOOTER TOUCH THE GROUND
    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 100) {
            $('.footer').addClass('footer-gradient')
        }
        else {
            $('.footer').removeClass('footer-gradient')
        }
    };
}
/* End of General Animation State */


/* Page Transition Cover (In & Out Animation) */
const coverAnimationLeave = () => {
    var tl = gsap.timeline();
    return tl
    .to($(".cover-transition"), {duration: 1.2, height: "100%", ease: "Expo.easeInOut",})
    .set($(".cover-transition"), {height: "0%", top: 0, bottom: "auto"})
}
const coverAnimationEnter = () => {
    gsap.set($(".cover-transition"), {height: "100%", top: "auto"})
    var tl = gsap.timeline();
    return tl
    .to($(".cover-transition"), {duration: 1.2, height: "0%",bottom: "0", ease: "Expo.easeInOut"})
    .set($(".cover-transition"), {height: "0%", top: 0, bottom: "auto"})
}
/* End of Page Transition Cover */


/* Homepage First Build Up Animation */
function homeInit(container) {

    var coins = $('.hero spline-viewer');
    var name = $(".name .splitting .char");
    var divider = $(".divider");
    var intro = $(".intro .splitting .word");

    TweenMax.from(coins, 2, {autoAlpha:0});
    TweenMax.staggerFrom(name, 2, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:2},.08);
    TweenMax.from(divider, {height:0,autoAlpha:0,ease:Power4.easeOut,delay:2.5});
    TweenMax.staggerFrom(intro, 2, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:3},.03);
}
/* End of Homepage First Build Up Animation */


/* Homepage Whole Animation */
function homeAnimation(container){

    //GRID EFFECT
    let lenis;
    const grid = document.querySelector('.grid');
    const gridItems = document.querySelectorAll('.grid__item');

    const scroll = () => {
        const viewportHeight = window.innerHeight;
        const endValue = viewportHeight / 2;

        gridItems.forEach((item, index) => {
            const previousElementSibling = item.previousElementSibling;
            const isLeftSide = previousElementSibling && (item.offsetLeft + item.offsetWidth <= previousElementSibling.offsetLeft + 1);
            const originX = isLeftSide ? 100 : 0;
            gsap
            .timeline({
                defaults: {
                    //duration: 1,
                    ease: 'power4'
                },
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=15%',
                    end: '+=100%',
                    scrub: true
                }
            })
            .fromTo(item.querySelector('.grid__item-img'), {
                scale: 0,
                transformOrigin: `${originX}% 0%`
            }, {
                scale: 1
            })
            .fromTo(item.querySelector('.grid__item-img-inner'), {
                scale: 5,
                transformOrigin: `${originX}% 0%`
            }, {
                scale: 1
            }, 0)
            .fromTo(item.querySelector('.grid__item-caption'), {
                xPercent: () => isLeftSide ? 100 : -100,
                opacity: 0
            }, {
                ease: 'power1',
                xPercent: 0,
                opacity: 1
            }, 0); 
        });
    }
    // Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
    preloadImages('.grid__item-img-inner').then(() => {
        scroll();
    });

    //CHANGE BACKGROUND COLOR ON SCROLL
    gsap.to("body", {
        "background-color": "#2C58F1",
        immediateRender: false,
        scrollTrigger: {
        trigger: ".clients-container",
        start: "top center",
        endTrigger: ".article-container",
        end: "top top",
        toggleActions: "restart reverse restart reverse"
        },
    });
    //Gradient color change as the background color changes
    gsap.to(".gradient-cover, .gradient-cover-article", {
        "background-color": "#2C58F1",
        immediateRender: false,
        scrollTrigger: {
        trigger: ".clients-container",
        start: "top center",
        endTrigger: ".article-container",
        end: "top top",
        toggleActions: "restart reverse restart reverse"
        },
    });

    //QUOTES ANIMATION
    gsap.set($(".quotes .splitting .char"), {y: 10, opacity: 0});
    gsap.set($(".quotes-container"), {scaleX: 0, opacity: 0});

    gsap.timeline({
        scrollTrigger:{
            trigger: ".quotes",
            start: "top bottom-=100px",
            end: "bottom top",
            toggleActions: "restart none none reverse"
        }
    })
    .to('.quotes-container', 1, {scaleX: 1, opacity: 1})
    .to('.quotes .splitting .char', 1, {immediateRender: false, y: 0, opacity: 1, stagger: 0.03})

    //EXPERIENCE CHANGES ON MOBILE (FROM HOVER TO TAP)
    var mobile = (/iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
    if (mobile) {
        $('#megamind').click(function() {
            $(".megamind").toggleClass("woke");
        });
    } 
    else 
    {
        $('#megamind').hover(function() {
            $(".megamind").toggleClass("woke");
        });
    }

    //INFINITE LOOP CLIENTS
    gsap.set(".left-scroll", {xPercent: 0});
    gsap.to(".left-scroll", {xPercent: -50, duration: 15, ease: Linear.easeNone, repeat: -1});

    gsap.set($(".client"), {
        y: 60,
        opacity: 0
    });

    gsap.to($(".client"), {
        immediateRender: false,
        y: 0,
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: {
        trigger: ".clients",
        start: "top bottom-=100px",
        end: "bottom top",
        toggleActions: "restart none none reverse"
        },
    });

    //ARTICLE SHOWS
    gsap.set($(".article"), {
        y: 60,
        opacity: 0
    });

    gsap.to($(".article"), {
        immediateRender: false,
        y: 0,
        opacity: 1,
        stagger: 0.3,
        scrollTrigger: {
        trigger: ".article-container",
        start: "top bottom-=100px",
        end: "bottom top",
        toggleActions: "restart none none reverse"
        },
    });
}
/* End of Homepage Whole Animation */


/* About First Build Up Animation */
function aboutInit(container) {
    var abpic = container.querySelectorAll('.about-container spline-viewer');
    var abtitle = container.querySelectorAll('.about-title .word');
    var abdesc = container.querySelectorAll('.about-intro .word');
  
    TweenMax.from(abpic, 1, {y:100,scaleY:1.3,autoAlpha:0,ease:Power4.easeOut});
    TweenMax.staggerFrom(abtitle, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:.5},.02);
    TweenMax.staggerFrom(abdesc, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:1},.02);
}
/* End of About First Build Up Animation */


/* About Whole Animation */
function aboutAnimation(container){

    //VALUES ON ABOUT PAGE
    gsap.set(container.querySelectorAll(".value-title .char, .value-description .word"), {
        y: 60,
        opacity: 0
    });

    TweenMax.to(container.querySelectorAll(".value-title .char, .value-description .word"), {
        immediateRender: false,
        y: 0,
        opacity: 1,
        stagger: 0.008,
        scrollTrigger: {
        trigger: ".values",
        start: "top bottom-=100px",
        end: "bottom top",
        toggleActions: "restart none none reverse"
        },
    });

    //DOWNLOAD CV BUTTON
    gsap.set(container.querySelectorAll('.resume-container p .word'), {y: 10, autoAlpha: 0})
    gsap.set(container.querySelectorAll('.resume'), {y: 10, autoAlpha: 0})

    gsap.timeline({
        scrollTrigger:{
        trigger:'.resume-container',
        start: "top bottom-=100px",
        toggleActions: "restart none none reverse",
        ease: Power4.easeOut
        }
    })

    .staggerTo(container.querySelectorAll('.resume-container p .word'), 0.5, {y: 0, autoAlpha:1},0.05)
    .to(container.querySelectorAll('.resume'), 1, {y: 0, autoAlpha:1, delay: .2})
}
/* End of About Whole Animation */


/* Kill ScrollTrigger (To Refresh Each Page Transition) */
const cleanGSAP = () => {
	ScrollTrigger.getAll().forEach( t => t.kill(false) )
	ScrollTrigger.refresh()
	window.dispatchEvent(new Event("resize"))
}
/* End of Kill ScrollTrigger */


/* BARBA Init */
barba.init({
    debug: true,
    transitions: [{
        name: 'transition',//GENERAL TRANSITION
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            initSmoothScrolling();
        },
        once({next}) {
            indexAnimationEnter(next.container);
            initSmoothScrolling();
        }
    },
    {
        name: 'home-tansition',//HOME TRANSITION
        to: {namespace: ['home']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            homeInit(next.container);
            homeAnimation(next.container);
            initSmoothScrolling();
        },
        once({next}) {
            indexAnimationEnter(next.container);
            homeInit(next.container);
            homeAnimation(next.container);
            initSmoothScrolling();
        }
    },
    {
        name: 'about-tansition',//ABOUT TRANSITION
        to: {namespace: ['about']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            aboutInit(next.container);
            aboutAnimation(next.container);
            initSmoothScrolling();
        },
        once({next}) {
            indexAnimationEnter(next.container);
            aboutInit(next.container);
            aboutAnimation(next.container);
            initSmoothScrolling();
        }
    }]
});