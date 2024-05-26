
import { preloadImages } from './utils.js';


// FIRST BUILD UP
Splitting();
$(document).ready(function(){
    var nav = $('nav a');
    var burger = $(".menu-toggle");

    TweenMax.staggerFrom(nav, 2, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:1},.1);
    TweenMax.from(burger, 1, {y:-20,autoAlpha:0,ease:Power4.easeOut,delay:1.5},.1);
});


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
//END OF SMOOTH SCROLL


//ADDING GRADIENT TO THE NAVBAR
$(window).scroll(function() {
    if ($(this).scrollTop() > 300){
        $('nav').addClass("nav-bg-scroll");
    }
    else{
        $('nav').removeClass("nav-bg-scroll");
    }
});


//NAV FUNCTION FOR MOBILE
$('.menu-toggle').click(function () {
    $('.ham-menu').addClass('visible');
});
$('.closeit').click(function () {
    $('.ham-menu').removeClass('visible');
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





const animationHomeEnter = (container) => {
    Splitting();
    var tl = gsap.timeline();
    const coins = container.querySelectorAll('.hero spline-viewer');
    const name = container.querySelectorAll(".name .splitting .char");
    const divider = container.querySelectorAll(".divider");
    const intro = container.querySelectorAll(".intro .splitting .word");

    gsap.set($(".cover-transition"), {height: "100%", top: 0});
    tl.to($(".cover-transition"), {
        duration: 1,
        top: "100%",
        ease: "Expo.easeInOut",
        delay: 0,
    })
    .from(coins, 2, {autoAlpha:0})
    .staggerFrom(name, 2, {y:10,autoAlpha:0,ease:Power4.easeOut},.08)
    .from(divider, {height:0,autoAlpha:0,ease:Power4.easeOut})
    .staggerFrom(intro, 2, {y:10,autoAlpha:0,ease:Power4.easeOut},.03)
    .set($(".cover-transition"), {height: 0, top: 0});

}

const animationAboutEnter = (container) => {
    Splitting();
    var tl = gsap.timeline();
    const abpic = container.querySelectorAll('.about-container spline-viewer');
    const abtitle = container.querySelectorAll('.about-title .word');
    const abdesc = container.querySelectorAll('.about-intro .word');
    
    gsap.set($(".cover-transition"), {height: "100%", top: 0});
    tl.to($(".cover-transition"), {
        duration: 1,
        top: "100%",
        ease: "Expo.easeInOut",
        delay: 0,
    })
    .from(abpic, 1, {y:100,scaleY:1.3,autoAlpha:0,ease:Power4.easeOut})
    .staggerFrom(abtitle, 1, {y:10,autoAlpha:0,ease:Power4.easeOut},.02)
    .staggerFrom(abdesc, 1, {y:10,autoAlpha:0,ease:Power4.easeOu},.02)
    .set($(".cover-transition"), {height: 0, top: 0});
    
}

const animationLeave = () => {
    var tl = gsap.timeline();
    return tl.to($(".cover-transition"), {
        duration: 1.2,
        height: "100%",
        ease: "Expo.easeInOut",
    })
}

barba.init({
    debug: true,
    transitions: [{
        name: 'home-transition',
        to: {
            namespace: ['home']
        },
        leave: ({current}) => animationLeave(current.container),
        enter({next}) {
            animationHomeEnter(next.container)
        }
    },
    {
        name: 'about-transition',
        to: {
            namespace: ['about']
        },
        leave: ({current}) => animationLeave(current.container),
        enter({next}) {
            animationAboutEnter(next.container)
        }
    }]
});