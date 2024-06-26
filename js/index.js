/* General Animation State */
const indexAnimationEnter = (container) => {
    //SMOOTH SCROLL
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

    initSmoothScrolling();
    Splitting();

    //NAVBAR
    var nav = $('nav a');
    var burger = $(".menu-toggle");

    TweenMax.staggerFrom(nav, 2, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:2},.1);
    TweenMax.from(burger, 1, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:2.5});

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
    gsap.set(".headline h2, .headline p", {
        y: 10,
        autoAlpha: 0,
    }) 

    gsap.delayedCall(3, batchy)

    function batchy (){
        ScrollTrigger.batch(".headline h2, .headline p", {
            start: "top bottom-=100px",
            onEnter: (batch) =>
            TweenMax.staggerTo(batch, 1, {
                y: 0,
                autoAlpha: 1,
                ease: Power4.easeOut
            }, .5),
            onLeaveBack: (batch) =>
            gsap.to(batch, 1, {
                y: 10,
                autoAlpha: 0,
                ease: Power4.easeOut
            })
        });
    }

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
    gsap.set('.copyright .left, .copyright .right, .copyright .right img', {y: 10, autoAlpha: 0})
    gsap.set('.copyright .emoji', {y: 10, autoAlpha: 0})

    let tl = gsap.timeline({
        scrollTrigger:{
        trigger:'.keepintouch',
        start: "top bottom-=100px",
        toggleActions: "restart none none reverse",
        ease: Power4.easeOut
        }
    })

    tl
    .staggerTo('.keepintouch a', 0.5, {y: 0, autoAlpha:1, delay: .5},0.05)
    .staggerTo('.contact h2 .char, .contact h2 .emoji', 0.3, {y: 0, autoAlpha:1,},0.01)
    .to('.copyright', {scaleX: 1})
    .staggerTo('.copyright .left, .copyright .right, .copyright .emoji, .copyright .right img', 0.3, {y: 0, autoAlpha: 1},0.01)
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
    gsap.set($(".cover-transition h2 .char"), {y:10, autoAlpha:0});
    gsap.set($(".cover-transition"), {height: "0%", bottom: 0, top: "auto"});

    var tl = gsap.timeline();
    return tl
    .to($(".cover-transition"), {duration: 1, height: "100%", ease: "Expo.easeInOut",})
}
const coverAnimationEnter = () => {
    Splitting();
    gsap.set($(".cover-transition-load"), {height: "0", top: 0, autoAlpha: 0});
    gsap.set($(".cover-transition h2 .char"), {y:10, autoAlpha:0});
    gsap.set($(".cover-transition"), {height: "100%", bottom: "auto", top: 0});

    var tl = gsap.timeline();
    return tl
    .to($(".cover-transition h2 .char"), {y: 0, autoAlpha:1, stagger: 0.02})
    .to($(".cover-transition h2 .char"), {y: -10, autoAlpha:0})
    .to($(".cover-transition"), {duration: 1, height: "0%",top: "0", ease: "Expo.easeInOut"})
    .set($(".cover-transition"), {height: "0%", bottom: 0, top: "auto"})
}
/* End of Page Transition Cover */


/* Preloader Animation */
const coverAnimationLoad = () => {
    Splitting();
    gsap.set($(".cover-transition-load"), {height: "100%", top: 0});
    gsap.set($(".cover-transition-load h2 .char"), {y: 0, autoAlpha:1, opacity:1});

    var tl = gsap.timeline();
    return tl
    .staggerTo($(".cover-transition-load h2 .char"), .5, {y: -10, autoAlpha:0, delay:.5}, 0.03)
    .to($(".cover-transition-load"), {duration: 1, height: 0, ease: "Expo.easeInOut",})
}
/* End of Preloader Animation */


/* Homepage First Build Up Animation */
function homeInit(container) {

    var coins = $('.hero spline-viewer');
    var name = $(".name .splitting .char");
    var divider = $(".divider");
    var intro = $(".intro .splitting .word");

    TweenMax.from(coins, 2, {autoAlpha:0, delay: 2});
    TweenMax.staggerFrom(name, 2, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:4},.03);
    TweenMax.from(divider, {height:0,autoAlpha:0,ease:Power4.easeOut,delay:4.5});
    TweenMax.staggerFrom(intro, 2, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:5},.03);
}
/* End of Homepage First Build Up Animation */


/* About First Build Up Animation */
function aboutInit(container) {
    var abpic = container.querySelectorAll('.about-container spline-viewer');
    var abtitle = container.querySelectorAll('.about-title .word');
    var abdesc = container.querySelectorAll('.about-intro .word');
  
    TweenMax.from(abpic, 1, {y:100,scaleY:1.3,autoAlpha:0,ease:Power4.easeOut,delay:2.5});
    TweenMax.staggerFrom(abtitle, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:3},.02);
    TweenMax.staggerFrom(abdesc, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:3.5},.02);
}
/* End of About First Build Up Animation */


/* Radial Background Build Up Animation */
function radialBackgroundInit(container) {
    gsap.to(container.querySelectorAll(".works-page-container"), {
        "background": "radial-gradient(40% 20% at 50% 20%, rgba(44, 88, 241, 1) 0%, rgba(44, 88, 241, 0.00) 100%)",
        delay: 5
    });
}
/* End of Radial Background Build Up Animation */


/* Detail Work First Build Up Animation */
function detailInit(container) {
    var img = $('.parallax-content');
    var link = $('.client-link .char');
    var title = $('.title .word');
    var icon = $('.client-link svg');
    var detail = $('.detail-right p');
    var element = $('.detail-element-blue-bottom, .detail-element-blue');
    var tl = gsap.timeline();

    gsap.set(img, {bottom:"120%"});
    gsap.set(element, {autoAlpha:0});

    tl
    .to(img, 1, {bottom:"0%",ease:Power4.easeOut,delay: 3})
    .staggerFrom(link, 1, {y:10,autoAlpha:0,ease:Power4.easeOut},.02)
    .from(icon, 1, {y:10,autoAlpha:0,ease:Power4.easeOut},"-=100%")
    .staggerFrom(title, 1, {y:10,autoAlpha:0,ease:Power4.easeOut},.08, 5)
    .staggerFrom(detail, 1, {y:10,autoAlpha:0,ease:Power4.easeOut},.08)
    .to(element, 1, {autoAlpha:1,ease:Power4.easeOut},"-=100%");
}
/* End of Detail Work First Build Up Animation */


/* Homepage Whole Animation */
function homeAnimation(container){

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
        stagger: 0.08,
        scrollTrigger: {
        trigger: ".clients",
        start: "top bottom-=100px",
        end: "bottom top",
        toggleActions: "restart none none reverse"
        },
    });
    /*
    preloadImages();
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
    .to('.quotes-container', .5, {scaleX: 1, opacity: 1})
    .to('.quotes .splitting .char', 1, {immediateRender: false, y: 0, opacity: 1, stagger: 0.015})

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
    */

}
/* End of Homepage Whole Animation */


/* About Whole Animation */
function aboutAnimation(container){

    //VALUES ON ABOUT PAGE
    gsap.set(container.querySelectorAll(".value-title, .value-description"), {
        y: 60,
        opacity: 0
    });

    TweenMax.to(container.querySelectorAll(".value-title, .value-description"), 1, {
        immediateRender: false,
        y: 0,
        opacity: 1,
        stagger: 0.1,

        scrollTrigger: {
            trigger: ".values",
            start: "top bottom-=100px",
            end: "bottom top",
            toggleActions: "restart none none reverse"
        },
    });

    //DOWNLOAD CV BUTTON
    gsap.set(container.querySelectorAll('.resume-container p'), {y: 10, autoAlpha: 0})
    gsap.set(container.querySelectorAll('.resume'), {y: 10, autoAlpha: 0})

    gsap.timeline({
        scrollTrigger:{
        trigger:'.resume-container',
        start: "top bottom-=100px",
        toggleActions: "restart none none reverse",
        ease: Power4.easeOut
        }
    })

    .staggerTo(container.querySelectorAll('.resume-container p'), 0.5, {y: 0, autoAlpha:1},0.05)
    .to(container.querySelectorAll('.resume'), 1, {y: 0, autoAlpha:1, delay: .2})
}
/* End of About Whole Animation */


/* Articles Whole Animation */
function articlesAnimation(container){

    gsap.set('.article-img img, .article-date, .article-title, .article-desc', {y: 10, autoAlpha:0})
    gsap.set('.article-img .border', {"background": "linear-gradient(to bottom, #fff 0%, #000 0%, #000 100%, #5177FF 100%)", autoAlpha:0})
    
    gsap.delayedCall(3, batcho)

    function batcho() {
        ScrollTrigger.batch('.each-article', {
            start: 'top bottom',
            onEnter: batch => {
            batch.forEach((card, index) => {
        
                let border = card.querySelectorAll('.article-img .border');
                let content = card.querySelectorAll('.article-img img, .article-date, .article-title, .article-desc, .article-img img');
                let chart_tl = gsap.timeline();
        
                chart_tl.to( content, 0.6, {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.1,
                    delay: index * 0.5,
                    marker: true,
                    ease: Power3.easeOut
                }, 1 );
                chart_tl.to( border, 1.2, {
                    "background": "linear-gradient(to bottom, #fff 0%, #000 50%, #000 50%, #5177FF 100%)",
                    autoAlpha: 1,
                    stagger: 0.1,
                    delay: index * 0.5,
                    ease: Power3.easeOut
                }, 1 );
        
            })
            },
            once: true
        });
    }
}
/* End of Articles Whole Animation */


/* Works Whole Animation */
function worksAnimation(container){

    gsap.set('.work-img img', { scale: 1.3, autoAlpha: 0 })
    gsap.set('.work-title, .work-tags, .work-link, .work-link img', { y: 10, autoAlpha: 0 })
    
    gsap.delayedCall(3, batch)

    function batch(){
        ScrollTrigger.batch('.each-work', {
            start: 'top bottom-=100px',
            onEnter: batch => {
                batch.forEach((card, index) => {

                    let img = card.querySelectorAll('.work-img img');
                    let content = card.querySelectorAll('.work-title, .work-tags, .work-link, .work-link img');
                    let chart_tl = gsap.timeline();
        
                    chart_tl.to(img, 1.2, {
                        scale: 1,
                        autoAlpha: 1,
                        delay: index * 0.1,
                        ease: Power3.easeOut
                    }, .3);
                    chart_tl.to(content, 0.6, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: .1,
                        delay: index * 0.1,
                        ease: Power3.easeOut
                    }, 1);
        
                })
            },
            once: true
        });
    }
    
    gsap.set('.cap', { autoAlpha: 0 })
    gsap.set('.cap h2 .char', { y: 10, autoAlpha: 0 })
    
    $('.each-work a').mouseenter(function () {
        gsap.to($(this).find('.cap'), 0.5, { autoAlpha: 1 });
        TweenMax.staggerTo($(this).find('h2 .char'), 0.5, { y: 0, autoAlpha: 1 }, 0.05);
    })
    
    $('.each-work a').mouseleave(function () {
        gsap.to($(this).find('.cap'), 0.5, { autoAlpha: 0 });
        TweenMax.staggerTo($(this).find('h2 .char'), 0.5, { y: 10, autoAlpha: 0 }, 0.05);
    })
}
/* End of Works Whole Animation */


/* Resources Whole Animation */
function resourcesAnimation(container){

    //RESOURCES ANIMATION
    gsap.set($(".resources spline-viewer"), {
        scale: 0.3,
        opacity: 0
    });
    gsap.set($(".resources-caption h2, .resources-caption p"), {
        y: 10,
        opacity: 0
    });

    gsap.delayedCall(3, batchz)

    function batchz() {
        gsap.to($(".resources spline-viewer"), 3, {
            immediateRender: false,
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1,0.3)",
            stagger: 0.3,
            scrollTrigger: {
            trigger: ".resources",
            start: "top center",
            end: "bottom top",
            toggleActions: "restart none none reverse"
            },
        });
        gsap.to($(".resources-caption h2, .resources-caption p"), 1, {
            y: 0,
            opacity: 1
        })
        //SHIMMER SHIMMER ANIMATION
        const target1 = document.getElementById('shimmerWave1');
        const target2 = document.getElementById('shimmerWave2');
        function splitTextToSpans(targetElement) {
            if (targetElement) {
                const text = targetElement.textContent;
                targetElement.innerHTML = '';
                for (let character of text) {
                    const span = document.createElement('span');
                    if (character === ' ') {
                        span.innerHTML = '&nbsp;';
                    } else {
                        span.textContent = character;
                    }
                    targetElement.appendChild(span);
                }
            }
        }
        splitTextToSpans(target1);
        splitTextToSpans(target2);

        //SUBSCRIPTION ANIMATION
        gsap.set('.subscription', {scaleX:0})
        gsap.set('.subscription .subs-desc .word', {y: 10, autoAlpha:0})
        gsap.set('.subscription form', {y: 10, autoAlpha:0})
    
        gsap.timeline({
            scrollTrigger:{
            trigger:'.subscription',
            start: "top bottom-=100px",
            toggleActions: "restart none none reverse",
            ease: Power4.easeOut
            }
        })
        .to('.subscription', 1, {scaleX:1})
        .staggerTo('.subscription .subs-desc .word', 0.3, {y: 0, autoAlpha:1},0.05)
        .to('.subscription form', 1, {y: 0, autoAlpha:1})
    }

}
/* End of Resources Whole Animation */


/* Detail Whole Animation */
function detailAnimation(container){
    //ADD PARALLAX TO DETAIL CONTENT
    gsap.utils.toArray(".parallax-window .parallax-content").forEach((section, i) => {
        const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;

        gsap.fromTo(section,{y: -heightDiff}, {
            scrollTrigger: {
                trigger: section.parentElement,
                scrub: true
            },
            y: 100,
            ease: "none"
        });
    });

    //ADD A RADIAL BACKGROUND TO PARTICULAR SECTION IN DETAIL PAGE
    gsap.to(".content-full", 2, {
        "background": "radial-gradient(50% 50% at 50% 50%, #2C58F1 0%, rgba(44, 88, 241, 0.00) 100%)",
        immediateRender: false,
        ease: Power4.easeOut,
        scrollTrigger: {
        trigger: ".content-full",
        start: "top center",
        endTrigger: ".content-full",
        end: "bottom centar",
        toggleActions: "restart reverse restart reverse"
        },
    });
}
/* End of Detail Whole Animation */


/* Contact Whole Animation */
function contactAnimation(container){
    Splitting();

    //NAVBAR
    var nav = $('nav a');
    var burger = $(".menu-toggle");

    TweenMax.staggerFrom(nav, 2, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:2},.1);
    TweenMax.from(burger, 1, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:2.5});

    //ADDING GRADIENT TO THE NAVBAR
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300){
            $('nav').addClass("nav-bg-scroll");
        }
        else{
            $('nav').removeClass("nav-bg-scroll");
        }
    });

    //HEADLINE
    gsap.set(".headline h2, .headline p", {
        y: 10,
        autoAlpha: 0,
    }) 

    //FOOTER SET
    gsap.set('.keepintouch a', {y: 10, autoAlpha: 0})
    gsap.set('.headlining h2', {y: 10, autoAlpha: 0})
    gsap.set('.contact h2 .char', {y: 10, autoAlpha:0})
    gsap.set('.contact h2 .emoji', {y: 10, autoAlpha: 0})
    gsap.set('.copyright', {scaleX: 0})
    gsap.set('.copyright .left, .copyright .right, .copyright .right img', {y: 10, autoAlpha: 0})
    gsap.set('.copyright .emoji', {y: 10, autoAlpha: 0})

    gsap.delayedCall(3, batchy)

    function batchy (){
        ScrollTrigger.batch(".headline h2, .headline p", {
            start: "top bottom-=100px",
            onEnter: (batch) =>
            TweenMax.staggerTo(batch, 1, {
                y: 0,
                autoAlpha: 1,
                ease: Power4.easeOut
            }, .1),
            onLeaveBack: (batch) =>
            gsap.to(batch, 1, {
                y: 10,
                autoAlpha: 0,
                ease: Power4.easeOut
            })
        });

        gsap.timeline({
            delay: 1
        })

        .staggerTo('.contact h2 .char, .contact h2 .emoji', 0.3, {y: 0, autoAlpha:1},0.01)
        .staggerTo('.headlining h2', 0.3, {y: 0, autoAlpha:1,},0.01)
        .staggerTo('.keepintouch a', 0.5, {y: 0, autoAlpha:1},0.05)
        .to('.copyright', {scaleX: 1})
        .staggerTo('.copyright .left, .copyright .right, .copyright .emoji, .copyright .right img', 0.3, {y: 0, autoAlpha: 1},0.01)
        .to('.copyright .emoji', 0.3, {"animation": "heartbeat 1.8s infinite"})
        .to('.footer', 0.3, {onComplete: function(){
            TweenMax.set('.footer', {className:"footer footer-gradient"})
        }})

    }

    //NAV FUNCTION FOR MOBILE
    $('.menu-toggle').click(function () {
        $('.ham-menu').addClass('visible');
    });
    $('.closeit').click(function () {
        $('.ham-menu').removeClass('visible');
    });
}
/* End of Contact Whole Animation */


function footerRemover(container){
    $('#contact').css("display","none")
}
function footerEnabler(container){
    $('#contact').css("display","block")
}


/* Kill ScrollTrigger (To Refresh Each Page Transition) */
const cleanGSAP = () => {
	ScrollTrigger.getAll().forEach( t => t.kill(false) )
	ScrollTrigger.refresh()
	window.dispatchEvent(new Event("resize"))
}
/* End of Kill ScrollTrigger */


/* BARBA Init */
barba.init({
    transitions: [{
        name: 'transition',//GENERAL TRANSITION
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            indexAnimationEnter(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'home-tansition',//HOME TRANSITION
        to: {namespace: ['home']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            homeInit(next.container);
            homeAnimation(next.container);
            worksAnimation(next.container);
            resourcesAnimation(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            indexAnimationEnter(next.container);
            homeInit(next.container);
            homeAnimation(next.container);
            worksAnimation(next.container);
            resourcesAnimation(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'about-tansition',//ABOUT TRANSITION
        to: {namespace: ['about']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            aboutInit(next.container);
            aboutAnimation(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            indexAnimationEnter(next.container);
            aboutInit(next.container);
            aboutAnimation(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'articles-tansition',//ARTICLES TRANSITION
        to: {namespace: ['articles']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            radialBackgroundInit(next.container);
            articlesAnimation(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            indexAnimationEnter(next.container);
            radialBackgroundInit(next.container);
            articlesAnimation(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'works-tansition',//WORKS TRANSITION
        to: {namespace: ['works']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            radialBackgroundInit(next.container);
            worksAnimation(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            indexAnimationEnter(next.container);
            radialBackgroundInit(next.container);
            worksAnimation(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'resources-tansition',//RESOURCES TRANSITION
        to: {namespace: ['resources']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            radialBackgroundInit(next.container);
            resourcesAnimation(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            indexAnimationEnter(next.container);
            radialBackgroundInit(next.container);
            resourcesAnimation(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'detail-tansition',//DETAIL WORK TRANSITION
        to: {namespace: ['detail']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            indexAnimationEnter(next.container);
            detailInit(next.container);
            detailAnimation(next.container);
            footerEnabler(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            indexAnimationEnter(next.container);
            detailInit(next.container);
            detailAnimation(next.container);
            footerEnabler(next.container);
        }
    },
    {
        name: 'contact-tansition',//CONTACT TRANSITION
        to: {namespace: ['contact']},
        leave: ({current}) => coverAnimationLeave(current.container),
        enter({next}) {
            $(window).scrollTop(0);
            cleanGSAP();
            coverAnimationEnter(next.container);
            contactAnimation(next.container);
            footerRemover(next.container);
        },
        once({next}) {
            coverAnimationLoad(next.container);
            contactAnimation(next.container);
            footerRemover(next.container);
        }
    }]
});