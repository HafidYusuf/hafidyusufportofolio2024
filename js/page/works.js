// FIRST BUILD UP
$(document).ready(function(){

    gsap.to(".works-page-container", {
        "background": "radial-gradient(40% 20% at 50% 20%, rgba(44, 88, 241, 1) 0%, rgba(44, 88, 241, 0.00) 100%)",
        delay: 1
    });
});


gsap.set('.work-img img', {scale: 1.3, autoAlpha: 0})
gsap.set('.work-title .word, .work-tags .word, .work-link .char, .work-link img', {y: 10, autoAlpha:0})


ScrollTrigger.batch('.each-work', {
    start: 'top bottom-=100px',
    onEnter: batch => {
      batch.forEach((card, index) => {

        let img = card.querySelectorAll('.work-img img');
        let content = card.querySelectorAll('.work-title .word, .work-tags .word, .work-link .char, .work-link img');
        let chart_tl = gsap.timeline();

        chart_tl.to( img, 1.2, {
            scale: 1,
            autoAlpha: 1,
            delay: index * 0.2,
            ease: Power3.easeOut
        }, 0.4 );
        chart_tl.to( content, 0.6, {
            y: 0,
            autoAlpha: 1,
            stagger: 0.03,
            delay: index * 0.2,
            ease: Power3.easeOut
        }, 1 );
  
      })
    },
    once: true
  });


/*
gsap.timeline({
    scrollTrigger:{
        trigger: ".each-work",
        start: "top bottom-=100px",
        end: "bottom top",
        toggleActions: "restart none none reverse"
    }
})

.to('.work-img img', {scale: 1, autoAlpha:1, stagger: .2})
.to($(".work-title .word, .work-tags .word, .work-link .char, .work-link img"), {
    y: 0,
    autoAlpha: 1,
    stagger: 0.03
});
*/

gsap.set('.cap', {autoAlpha:0})
gsap.set('.cap h2 .char', {y: 10, autoAlpha:0})

$('.each-work a').mouseenter(function() {
    gsap.to($(this).find('.cap'), 0.5, {autoAlpha:1});
    TweenMax.staggerTo($(this).find('h2 .char'), 0.5, {y: 0, autoAlpha:1},0.05);
})

$('.each-work a').mouseleave(function() {
    gsap.to($(this).find('.cap'), 0.5, {autoAlpha:0});
    TweenMax.staggerTo($(this).find('h2 .char'), 0.5, {y: 10, autoAlpha:0},0.05);
})