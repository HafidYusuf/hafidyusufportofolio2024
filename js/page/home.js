// FIRST BUILD UP
$(document).ready(function(){
    var coins = $('.hero spline-viewer');
    var name = $(".name .splitting .char");
    var divider = $(".divider");
    var intro = $(".intro .splitting .word");

    TweenMax.from(coins, 2, {autoAlpha:0});
    TweenMax.staggerFrom(name, 2, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:2},.08);
    TweenMax.from(divider, {height:0,autoAlpha:0,ease:Power4.easeOut,delay:2.5});
    TweenMax.staggerFrom(intro, 2, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:3},.03);
    console.log('test')
});


//GRID EFFECT
import { preloadImages } from './../utils.js';
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
//END OF GRID EFFECT


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


//RESOURCES ANIMATION
gsap.set($(".resources spline-viewer"), {
    scale: 0.3,
    opacity: 0
});

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



//Subscription Email Script
/*
const scriptURL = 'https://script.google.com/macros/s/AKfycbyIK3tJFs7GhunZuLbmuemlap9MIWfo-4x0nV8g74grZeEKGODQEg63eqKqln2MM9ACDA/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Thank You For Subscribing!"))
    .catch(error => console.error('Error!', error.message))
})
*/